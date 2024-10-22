import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 px-6 mt-auto bg-fuchsia-700 text-white dark:bg-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left mb-2 md:mb-0">
          Copyright &copy; 2024
        </p>
        <div className="flex space-x-4">
          <p>
            Developed By <span className="text-fuchsia-200">Pipiw Maxwing</span>
          </p>
        </div>
      </div>
    </footer>
  );
  ``;
};

export default Footer;
