import { format } from "date-fns";
import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import CardLayout from "../../components/card-layout";
import DoughnutChart from "../../components/dashboard-chart/doughnut-chart";
import ActiveEsimChart from "../../components/dashboard-chart/user-chart";
import Layout from "../../components/layout";
import StatusPill from "../../components/status-pill";
import Table from "../../components/table";
import CustomButton from "../../components/custom-button";
import CountUp from "react-countup";
import {
  useFetchTasks,
  useFetchTaskStatusCount,
  useFetchUsers,
} from "../../utils/api/dashboard-request";
import { handleError } from "../../utils/notify";

const Dashboard = () => {
  const [loading, _setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

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
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => <StatusPill status={row.status} />,
      minWidth: "250px",
    },
    {
      name: "Date-Time",
      selector: (row) =>
        format(new Date(row?.createdAt), "MMMM d, yyyy h:mm a"),
      minWidth: "250px",
    },
  ];

  const usersColumns: TableColumn<any>[] = [
    {
      name: "First Name",
      selector: (row) => row?.firstName,
      cell: (row) => <p>{row?.firstName}</p>,
      minWidth: "100px",
    },
    {
      name: "Last Nam",
      selector: (row) => row?.lastName,
      cell: (row) => <p>{row?.lastName}</p>,
      minWidth: "100px",
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      cell: (row) => <p>{row?.email}</p>,
      minWidth: "200px",
    },
  ];

  const { data: tasks, isPending, isError } = useFetchTasks();
  const {
    data: users,
    isPending: userFetchPending,
    isError: userFetchError,
  } = useFetchUsers();
  const { data: taskCounts } = useFetchTaskStatusCount();

  handleError(isError || userFetchError);

  return (
    <Layout header="Dashboard" loading={loading}>
      <div className="col-span-1 grid grid-cols-1 gap-4 md:col-span-3 md:grid-cols-3">
        <CardLayout className="px-6 py-8">
          <div className="flex h-full w-full items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.8"
                  y="0.8"
                  width="40.4"
                  height="40.4"
                  rx="10.6"
                  fill="#415AA8"
                />
                <rect
                  x="0.8"
                  y="0.8"
                  width="40.4"
                  height="40.4"
                  rx="10.6"
                  stroke="#415AA8"
                  stroke-width="0.4"
                />
                <mask
                  id="mask0_1119_3379"
                  maskUnits="userSpaceOnUse"
                  x="9"
                  y="11"
                  width="23"
                  height="20"
                >
                  <path
                    d="M22.8181 11.9091H18.2727C13.9874 11.9091 11.8443 11.9091 10.5136 13.2409C9.55449 14.1989 9.28631 15.5784 9.21131 17.875H31.8795C31.8045 15.5784 31.5363 14.1989 30.5772 13.2409C29.2465 11.9091 27.1034 11.9091 22.8181 11.9091ZM18.2727 30.0909H22.8181C27.1034 30.0909 29.2465 30.0909 30.5772 28.7591C31.909 27.4284 31.909 25.2853 31.909 21C31.909 20.4978 31.909 20.025 31.9068 19.5796H9.18404C9.18176 20.025 9.18176 20.4978 9.18176 21C9.18176 25.2853 9.18176 27.4284 10.5136 28.7591C11.8443 30.0909 13.9874 30.0909 18.2727 30.0909Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.875 25.5455C12.875 25.3195 12.9648 25.1027 13.1246 24.9429C13.2845 24.783 13.5012 24.6932 13.7273 24.6932H18.2727C18.4988 24.6932 18.7155 24.783 18.8754 24.9429C19.0352 25.1027 19.125 25.3195 19.125 25.5455C19.125 25.7715 19.0352 25.9883 18.8754 26.1482C18.7155 26.308 18.4988 26.3978 18.2727 26.3978H13.7273C13.5012 26.3978 13.2845 26.308 13.1246 26.1482C12.9648 25.9883 12.875 25.7715 12.875 25.5455ZM20.2614 25.5455C20.2614 25.3195 20.3512 25.1027 20.511 24.9429C20.6708 24.783 20.8876 24.6932 21.1136 24.6932H22.8182C23.0442 24.6932 23.261 24.783 23.4208 24.9429C23.5807 25.1027 23.6705 25.3195 23.6705 25.5455C23.6705 25.7715 23.5807 25.9883 23.4208 26.1482C23.261 26.308 23.0442 26.3978 22.8182 26.3978H21.1136C20.8876 26.3978 20.6708 26.308 20.511 26.1482C20.3512 25.9883 20.2614 25.7715 20.2614 25.5455Z"
                    fill="black"
                  />
                </mask>
                <g mask="url(#mask0_1119_3379)">
                  <path
                    d="M6.90906 7.36365H34.1818V34.6364H6.90906V7.36365Z"
                    fill="white"
                  />
                </g>
              </svg>
            </div>
            <div className="space-y">
              <p className="text-sm text-black md:text-base">Pending Tasks</p>
              <p className="text-md font-semibold text-black md:text-xl">
                <CountUp
                  end={taskCounts?.statusCounts.pending || 0}
                  duration={3}
                />
              </p>
            </div>
          </div>
        </CardLayout>

        <CardLayout className="px-6 py-8">
          <div className="flex h-full w-full items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.8"
                  y="0.8"
                  width="40.4"
                  height="40.4"
                  rx="10.6"
                  fill="#415AA8"
                />
                <rect
                  x="0.8"
                  y="0.8"
                  width="40.4"
                  height="40.4"
                  rx="10.6"
                  stroke="#415AA8"
                  stroke-width="0.4"
                />
                <mask
                  id="mask0_1119_3379"
                  maskUnits="userSpaceOnUse"
                  x="9"
                  y="11"
                  width="23"
                  height="20"
                >
                  <path
                    d="M22.8181 11.9091H18.2727C13.9874 11.9091 11.8443 11.9091 10.5136 13.2409C9.55449 14.1989 9.28631 15.5784 9.21131 17.875H31.8795C31.8045 15.5784 31.5363 14.1989 30.5772 13.2409C29.2465 11.9091 27.1034 11.9091 22.8181 11.9091ZM18.2727 30.0909H22.8181C27.1034 30.0909 29.2465 30.0909 30.5772 28.7591C31.909 27.4284 31.909 25.2853 31.909 21C31.909 20.4978 31.909 20.025 31.9068 19.5796H9.18404C9.18176 20.025 9.18176 20.4978 9.18176 21C9.18176 25.2853 9.18176 27.4284 10.5136 28.7591C11.8443 30.0909 13.9874 30.0909 18.2727 30.0909Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.875 25.5455C12.875 25.3195 12.9648 25.1027 13.1246 24.9429C13.2845 24.783 13.5012 24.6932 13.7273 24.6932H18.2727C18.4988 24.6932 18.7155 24.783 18.8754 24.9429C19.0352 25.1027 19.125 25.3195 19.125 25.5455C19.125 25.7715 19.0352 25.9883 18.8754 26.1482C18.7155 26.308 18.4988 26.3978 18.2727 26.3978H13.7273C13.5012 26.3978 13.2845 26.308 13.1246 26.1482C12.9648 25.9883 12.875 25.7715 12.875 25.5455ZM20.2614 25.5455C20.2614 25.3195 20.3512 25.1027 20.511 24.9429C20.6708 24.783 20.8876 24.6932 21.1136 24.6932H22.8182C23.0442 24.6932 23.261 24.783 23.4208 24.9429C23.5807 25.1027 23.6705 25.3195 23.6705 25.5455C23.6705 25.7715 23.5807 25.9883 23.4208 26.1482C23.261 26.308 23.0442 26.3978 22.8182 26.3978H21.1136C20.8876 26.3978 20.6708 26.308 20.511 26.1482C20.3512 25.9883 20.2614 25.7715 20.2614 25.5455Z"
                    fill="black"
                  />
                </mask>
                <g mask="url(#mask0_1119_3379)">
                  <path
                    d="M6.90906 7.36365H34.1818V34.6364H6.90906V7.36365Z"
                    fill="white"
                  />
                </g>
              </svg>
            </div>
            <div className="space-y">
              <p className="text-sm text-black md:text-base">
                In-progress Tasks
              </p>
              <p className="text-md font-semibold text-black md:text-xl">
                <CountUp
                  end={taskCounts?.statusCounts["in-progress"] || 0}
                  duration={3}
                />
              </p>
            </div>
          </div>
        </CardLayout>

        <CardLayout className="px-6 py-8">
          <div className="flex h-full w-full items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.8"
                  y="0.8"
                  width="40.4"
                  height="40.4"
                  rx="10.6"
                  fill="#415AA8"
                />
                <rect
                  x="0.8"
                  y="0.8"
                  width="40.4"
                  height="40.4"
                  rx="10.6"
                  stroke="#415AA8"
                  stroke-width="0.4"
                />
                <mask
                  id="mask0_1119_3379"
                  maskUnits="userSpaceOnUse"
                  x="9"
                  y="11"
                  width="23"
                  height="20"
                >
                  <path
                    d="M22.8181 11.9091H18.2727C13.9874 11.9091 11.8443 11.9091 10.5136 13.2409C9.55449 14.1989 9.28631 15.5784 9.21131 17.875H31.8795C31.8045 15.5784 31.5363 14.1989 30.5772 13.2409C29.2465 11.9091 27.1034 11.9091 22.8181 11.9091ZM18.2727 30.0909H22.8181C27.1034 30.0909 29.2465 30.0909 30.5772 28.7591C31.909 27.4284 31.909 25.2853 31.909 21C31.909 20.4978 31.909 20.025 31.9068 19.5796H9.18404C9.18176 20.025 9.18176 20.4978 9.18176 21C9.18176 25.2853 9.18176 27.4284 10.5136 28.7591C11.8443 30.0909 13.9874 30.0909 18.2727 30.0909Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.875 25.5455C12.875 25.3195 12.9648 25.1027 13.1246 24.9429C13.2845 24.783 13.5012 24.6932 13.7273 24.6932H18.2727C18.4988 24.6932 18.7155 24.783 18.8754 24.9429C19.0352 25.1027 19.125 25.3195 19.125 25.5455C19.125 25.7715 19.0352 25.9883 18.8754 26.1482C18.7155 26.308 18.4988 26.3978 18.2727 26.3978H13.7273C13.5012 26.3978 13.2845 26.308 13.1246 26.1482C12.9648 25.9883 12.875 25.7715 12.875 25.5455ZM20.2614 25.5455C20.2614 25.3195 20.3512 25.1027 20.511 24.9429C20.6708 24.783 20.8876 24.6932 21.1136 24.6932H22.8182C23.0442 24.6932 23.261 24.783 23.4208 24.9429C23.5807 25.1027 23.6705 25.3195 23.6705 25.5455C23.6705 25.7715 23.5807 25.9883 23.4208 26.1482C23.261 26.308 23.0442 26.3978 22.8182 26.3978H21.1136C20.8876 26.3978 20.6708 26.308 20.511 26.1482C20.3512 25.9883 20.2614 25.7715 20.2614 25.5455Z"
                    fill="black"
                  />
                </mask>
                <g mask="url(#mask0_1119_3379)">
                  <path
                    d="M6.90906 7.36365H34.1818V34.6364H6.90906V7.36365Z"
                    fill="white"
                  />
                </g>
              </svg>
            </div>
            <div className="space-y">
              <p className="text-sm text-black md:text-base">Completed Tasks</p>
              <p className="text-md font-semibold text-black md:text-xl">
                <CountUp
                  end={taskCounts?.statusCounts.completed || 0}
                  duration={3}
                />
              </p>
            </div>
          </div>
        </CardLayout>
      </div>

      <section className="my-8 gap-6 md:flex">
        <aside className=" md:w-2/3 rounded-xl border border-gray-300 p-8">
          <h2 className="mb-4 text-black">Users</h2>
          <h2 className="mb-4 font-semibold text-2xl text-black">
            <CountUp end={users?.length || 0} duration={3} />
          </h2>
          <ActiveEsimChart />
        </aside>
        <aside className="rounded-xl md:w-1/2 border border-gray-300 p-4">
          <h2 className=" text-black">Tasks</h2>
          <div className="">
            <DoughnutChart taskCounts={taskCounts} />
          </div>
        </aside>
      </section>

      <main>
        <div className="my-12 flex flex-col items-center justify-center">
          <div className="flex justify-between">
            <CustomButton
              size="md"
              onClick={() => {
                setActiveTab(1);
              }}
              variant={activeTab === 1 ? "primary" : "primary_outlined"}
            >
              Tasks
            </CustomButton>
            <CustomButton
              size="md"
              variant={activeTab === 2 ? "primary" : "primary_outlined"}
              onClick={() => {
                setActiveTab(2);
              }}
            >
              Users
            </CustomButton>
          </div>
        </div>
        <aside className="rounded-xl  border-gray-300 p-6 ">
          {activeTab == 1 && (
            <div className="bg-white rounded-3xl py-5 border">
              <Table
                progressPending={isPending}
                columns={columns}
                data={tasks}
              />
            </div>
          )}

          {activeTab == 2 && (
            <div className="bg-white rounded-3xl py-5 border">
              <Table
                progressPending={userFetchPending}
                columns={usersColumns}
                data={users}
              />
            </div>
          )}
        </aside>
      </main>
    </Layout>
  );
};

export default Dashboard;
