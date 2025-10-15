import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import AuthLayout from "./auth.layout";
import OAuthButtons from "@/components/auth/oauth.buttons";
import { NavLink } from "react-router";
import { Helmet } from "react-helmet";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!r.ok) throw new Error((await r.text()) || "Registration failed");
      window.location.href = "/login";
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Create your account" description="Start building faster">
      <Helmet>
        <title>Register Here | Auth App</title>
      </Helmet>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <div className="relative">
            <UserIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="pl-9"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="reg-email">Email</Label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="reg-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-9"
              autoComplete="email"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="reg-password">Password</Label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="reg-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-9"
              autoComplete="new-password"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating…" : "Create account"}
        </Button>

        <div className="relative my-1">
          <Separator className="my-4" />
          <div className="absolute inset-0 -top-3 flex items-center justify-center">
            <span className="bg-background px-2 text-xs text-muted-foreground">
              or
            </span>
          </div>
        </div>

        <OAuthButtons loading={loading} />

        <CardFooter className="px-0 flex justify-between text-sm text-muted-foreground">
          <NavLink to="/login" className="hover:underline">
            Already have an account?
          </NavLink>
        </CardFooter>
      </form>
    </AuthLayout>
  );
}
