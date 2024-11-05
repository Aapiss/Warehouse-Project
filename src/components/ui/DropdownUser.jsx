import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Button,
} from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export default function DropdownUser() {
  const { username, avatarUrl, email, logout } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Logout Failed");
    } else {
      Swal.fire({
        icon: "success",
        title: "Signed Out",
        text: "You have been signed out",
      }).then(() => window.location.reload());
    }
  };

  return (
    <div className="flex items-center gap-4">
      {username ? (
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: avatarUrl || "https://via.placeholder.com/150", // Default jika avatarUrl kosong
              }}
              className="transition-transform"
              description={
                <span className="hidden sm:inline">@{username}</span>
              }
              name={username}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">{username}</p>
            </DropdownItem>
            <DropdownItem key="settings">
              <Link to={"/profile"}>My Settings</Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Link to={"/login"}>
          <Button color="primary">Login</Button>
        </Link>
      )}
    </div>
  );
}
