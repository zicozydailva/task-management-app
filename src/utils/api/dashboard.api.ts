import { useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from ".";
import { ActionType, queryKeys } from "../constants";
import { handleGenericError } from "../notify";

const useDashboardApi = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();

  const getUsers = async (filters, { page, pageSize }) => {
    const queryParams = new URLSearchParams();
  
    queryParams.append('page', page.toString());
    queryParams.append('size', pageSize.toString());
  
    // Add only non-empty filter values to the queryParams
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        queryParams.append(key, filters[key]!.toString());
      }
    });
  
    const res = await axiosInstance.get(
      `/cms/management/dashboard-users?${queryParams.toString()}`
    );
  
    return {
      data: res.data,
      totalCount: res.data.totalElements,
    };
  }

  const getPayments = async (filters, { page, pageSize }) => {
    const queryParams = new URLSearchParams();

    queryParams.append('page', page.toString());
    queryParams.append('size', pageSize.toString());

    // Add only non-empty values to the queryParams
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });
    const res = await axiosInstance.get(
      `/cms/management/dashboard-users/payments?${queryParams.toString()}`
    );

    return {
      data: res.data,
      totalCount: res.data.totalElements,
    };
  };

  const getUserBalance = async (accoundId: string) => {
    if (!accoundId) return;

    const { data } = await axiosInstance.get(
      `/cms/management/dashboard-users/${accoundId}/balance`
    );

    return data;
  };

  const switchUserCurrencyCode = async (
    accoundId: string,
    currencyCode: string
  ) => {
    if (!accoundId || !currencyCode) return;

    const {
      data: { data },
    } = await axiosInstance.put(
      `/cms/management/dashboard-users/${accoundId}/currencies/${currencyCode}`
    );

    return data;
  };

  const getMarkupPricing = async (accountId?: string) => {
    const system = !accountId; // If no accountId, it's a system-wide request
    const url = `/cms/management/esim/pricing?system=${system}${
      accountId ? `&accountId=${accountId}` : ""
    }`;

    const { data } = await axiosInstance.get(url);
    return data;
  };

  const updateMarkupPricing = async (
    accountId?: string,
    amountPricing = []
  ) => {
    const system = accountId == null || accountId === "" || !accountId; // If accountId is null or an empty string, it's a system-wide request
    const url = `/cms/management/esim/pricing`;

    const payload = {
      system,
      ...(accountId && { accountId }), // Only include accountId if it exists
      amountPricing,
    };

    const { data } = await axiosInstance.put(url, payload);
    return data;
  };

  const getUserCards = async (accountId: string) => {
    if (!accountId) return;

    const { data } = await axiosInstance.get(
      `/cms/management/credit-cards/${accountId}`
    );

    return data;
  };

  // const getCurrencies = async () => {
  //   try {
  //     const res = await axiosInstance.get(`/cms/management/currencies`);
  //     return res.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getCurrencies = async (params = {}) => {
    try {
      // Convert params object to query string
      const queryString = new URLSearchParams(params).toString();

      // Construct URL with query parameters if they exist
      const url = queryString
        ? `/cms/management/currencies?${queryString}`
        : `/cms/management/currencies`;

      const { data } = await axiosInstance.get(url);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const enableAccountCreation = async (
    currencyCode: string,
    enable: boolean
  ) => {
    const payload = {
      currencyCode: currencyCode,
      enableForAccountCreation: enable,
    };
    try {
      await axiosInstance
        .put("/cms/management/currencies/enable-account-creation", payload)
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.managementCurrencies],
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const updateManualManaged = async (currencyCode: string, enable: boolean) => {
    try {
      const url = `/cms/management/currencies/manually-managed?currencyCode=${currencyCode}&manuallyManaged=${enable}`;
      await axiosInstance.put(url).then(() => {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.managementCurrencies],
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const debitAndCreditUserBalance = async (
    accountId: string,
    amount: number,
    amountCurrencyCode: string,
    actionType: ActionType
  ) => {
    if (!accountId || !amount || !amountCurrencyCode || !actionType) {
      handleGenericError("Missing required parameters");
      return;
    }

    const requestBody = {
      amount,
      amountCurrencyCode,
      actionType,
    };

    const url = `/cms/management/dashboard-users/${accountId}/balance`;

    await axiosInstance.put(url, requestBody).then(() => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.debitCreditUserBalance],
      });
    });
  };

  const getFixedAmountVouchers = async () => {
    const { data } = await axiosInstance.get(
      `/cms/management/voucher-fixed-amounts`
    );

    return data;
  };

  const createFixedAmountVouchers = async (
    vouchers: { amount: number; currencyCode: string }[]
  ) => {
    await axiosInstance
      .post(`/cms/management/voucher-fixed-amounts`, vouchers)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.fixedAmountVouchers],
        });
      });
  };

  const deleteFixedAmountVouchers = async (amountIds) => {
    await axiosInstance
      .delete(`/cms/management/voucher-fixed-amounts`, {
        params: { amountIds: amountIds },
      })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.fixedAmountVouchers],
        });
      });
  };

  return {
    getUsers,
    getPayments,
    getUserBalance,
    switchUserCurrencyCode,
    getMarkupPricing,
    updateMarkupPricing,
    getUserCards,
    getCurrencies,
    enableAccountCreation,
    updateManualManaged,
    debitAndCreditUserBalance,
    getFixedAmountVouchers,
    createFixedAmountVouchers,
    deleteFixedAmountVouchers,
  };
};

export default useDashboardApi;
