import { ReactNode, useState } from "react";
import { FcMenu } from "react-icons/fc";
import Sidebar from "./sidebar";
import { PageLoader } from "./loader";
import { TfiClose } from "react-icons/tfi";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { cn } from "../lib/utils";
import { APP_ROUTES, LANDING_PAGE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import useDashboardApi from "../utils/api/dashboard.api";
import { handleError } from "../utils/notify";
import { FaPersonBooth } from "react-icons/fa";
import userAvatar from "../assets/images/user-avatar.png";
interface Props {
  header: string;
  subhead?: string;
  children: ReactNode;
  loading?: boolean;
}

export default function Layout({ header, subhead, children, loading }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useDashboardApi();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      name: "Logout",
      icon: RiLogoutBoxRFill,
      keyBind: "⌘L",
      color: "text-red-600",
      onclick: async () => {
        try {
          await logout();
          navigate(APP_ROUTES.Login, { replace: true });
        } catch (error) {
          handleError(error);
        }
      },
    },
  ];

  return (
    <div className="h-screen font-sans">
      <div
        className={cn(
          "fixed z-10 block h-screen w-full backdrop-blur-sm  transition-all duration-300 xl:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="relative  h-screen w-[220px] sm:w-[250px]">
          <Sidebar />
          <div className="absolute right-0 top-5">
            <TfiClose size={24} onClick={toggleOpen} />
          </div>
        </div>
      </div>
      <div className="hidden xl:block">
        <Sidebar />
      </div>
      <div className="flex-1 bg-white md:ml-5 md:pl-5">
        <div className="flex items-center justify-between border-b border-gray-300 px-5 py-5 xl:px-10">
          <div className="flex items-center gap-4 xl:pl-[300px]">
            <div className="xl:hidden">
              <FcMenu size={24} className="text-primary" onClick={toggleOpen} />
            </div>
            <div className="block">
              <h1 className="text-xl font-medium text-primary">{header}</h1>
              {subhead && <p className="text-sm text-gray-500">{subhead}</p>}
            </div>
          </div>
          <div className="flex">
            <Menu>
              <MenuButton>
                <section className="flex items-center gap-8">
                  <div className="text-primary flex items-center gap-2">
                    <p className="font-semibold">
                      <Link
                        to={LANDING_PAGE_URL}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                      >
                        Go to website
                      </Link>
                    </p>
                  </div>
                  <div>
                    <img
                      className="h-12 w-12 rounded-full"
                      src={userAvatar}
                      alt="user-avatar"
                    />
                  </div>
                </section>
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
                  className="w-40 origin-top-right rounded-xl bg-white p-1 text-sm/6 shadow-md [--anchor-gap:var(--spacing-1)] focus:outline-none"
                >
                  {menuItems.map(
                    ({ name, icon: Icon, keyBind, color, onclick }, index) => (
                      <MenuItem key={index}>
                        <button
                          className={cn(
                            "group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-gray-100",
                            color
                          )}
                          onClick={onclick}
                        >
                          <Icon className="size-4" />
                          {name}
                          <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                            {keyBind}
                          </kbd>
                        </button>
                      </MenuItem>
                    )
                  )}
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="px-5 py-5 md:pr-10 xl:pl-[250px] bg-background">
          {loading ? <PageLoader /> : children}
        </div>
      </div>
    </div>
  );
}
