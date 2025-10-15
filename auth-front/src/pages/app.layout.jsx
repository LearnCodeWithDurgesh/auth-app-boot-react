import Navbar from "@/components/navbar";
import React from "react";
import { Outlet } from "react-router";

function AppLayout() {
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
