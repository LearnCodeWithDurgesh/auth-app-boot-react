import { useAuthStore } from "@/utils/auth";
import Navbar from "@/components/navbar";
import React, { use } from "react";
import { Outlet } from "react-router";

function AppLayout() {
  const bootStrap = useAuthStore((state) => state.bootstrap);
  bootStrap();
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
