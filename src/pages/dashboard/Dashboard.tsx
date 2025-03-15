import { format } from "date-fns";
import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import CardLayout from "../../components/card-layout";
import DoughnutChart from "../../components/dashboard-chart/doughnut-chart";
import ActiveEsimChart from "../../components/dashboard-chart/eSim-chart";
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
import { BsThreeDots } from "react-icons/bs";

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
      name: "Action",
      selector: (row) => row.status,
      cell: () => <BsThreeDots className="h-6 w-6 cursor-pointer" />,
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
                width="57"
                height="57"
                viewBox="0 0 57 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.75"
                  y="0.75"
                  width="55.5"
                  height="55.5"
                  rx="13.25"
                  fill="white"
                />
                <rect
                  x="0.75"
                  y="0.75"
                  width="55.5"
                  height="55.5"
                  rx="13.25"
                  stroke="#CFCFCF"
                  stroke-width="0.5"
                />
                <path
                  d="M18.2481 20.8411C18.2481 19.292 18.8635 17.8063 19.9589 16.7108C21.0544 15.6154 22.5401 15 24.0892 15C25.6384 15 27.1241 15.6154 28.2195 16.7108C29.315 17.8063 29.9304 19.292 29.9304 20.8411C29.9304 22.3903 29.315 23.876 28.2195 24.9714C27.1241 26.0669 25.6384 26.6823 24.0892 26.6823C22.5401 26.6823 21.0544 26.0669 19.9589 24.9714C18.8635 23.876 18.2481 22.3903 18.2481 20.8411ZM32.0544 24.0272C32.0544 23.3996 32.178 22.7781 32.4182 22.1983C32.6584 21.6185 33.0104 21.0916 33.4542 20.6479C33.898 20.2041 34.4248 19.8521 35.0046 19.6119C35.5845 19.3717 36.2059 19.2481 36.8335 19.2481C37.4611 19.2481 38.0826 19.3717 38.6624 19.6119C39.2422 19.8521 39.7691 20.2041 40.2129 20.6479C40.6567 21.0916 41.0087 21.6185 41.2488 22.1983C41.489 22.7781 41.6126 23.3996 41.6126 24.0272C41.6126 25.2947 41.1091 26.5103 40.2129 27.4065C39.3166 28.3028 38.101 28.8063 36.8335 28.8063C35.566 28.8063 34.3504 28.3028 33.4542 27.4065C32.5579 26.5103 32.0544 25.2947 32.0544 24.0272ZM14 38.8955C14 36.2197 15.063 33.6535 16.9551 31.7614C18.8472 29.8693 21.4134 28.8063 24.0892 28.8063C26.7651 28.8063 29.3313 29.8693 31.2234 31.7614C33.1155 33.6535 34.1785 36.2197 34.1785 38.8955V38.8998L34.177 39.0683C34.174 39.2484 34.1253 39.4248 34.0354 39.5808C33.9455 39.7369 33.8173 39.8675 33.663 39.9604C30.7732 41.7007 27.4626 42.6178 24.0892 42.6126C20.5888 42.6126 17.3121 41.6441 14.5169 39.9604C14.3623 39.8677 14.2339 39.7371 14.1437 39.581C14.0535 39.425 14.0046 39.2485 14.0014 39.0683L14 38.8955ZM36.3025 38.8998L36.3011 39.1037C36.2932 39.5757 36.1805 40.04 35.9712 40.4631C38.4431 40.6156 40.9123 40.1227 43.1363 39.0329C43.3083 38.9488 43.4544 38.8198 43.559 38.6596C43.6637 38.4993 43.7232 38.3137 43.731 38.1224C43.781 36.9347 43.5234 35.7542 42.9832 34.6952C42.4431 33.6363 41.6386 32.7348 40.6477 32.0781C39.6568 31.4213 38.5131 31.0316 37.3274 30.9466C36.1417 30.8617 34.9541 31.0843 33.8797 31.5931C35.456 33.701 36.3057 36.2635 36.3011 38.8955L36.3025 38.8998Z"
                  fill="#415AA8"
                />
              </svg>
            </div>
            <div className="space-y">
              <p className="text-sm text-black md:text-base">Pending Tasks</p>
              <p className="text-md font-semibold text-black md:text-xl">
                <CountUp end={taskCounts?.statusCounts.pending || 0} duration={3} />
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
                <CountUp end={taskCounts?.statusCounts["in-progress"] || 0} duration={3} />
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
                  x="0.818182"
                  y="0.818182"
                  width="40.3636"
                  height="40.3636"
                  rx="9.63636"
                  fill="#415AA8"
                />
                <rect
                  x="0.818182"
                  y="0.818182"
                  width="40.3636"
                  height="40.3636"
                  rx="9.63636"
                  stroke="#CFCFCF"
                  stroke-width="0.363636"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.2387 10.4543C18.5922 10.4543 16.1811 11.3285 14.7545 12.0427C14.6256 12.1072 14.5054 12.1705 14.3935 12.2314C14.1721 12.3521 13.9834 12.4646 13.8334 12.5636L15.4564 14.9529L16.2204 15.257C19.2062 16.7634 23.2103 16.7634 26.1966 15.257L27.0638 14.8071L28.5983 12.5636C28.2804 12.3562 27.9499 12.169 27.6087 12.0029C26.189 11.2963 23.8354 10.4543 21.2393 10.4543M17.4649 13.1589C16.8902 13.0514 16.3225 12.9089 15.7651 12.7324C17.1016 12.1388 19.0931 11.509 21.2393 11.509C22.7257 11.509 24.1313 11.8113 25.2938 12.1945C23.9315 12.3861 22.4779 12.7113 21.0928 13.1114C20.003 13.4267 18.7293 13.3927 17.4649 13.1589ZM26.8159 16.1259L26.6718 16.1986C23.3872 17.8555 19.0304 17.8555 15.7458 16.1986L15.6093 16.1294C10.6742 21.5438 6.90682 31.5453 21.2387 31.5453C35.5706 31.5453 31.7118 21.3581 26.8159 16.1259ZM20.6299 21.0007C20.3192 21.0007 20.0211 21.1241 19.8013 21.3439C19.5816 21.5637 19.4581 21.8617 19.4581 22.1725C19.4581 22.4833 19.5816 22.7813 19.8013 23.0011C20.0211 23.2208 20.3192 23.3443 20.6299 23.3443V21.0007ZM21.8018 19.8289V19.243H20.6299V19.8289C20.0084 19.8289 19.4123 20.0758 18.9727 20.5153C18.5332 20.9548 18.2863 21.5509 18.2863 22.1725C18.2863 22.7941 18.5332 23.3902 18.9727 23.8297C19.4123 24.2692 20.0084 24.5161 20.6299 24.5161V26.8598C20.1202 26.8598 19.686 26.5346 19.5243 26.0787C19.5003 26.0042 19.4616 25.9352 19.4105 25.8758C19.3594 25.8164 19.2969 25.7679 19.2267 25.7332C19.1565 25.6984 19.08 25.678 19.0018 25.6733C18.9236 25.6686 18.8453 25.6796 18.7714 25.7057C18.6975 25.7318 18.6296 25.7725 18.5718 25.8253C18.5139 25.8781 18.4672 25.9419 18.4344 26.0131C18.4016 26.0842 18.3835 26.1612 18.381 26.2395C18.3785 26.3179 18.3917 26.3959 18.4199 26.469C18.5815 26.9259 18.8808 27.3216 19.2766 27.6014C19.6724 27.8813 20.1452 28.0316 20.6299 28.0316V28.6175H21.8018V28.0316C22.4233 28.0316 23.0194 27.7846 23.4589 27.3451C23.8985 26.9056 24.1454 26.3095 24.1454 25.6879C24.1454 25.0664 23.8985 24.4703 23.4589 24.0307C23.0194 23.5912 22.4233 23.3443 21.8018 23.3443V21.0007C22.3115 21.0007 22.7456 21.3259 22.9074 21.7817C22.9314 21.8563 22.9701 21.9253 23.0212 21.9846C23.0723 22.044 23.1348 22.0925 23.205 22.1273C23.2752 22.162 23.3517 22.1824 23.4299 22.1871C23.5081 22.1918 23.5864 22.1808 23.6603 22.1547C23.7342 22.1286 23.802 22.088 23.8599 22.0352C23.9178 21.9824 23.9645 21.9185 23.9973 21.8474C24.0301 21.7762 24.0482 21.6992 24.0507 21.6209C24.0532 21.5426 24.04 21.4646 24.0118 21.3915C23.8502 20.9345 23.5509 20.5388 23.1551 20.259C22.7593 19.9791 22.2865 19.8289 21.8018 19.8289ZM21.8018 24.5161V26.8598C22.1125 26.8598 22.4106 26.7363 22.6304 26.5165C22.8501 26.2968 22.9736 25.9987 22.9736 25.6879C22.9736 25.3772 22.8501 25.0791 22.6304 24.8593C22.4106 24.6396 22.1125 24.5161 21.8018 24.5161Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="space-y">
              <p className="text-sm text-black md:text-base">Completed Tasks</p>
              <p className="text-md font-semibold text-black md:text-xl">
              <CountUp end={taskCounts?.statusCounts.completed || 0} duration={3} />
              </p>
            </div>
          </div>
        </CardLayout>
      </div>

      <section className="my-8 gap-6 md:flex">
        <aside className=" md:w-2/3 rounded-xl border border-gray-300 p-8">
          <h2 className="mb-4 text-black">Users</h2>
          <h2 className="mb-4 font-semibold text-2xl text-black">
            <CountUp end={141} duration={3} />
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
                console.log("clicked", activeTab);
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
                console.log("clicked", activeTab);
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
