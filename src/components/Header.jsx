import React from "react";
import DropdownUser from "./ui/DropdownUser";
import Theme from "./ui/Theme";

const Header = () => {
  return (
    <header className="h-20 shadow-lg flex items-center justify-between px-8 flex-wrap dark:bg-gray-900">
      <h1 className="text-2xl flex-grow" id="title"></h1>

      <div className="flex gap-6 items-center flex-col sm:flex-row">
        <Theme />
        <DropdownUser />
      </div>
    </header>
  );
};

export default Header;
