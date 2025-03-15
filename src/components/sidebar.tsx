import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import dashboardIcon from "../assets/svg/sidebar-icons/dashboard.svg";
import usersIcon from "../assets/svg/sidebar-icons/users.svg";
import settingsIcon from "../assets/svg/sidebar-icons/tracker.svg";
import reportsIcon from "../assets/svg/sidebar-icons/reports.svg";
import { APP_ROUTES } from "../utils/constants";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const routes = [
    {
      name: "Dashboard",
      route: APP_ROUTES.Dashboard,
      icon: dashboardIcon,
    },
    {
      name: "Tasks",
      route: APP_ROUTES.Tasks,
      icon: reportsIcon,
    },
    {
      name: "Users",
      route: APP_ROUTES.Users,
      icon: usersIcon,
    },
    {
      name: "Settings",
      route: APP_ROUTES.Settings,
      icon: settingsIcon,
    },
  ];

  return (
    <aside className="fixed z-10 h-screen overflow-y-auto w-[250px] sm:w-[250px] flex flex-col gap-6 border-r border-gray-200 bg-white overflow-x-hidden pt-6">
      {/*LOGO*/}
      <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white text-lg font-bold">
        
      </div>

      {/*SIDE NAVS*/}
      <div className=" bg-primary flex-grow">
        <div className="w-full pt-8">
          {routes.map(({ name, route, icon }, index) => (
            <div className="w-full xl:mb-2" key={index}>
              <div
                onClick={() => {
                  navigate(route);
                }}
                className={cn(
                  "group flex items-center justify-between pl-6 pr-4 py-4 text-base font-medium text-white hover:bg-secondary/100 w-[200px] mx-4 rounded-xl hover:text-white",
                  location.pathname === route && "bg-secondary/100"
                )}
              >
                <div className="flex items-center space-x-3">
                  <img src={icon} alt={name} height={20} width={20} />
                  <div>{name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
