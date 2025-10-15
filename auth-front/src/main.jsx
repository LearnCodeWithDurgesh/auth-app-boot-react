import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { LoginPage } from "./pages/login.page.jsx";
import RegisterPage from "./pages/register.page";
import AppLayout from "./pages/app.layout";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")).render(
  <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
