import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import {
  Check,
  Shield,
  Lock,
  KeyRound,
  Fingerprint,
  Globe,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Helmet } from "react-helmet";
function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Home | Auth App</title>
      </Helmet>
      {/* Hero Section */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Secure auth made simple</span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Classic authentication for modern apps
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Password, OTP, and social sign-in with token refresh baked in.
            Drop-in UI, clean APIs, and production-grade security.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/register">
              <Button size="lg">
                Get started free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Login
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            No credit card required · 14-day trial
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section>
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-3 rounded-lg border bg-card p-4 text-center text-xs text-muted-foreground sm:grid-cols-4">
            <TrustItem icon={<Shield />} text="ISO-ready" />
            <TrustItem icon={<Globe />} text="OAuth & OIDC" />
            <TrustItem icon={<Clock />} text="99.99% Uptime" />
            <TrustItem icon={<Lock />} text="SSO & MFA" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mt-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-semibold">Why choose Auth App?</h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need to plug authentication into your product.
          </p>
        </div>
        <div className="mx-auto mt-6 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4">
          <Feature
            icon={<Lock className="h-5 w-5" />}
            title="Secure by default"
            desc="httpOnly cookies, short-lived JWTs, and sane defaults."
          />
          <Feature
            icon={<Fingerprint className="h-5 w-5" />}
            title="MFA & OTP"
            desc="Email/SMS OTP, TOTP, and backup codes to keep accounts safe."
          />
          <Feature
            icon={<KeyRound className="h-5 w-5" />}
            title="Social sign-in"
            desc="Google, GitHub, Apple, and more with one config."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="mt-14">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            Three simple steps to authenticate users.
          </p>
        </div>
        <div className="mx-auto mt-6 grid max-w-6xl gap-4 md:grid-cols-3 px-4">
          <Step
            n={1}
            title="Register"
            desc="Sign up via email, OTP, or social login."
          />
          <Step
            n={2}
            title="Verify"
            desc="Short-lived access token + secure refresh cookie."
          />
          <Step
            n={3}
            title="Access"
            desc="APIs use tokens; refresh happens silently."
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-14">
        <div className="mx-auto max-w-6xl grid gap-4 md:grid-cols-3 px-4">
          <Testimonial
            name="Aditi Verma"
            role="PM, FintechX"
            quote="Integration took an afternoon and login issues dropped 60%."
            avatar="https://i.pravatar.cc/64?img=15"
          />
          <Testimonial
            name="Rohit Singh"
            role="CTO, MarketHub"
            quote="Love the classic UI and refresh flow. Clean and reliable."
            avatar="https://i.pravatar.cc/64?img=11"
          />
          <Testimonial
            name="Neha Sharma"
            role="Founder, Coursely"
            quote="SSO setup for org clients was painless — exactly what we needed."
            avatar="https://i.pravatar.cc/64?img=22"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-14">
        <div className="mx-auto max-w-3xl px-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently asked questions</CardTitle>
              <CardDescription>
                Quick answers before you integrate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="1">
                  <AccordionTrigger>
                    Do you support refresh tokens?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes — access tokens are short-lived, refresh tokens are
                    stored in httpOnly cookies.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="2">
                  <AccordionTrigger>Can I use my own UI?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. Use our APIs with your design system or these
                    shadcn templates.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-14">
        <div className="mx-auto max-w-6xl px-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-between gap-3 p-6 text-center md:flex-row md:text-left">
              <div>
                <CardTitle className="text-xl">Ready to add auth?</CardTitle>
                <CardDescription>
                  Copy the starter kit and ship login today.
                </CardDescription>
              </div>
              <div className="flex gap-3">
                <Link href="/register">
                  <Button size="lg">Create account</Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ========== Subcomponents ========== */

function TrustItem({ icon, text }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="grid h-9 w-9 place-items-center rounded-md border bg-card">
          {icon}
        </div>
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4" /> Easy to integrate
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4" /> Docs & examples
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4" /> Type-safe APIs
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

function Step({ n, title, desc }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Badge variant="secondary">Step {n}</Badge>
        <CardTitle className="mt-1 text-base">{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator />
        <p className="mt-3 text-sm text-muted-foreground">
          Ready-to-use code samples available for React and Next.js.
        </p>
      </CardContent>
    </Card>
  );
}

function Testimonial({ name, role, quote, avatar }) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{(name?.[0] || "U").toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">“{quote}”</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {name} · {role}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-muted-foreground md:flex-row md:text-left">
        <p>© {new Date().getFullYear()} Auth App. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <Link href="#">Docs</Link>
          <span>·</span>
          <Link href="#">Privacy</Link>
          <span>·</span>
          <Link href="#">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

export default HomePage;
