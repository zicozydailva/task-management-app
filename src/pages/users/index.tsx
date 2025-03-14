import {
  Menu,
  MenuButton,
  Transition,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { format } from "date-fns";
import { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import StatusPill from "../../components/status-pill";
import Table from "../../components/table";
import { handleError } from "../../utils/notify";
import { SlOptionsVertical } from "react-icons/sl";
import {
  useFetchCurrencies,
  useFetchUserBalance,
  useFetchUserCards,
  useFetchUsers,
  useGetCurrencies,
} from "../../utils/api/dashboard-request";
import UserDetailsModal from "../../components/user-components/user-details.modal";

const Users = () => {
  const navigate = useNavigate();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, any>>({});
  const [selectedUser, setSelectedUser] = useState<any>();

  const handleSelected = (row: any) => {
    setSelected(row);
    setIsUserModalOpen(true);
  };

  const columns: TableColumn<any>[] = [
    {
      name: "Account ID",
      cell: (row) => (
        <span
          className="cursor-pointer hover:underline text-primary"
          onClick={() => handleSelected(row)}
        >
          {row?.accountId}
        </span>
      ),
      minWidth: "150px",
    },
    {
      name: "First Name",
      selector: (row) => row?.firstName,
      cell: (row) => (
        <span
          className="cursor-pointer hover:underline text-primary"
          onClick={() => handleSelected(row)}
        >
          {row?.firstName}
        </span>
      ),
      minWidth: "100px",
    },
    {
      name: "Last Name",
      selector: (row) => row?.lastName,
      cell: (row) => (
        <span
          className="cursor-pointer hover:underline text-primary"
          onClick={() => handleSelected(row)}
        >
          {row?.lastName}
        </span>
      ),
      minWidth: "100px",
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      cell: (row) => <p>{row?.email}</p>,
      minWidth: "250px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => <StatusPill status={row?.accountStatus?.toLowerCase()} />,
      minWidth: "150px",
    },
    {
      name: "Phone",
      selector: (row) => row?.phoneNumber,
      cell: (row) => <p>{row?.phoneNumber}</p>,
      minWidth: "160px",
    },
    {
      name: "Phone Country Code",
      selector: (row) => row?.phoneCountryCode,
      cell: (row) => <p>{row?.phoneCountryCode}</p>,
      minWidth: "100px",
    },
    {
      name: "Website",
      selector: (row) => row?.website,
      cell: (row) => <p>{row?.website}</p>,
    },
    {
      name: "Last Login",
      selector: (row) => row?.lastLogin,
      cell: (row) => <p>{row?.lastLogin || "--"}</p>,
    },
    {
      name: "Created At",
      selector: (row) =>
        format(new Date(row?.createdAt || Date.now()), "MMMM d, yyyy h:mm a") ||
        "",
      minWidth: "200px",
    },
    {
      name: "Actions",
      cell: (row) => renderMenu(row),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const [filters, setFilters] = useState({});
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false);
    }
  }, [shouldFetch, filters]);

  const {
    data: users,
    isPending,
    isError,
    onPageChange,
  } = useFetchUsers(filters);
  console.log(users, "users ");
  const { data: currencies } = useFetchCurrencies();
  const { data: userCurrencies } = useGetCurrencies({});
  const { data: userBalance } = useFetchUserBalance(
    selectedUser?.accountId,
    !!selectedUser?.accountId
  );
  const { data: userCards } = useFetchUserCards(
    selectedUser?.accountId,
    !!selectedUser?.accountId
  );

  handleError(isError);

  const renderMenu = (user: any) => (
    <Menu>
      <MenuButton
        onClick={() => {
          setSelectedUser((_prevUser: any) => {
            return user;
          });
        }}
      >
        <SlOptionsVertical className="text-md text-black text-center ml-3" />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="w-56 origin-top-right rounded-xl bg-white p-2 text-sm/6 shadow-md focus:outline-none"
        ></MenuItems>
      </Transition>
    </Menu>
  );

  return (
    <Layout header="">
      <div className="w-full h-screen xl:mt-5">
        <div className="flex gap-4 my-5 items-center">
          {/* <img src={} alt="Users Icon" /> */}
          <h1 className="text-xl font-semibold">Users</h1>
        </div>

        <div className="bg-white rounded-3xl py-5 border">
          <Table
            columns={columns}
            data={users?.data?.content || []}
            totalCount={users?.totalCount || 0}
            progressPending={isPending}
            onPageChange={onPageChange}
            paginationMode="server"
            filters={filters}
          />
        </div>
      </div>

      <UserDetailsModal
        isOpen={isUserModalOpen}
        setIsOpen={setIsUserModalOpen}
        userDetails={selected}
      />
    </Layout>
  );
};

export default Users;

Users.auth = true;
