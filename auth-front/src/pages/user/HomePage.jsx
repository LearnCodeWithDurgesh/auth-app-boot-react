import { useAuthStore } from "@/utils/auth";
import React from "react";
import DashboardCmp from "./DashboardCmp";

function HomePage() {
  const user = useAuthStore((state) => state.user);
  return (
    <div>
      <DashboardCmp />
    </div>
  );
}

export default HomePage;
