import { useState } from "react";
import {
  Menu,
  MenuButton,
  Transition,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Layout from "../../components/layout";
import { TableColumn } from "react-data-table-component";
import { BsThreeDots } from "react-icons/bs";
import { format } from "date-fns";
import StatusPill from "../../components/status-pill";
import Table from "../../components/table";
import { useFetchTasks } from "../../utils/api/dashboard-request";
import { handleError } from "../../utils/notify";
import DeleteConfirmationModal from "../../components/delete-confirmation-modal";

function Tasks() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, any>>({});
  const [selectedItem, setSelectedItem] = useState<any>();

  const { data: tasks, isPending, isError } = useFetchTasks();
  handleError(isError);

  const handleSelected = (row: any) => {
    setSelected(row);
    setIsUserModalOpen(true);
  };

  const columns: TableColumn<any>[] = [
    {
      name: "Name",
      selector: (row) => row?.title,
      cell: (row) => <p>{row?.title}</p>,
      minWidth: "200px",
    },
    {
      name: "Desc",
      selector: (row) => row?.description,
      cell: (row) => <p>{row?.description}</p>,
      minWidth: "350px",
    },
    {
      name: "Date-Time",
      selector: (row) =>
        format(new Date(row?.createdAt), "MMMM d, yyyy h:mm a"),
      minWidth: "250px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => <StatusPill status={row.status} />,
      minWidth: "250px",
    },
    {
      name: "Actions",
      cell: (row) => renderMenu(row),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const renderMenu = (item: any) => (
    <Menu>
      <MenuButton
        onClick={() => {
          setSelectedItem((_prevItem: any) => {
            console.log({ item });
            return item;
          });
        }}
      >
        <BsThreeDots className="text-md text-black text-center ml-3" />
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
          className="w-30 origin-top-right rounded-xl bg-white p-2 text-sm/6 shadow-md focus:outline-none"
        >
          {" "}
          <MenuItem>
            <div className="flex items-center px-2 border-b border-gray-200">
              <FaEdit className="text-md text-black text-center ml-3" />
              <button
                className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-black  data-[focus]:bg-gray-100`}
                // onClick={() => setIsUserBalanceModalOpen(true)}
              >
                Edit
              </button>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center px-2 ">
              <FaTrash className="text-md text-black text-center ml-3" />
              <button
                className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-black  data-[focus]:bg-gray-100`}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Delete
              </button>
            </div>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );

  return (
    <Layout header="Tasks">
      <div className="bg-white rounded-3xl py-5 border">
        <Table progressPending={isPending} columns={columns} data={tasks} />
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        selectedItem={selectedItem}
      />
    </Layout>
  );
}

export default Tasks;
