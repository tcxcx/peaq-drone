import React, { useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  Home,
  User,
  HelpCircle,
  ThumbsUpIcon,
  LampDeskIcon,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

export const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const menuItems: MenuItem[] = [
    { icon: Home, label: "Home", path: "/" },
    { icon: ThumbsUpIcon, label: "Marketplace", path: "/marketplace" },
    { icon: LampDeskIcon, label: "Orders", path: "/marketplace/orders" },
    { icon: User, label: "Add Drone", path: "/marketplace/new-drone-order" },
    { icon: HelpCircle, label: "Help", path: "/help" },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-full" : "w-20"
      } transition-all duration-600 min-h-screen`}
    >
      <div className="text-basement-indigo my-4">
        <Image
          src={
            isSidebarOpen
              ? "/drone-hive-full-logo.webp"
              : "/drone-icon-no-bg.webp"
          }
          alt="Logo"
          className="mx-auto transition-opacity duration-100 ease-in-out"
          priority
          width={100}
          height={100}
          layout="fixed"
        />
      </div>
      <ul className="p-2 font-ribbon uppercase">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <div key={label} className="group">
            <li
              onClick={() => router.push(path)}
              className={`${
                isSidebarOpen ? "justify-left" : "justify-center"
              } p-4 flex items-center cursor-pointer group-hover:bg-stone-800/40 transition-colors duration-75 ease-in-out delay-75 ${
                pathname === path
                  ? "bg-stone-800/10  text-basement-indigo rounded border border-basement-indigo"
                  : ""
              }`}
            >
              <Icon size={18} className="mr-3 group-hover:text-basement-indigo transition-colors duration-75 ease-in-out delay-75" />
              {isSidebarOpen && <span className="text-right group-hover:text-basement-indigo transition-colors duration-75 ease-in-out delay-75">{label}</span>}
            </li>
          </div>
        ))}
        <div className="group">

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute center-0 right-0 z-1 ring-2 ring-gray-200/50 transform -translate-x-1/4 p-2 bg-primary-white text-blueGray-700 shadow-md ring-gray-900 focus:outline-none group-hover:ring-1 group-hover:ring-offset-1 group-hover:ring-basement-indigo transition-colors duration-75 ease-in-out delay-75"
          style={{ bottom: "35%", borderRadius: "0.5rem" }}
        >
          {isSidebarOpen ? (
            <ChevronsLeft size={16} className="group-hover:animate-bounce repeat-1 transition-colors duration-75 ease-in-out delay-75" />
          ) : (
            <ChevronsRight
              size={16}
              className="group-hover:animate-bounce repeat-1 transition-colors duration-75 ease-in-out delay-75"
            />
          )}
        </button>
        </div>
        
      </ul>
    </div>
  );
};
