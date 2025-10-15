import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Github,
  Mail,
  Lock,
  User as UserIcon,
  LogIn,
  LogOut,
  Home,
  Settings,
  TrendingUp,
} from "lucide-react";

export default function AuthLayout({ title, description, children }) {
  return (
    <div className=" flex items-center justify-center p-4 lg:mt-7">
      <Card className="w-full  max-w-md shadow-xl border-border/60 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {title}
          </CardTitle>
          {description ? (
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
