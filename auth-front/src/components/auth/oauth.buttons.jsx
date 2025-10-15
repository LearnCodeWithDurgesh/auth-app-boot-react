import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

export default function OAuthButtons({ loading }) {
  return (
    <div className="grid gap-2">
      <Button
        variant="outline"
        type="button"
        disabled={loading}
        className="w-full"
        onClick={() => {
          window.location.href = `${API_BASE}/oauth2/authorization/google`;
        }}
        aria-label="Continue with Google"
      >
        <Mail className="mr-2 h-4 w-4" aria-hidden /> Continue with Google
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={loading}
        className="w-full"
        onClick={() => {
          window.location.href = `${API_BASE}/oauth2/authorization/github`;
        }}
        aria-label="Continue with GitHub"
      >
        <Github className="mr-2 h-4 w-4" aria-hidden /> Continue with GitHub
      </Button>
    </div>
  );
}
