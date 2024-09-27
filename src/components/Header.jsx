import React from "react";
import DropdownUser from "./ui/DropdownUser";

const Header = () => {
  return (
    <header className="h-20 shadow-lg flex items-center justify-between px-8 flex-wrap">
      <h1 className="text-2xl flex-grow" id="title"></h1>

      <div className="flex gap-6 items-center flex-col sm:flex-row">
        <DropdownUser />
      </div>
    </header>
  );
};

export default Header;
