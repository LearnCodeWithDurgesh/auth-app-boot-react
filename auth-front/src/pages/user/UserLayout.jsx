import { useAuthStore } from "@/utils/auth";
import React from "react";
import { Navigate, Outlet } from "react-router";

function UserLayout() {
  const status = useAuthStore((state) => state.status);
  if (status === "authenticating") {
    return <div>Loading...</div>;
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default UserLayout;
