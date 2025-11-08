import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { LoginPage } from "./pages/login.page.jsx";
import RegisterPage from "./pages/register.page";
import AppLayout from "./pages/app.layout";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import OAuthSuccessPage from "./pages/oauth-success.page";
import { Home, Layout } from "lucide-react";
import { default as UserDashBoardHome } from "./pages/user/HomePage";
import UserLayout from "./pages/user/UserLayout";
import HomePage from "./pages/HomePage";
createRoot(document.getElementById("root")).render(
  <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auth/success" element={<OAuthSuccessPage />} />
          <Route path="/dashboard" element={<UserLayout />}>
            <Route path="" element={<UserDashBoardHome />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
