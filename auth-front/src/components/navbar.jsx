import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LogIn, UserPlus, Moon, Sun } from "lucide-react";
import { NavLink } from "react-router"; // <-- fix import
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <a href="/" className="inline-flex items-center gap-2 font-semibold">
          <span
            className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-primary to-primary/40"
            aria-hidden
          />
          <span className="text-base tracking-tight">Auth App</span>
        </a>

        {/* Desktop actions */}
        <nav className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <NavLink to="/login" aria-label="Login">
            <Button variant="ghost" size="sm" className="gap-2">
              <LogIn className="h-4 w-4" /> Login
            </Button>
          </NavLink>
          <NavLink to="/register" aria-label="Register">
            <Button size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" /> Register
            </Button>
          </NavLink>
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span
                    className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-primary to-primary/40"
                    aria-hidden
                  />
                  <span>Auth App</span>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" /> Dark Mode
                    </>
                  )}
                </Button>

                <Separator />

                <NavLink to="/login" className="block" aria-label="Login">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <LogIn className="h-4 w-4" /> Login
                  </Button>
                </NavLink>
                <NavLink to="/register" className="block" aria-label="Register">
                  <Button className="w-full justify-start gap-2">
                    <UserPlus className="h-4 w-4" /> Register
                  </Button>
                </NavLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
