import { useQuery } from "@tanstack/react-query";
import useDashboardApi from "./dashboard.api";
import { queryKeys } from "../constants";
import DashboardMiscApi from "./dashboard-misc.api";
import { useState } from "react";

export const useFetchUsers = (filters = {}) => {
  const { getUsers } = useDashboardApi();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const query = useQuery({
    queryKey: [queryKeys.users, filters, page, pageSize],
    queryFn: () => getUsers(filters, { page, pageSize }),
  });

  const onPageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  return {
    ...query,
    onPageChange,
  };
};

export const useFetchPayments = (filters?: any) => {
  const { getPayments } = useDashboardApi();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const onPageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  const query = useQuery({
    queryKey: [queryKeys.payments, filters],
    queryFn: () => getPayments(filters, { page, pageSize }),
  });

  return {
    ...query,
    onPageChange,
  };
};

export const useFetchUserBalance = (
  accountId: string | null,
  enabled = true
) => {
  const { getUserBalance } = useDashboardApi();

  return useQuery({
    queryKey: [queryKeys.userBalance, accountId],
    queryFn: () => getUserBalance(accountId),
    enabled: enabled && !!accountId, // Enable query only if `enabled` is true and `accountId` is valid
  });
};

export const useFetchCurrencies = () => {
  return useQuery({
    queryKey: [queryKeys.currencies],
    queryFn: () => DashboardMiscApi.getCurrencies(),
  });
};

export const useSwitchUserCurrencyCode = (
  accountId: string,
  currencyCode: string
) => {
  const { switchUserCurrencyCode } = useDashboardApi();

  return useQuery({
    queryKey: [queryKeys.userBalance, accountId],
    queryFn: () => switchUserCurrencyCode(accountId, currencyCode),
  });
};

export const useFetchMarkupPricing = (accountId?: string) => {
  const { getMarkupPricing } = useDashboardApi();

  return useQuery({
    queryKey: [queryKeys.markupPricing],
    queryFn: () => getMarkupPricing(accountId),
  });
};

export const useFetchUserCards = (accountId: string | null, enabled = true) => {
  const { getUserCards } = useDashboardApi();

  return useQuery({
    queryKey: [queryKeys.userCards, accountId],
    queryFn: () => getUserCards(accountId),
    enabled: enabled && !!accountId,
  });
};

export const useGetCurrencies = (params = {}) => {
  const { getCurrencies } = useDashboardApi();
  return useQuery({
    queryKey: [queryKeys.managementCurrencies, params],
    queryFn: () => getCurrencies(params),
  });
};

export const useGetFixedAmountVouchers = () => {
  const { getFixedAmountVouchers } = useDashboardApi();
  return useQuery({
    queryKey: [queryKeys.fixedAmountVouchers],
    queryFn: () => getFixedAmountVouchers(),
  });
};
