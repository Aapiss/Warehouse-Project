import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const { role } = useAuth();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block md:hidden p-4 text-white bg-fuchsia-950 dark:bg-gray-700"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M6 18L18 6M6 6l12 12"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" />
          </svg>
        )}
      </button>
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:block md:w-1/5 w-full bg-fuchsia-950 dark:bg-gray-700 text-white h-full md:h-auto fixed md:relative z-50`}
      >
        <div className="h-20 shadow-lg flex justify-between items-center px-4">
          <h2 className="flex items-center text-2xl font-bold gap-1 just">
            RB Market
          </h2>
          {/* Close button (X) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" stroke="white" strokeWidth="2" />
            </svg>
          </button>
        </div>

        <nav className="flex justify-center pt-10">
          <ul className="flex flex-col gap-8">
            <li>
              <LinkSidebar link={"/"}>
                <DashboardIcon /> Dashboard
              </LinkSidebar>
            </li>
            <li>
              <LinkSidebar link={"/table"}>
                <TableIcon /> Tabel Item
              </LinkSidebar>
            </li>
            <li>
              <LinkSidebar link={"/items"}>
                <ItemsIcon /> Items
              </LinkSidebar>
            </li>
            <li>
              <LinkSidebar link={"/supplier"}>
                <SupplierIcon /> Supplier
              </LinkSidebar>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

const LinkSidebar = ({ link, children }) => {
  const location = useLocation();

  return (
    <Link
      to={link}
      className={`${
        location.pathname === link
          ? "text-fuchsia-400 dark:text-fuchsia-300"
          : ""
      } flex items-center gap-2 text-xl`}
    >
      {children}
    </Link>
  );
};
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M13.545 2.1a.75.75 0 0 1 .274 1.025l-3.472 6.007a3 3 0 1 1-1.208-.908l1.759-3.042a6.5 6.5 0 0 0-2.148-.639V5a.75.75 0 1 1-1.5 0v-.457a6.5 6.5 0 0 0-1.829.49l.229.396a.75.75 0 1 1-1.3.75l-.228-.396a6.5 6.5 0 0 0-1.339 1.34l.396.227a.75.75 0 0 1-.75 1.3l-.396-.229a6.5 6.5 0 0 0-.498 1.905a.75.75 0 0 1-1.492-.155A8 8 0 0 1 11.65 3.88l.87-1.506a.75.75 0 0 1 1.025-.274Zm-.107 4.047a.75.75 0 0 1 1.047.169a8 8 0 0 1 1.51 4.963a.75.75 0 1 1-1.499-.052a6.5 6.5 0 0 0-1.227-4.033a.75.75 0 0 1 .17-1.047ZM9.5 11a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Z"
      clip-rule="evenodd"
    />
  </svg>
);

const TableIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 20 20"
  >
    <path
      fill="currentColor"
      d="M1.364 5.138v12.02h17.272V5.138H1.364ZM.909 1.5h18.182c.502 0 .909.4.909.895v15.21a.902.902 0 0 1-.91.895H.91c-.503 0-.91-.4-.91-.895V2.395C0 1.9.407 1.5.91 1.5Zm5.227 1.759c0-.37.306-.671.682-.671c.377 0 .682.3.682.671v13.899c0 .37-.305.67-.682.67a.676.676 0 0 1-.682-.67V3.259Zm6.96-.64c.377 0 .682.3.682.67v4.995h4.91c.377 0 .683.301.683.672c0 .37-.306.671-.682.671l-4.911-.001v3.062h5.002c.377 0 .682.3.682.671c0 .37-.305.671-.682.671h-5.002v3.158a.676.676 0 0 1-.682.671a.676.676 0 0 1-.681-.67l-.001-3.159H1.001a.676.676 0 0 1-.682-.67c0-.371.305-.672.682-.672h11.413V9.626L.909 9.627a.676.676 0 0 1-.682-.671c0-.37.306-.671.682-.671l11.505-.001V3.289c0-.37.306-.67.682-.67Z"
    />
  </svg>
);

const ItemsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M21 3H3v2h18zm-7 4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM4 8a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"
    />
  </svg>
);

const SupplierIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 472 384"
  >
    <path
      fill="currentColor"
      d="m405 107l64 85v107h-42q0 26-19 45t-45.5 19t-45-19t-18.5-45H171q0 26-19 45t-45.5 19t-45-19T43 299H0V64q0-18 12.5-30.5T43 21h298v86h64zM106.5 331q13.5 0 23-9.5t9.5-23t-9.5-22.5t-23-9t-22.5 9t-9 22.5t9 23t22.5 9.5zM395 139h-54v53h95zm-32.5 192q13.5 0 23-9.5t9.5-23t-9.5-22.5t-23-9t-22.5 9t-9 22.5t9 23t22.5 9.5z"
    />
  </svg>
);

export default Sidebar;
