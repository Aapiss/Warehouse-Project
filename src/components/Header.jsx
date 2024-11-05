import React from "react";
import DropdownUser from "./ui/DropdownUser";
import Theme from "./ui/Theme";

const Header = () => {
  return (
    <header className="h-20 shadow-lg flex items-center justify-between px-8 flex-wrap dark:bg-gray-900">
      <h1 className="text-2xl flex-grow dark:text-white" id="title"></h1>

      <div className="flex items-center gap-4 flex-row sm:gap-6 sm:flex-row">
        <div className="mt-2 sm:mt-0">
          <Theme />
        </div>
        <DropdownUser className="w-full sm:w-auto" />
      </div>
    </header>
  );
};

export default Header;
