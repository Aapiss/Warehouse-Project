import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Button,
} from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export default function DropdownUser() {
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

  const { user, role } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {user && role === "admin" ? (
        <>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "https://st2.depositphotos.com/42546960/45539/v/450/depositphotos_455397466-stock-illustration-letter-logo-design-vector-template.jpg",
                }}
                className="transition-transform"
                description="@pipiwd"
                name="Pipiw Maxwin"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@pipiwd</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      ) : (
        <Link to={"/login"}>
          <Button color="primary">Login</Button>
        </Link>
      )}
    </div>
  );
}
