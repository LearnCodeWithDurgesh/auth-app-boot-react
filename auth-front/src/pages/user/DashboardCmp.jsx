import { Link } from "react-router";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

import {
  Menu,
  Bell,
  Search,
  Plus,
  Settings,
  LogOut,
  Home,
  BarChart2,
  Users,
  FolderGit2,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/utils/auth";
import { getCurrentUser } from "@/services/auth.service";
import toast from "react-hot-toast";

function DashboardCmp() {
  const user = useAuthStore((state) => state.user);
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* App Shell */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-64 shrink-0 border-r bg-card md:block">
          <div className="flex h-14 items-center gap-2 border-b px-4">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-primary to-primary/40" />
            <span
              onClick={async () => {
                const user = await getCurrentUser();
                toast.success(`Hello ${user.name}`);
              }}
              className="font-semibold tracking-tight"
            >
              Auth Admin
            </span>
          </div>
          <nav className="p-3 space-y-1">
            <NavItem
              href="#"
              icon={<Home className="h-4 w-4" />}
              label="Overview"
              active
            />
            <NavItem
              href="#"
              icon={<BarChart2 className="h-4 w-4" />}
              label="Analytics"
            />
            <NavItem
              href="#"
              icon={<Users className="h-4 w-4" />}
              label="Customers"
            />
            <NavItem
              href="#"
              icon={<FolderGit2 className="h-4 w-4" />}
              label="Projects"
            />
            <NavItem
              href="#"
              icon={<Settings className="h-4 w-4" />}
              label="Settings"
            />
          </nav>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-30 h-14 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
            <div className="mx-auto flex h-full max-w-screen-2xl items-center gap-2 px-4">
              {/* Mobile: sidebar */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <SheetHeader className="px-4 py-3">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-gradient-to-br from-primary to-primary/40" />
                      <span>Acme Admin</span>
                    </SheetTitle>
                  </SheetHeader>
                  <Separator />
                  <nav className="p-3 space-y-1">
                    <NavItem
                      href="#"
                      icon={<Home className="h-4 w-4" />}
                      label="Overview"
                      active
                      onClick={() => setOpen(false)}
                    />
                    <NavItem
                      href="#"
                      icon={<BarChart2 className="h-4 w-4" />}
                      label="Analytics"
                      onClick={() => setOpen(false)}
                    />
                    <NavItem
                      href="#"
                      icon={<Users className="h-4 w-4" />}
                      label="Customers"
                      onClick={() => setOpen(false)}
                    />
                    <NavItem
                      href="#"
                      icon={<FolderGit2 className="h-4 w-4" />}
                      label="Projects"
                      onClick={() => setOpen(false)}
                    />
                    <NavItem
                      href="#"
                      icon={<Settings className="h-4 w-4" />}
                      label="Settings"
                      onClick={() => setOpen(false)}
                    />
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Search */}
              <div className="relative ml-auto w-full max-w-md">
                <Search className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search…" className="pl-8" />
              </div>

              {/* Actions */}
              <Button variant="outline" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>

              <UserMenu />
            </div>
          </header>

          {/* Content */}
          <main className="mx-auto w-full max-w-screen-2xl flex-1 space-y-6 p-4 md:p-6">
            {/* Header row */}
            <div className="flex items-center justify-between gap-2">
              <div>
                <h1 className="text-xl font-semibold">Overview</h1>
                <p className="text-sm text-muted-foreground">
                  Quick insights for your project.
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create new item</DialogTitle>
                    <DialogDescription>
                      Fill the form below and hit create.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 py-3">
                    <div className="grid gap-1">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Enter title" />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="desc">Description</Label>
                      <Input id="desc" placeholder="Short description" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button">Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* KPIs */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KpiCard
                title="Revenue"
                value="$24,120"
                hint="▲ 4.2% this week"
              />
              <KpiCard title="Orders" value="1,238" hint="▲ 1.1%" />
              <KpiCard title="Active Users" value="8,420" hint="▼ 0.6%" />
              <KpiCard
                title="Uptime"
                value="99.97%"
                hint={<Progress value={97} />}
              />
            </section>

            {/* Tabs + Table */}
            <section className="rounded-lg border bg-card">
              <Tabs defaultValue="all">
                <div className="flex items-center justify-between border-b p-4">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="archived">Archived</TabsTrigger>
                  </TabsList>
                  <div className="text-sm text-muted-foreground">
                    Showing 4 results
                  </div>
                </div>

                <TabsContent value="all">
                  <DataTable rows={ROWS} />
                </TabsContent>
                <TabsContent value="active">
                  <DataTable rows={ROWS.filter((r) => r.status === "Active")} />
                </TabsContent>
                <TabsContent value="archived">
                  <DataTable
                    rows={ROWS.filter((r) => r.status === "Archived")}
                  />
                </TabsContent>
              </Tabs>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
function NavItem({ href, icon, label, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
        active ? "bg-muted font-medium" : "hover:bg-muted",
      ].join(" ")}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function UserMenu() {
  const user = useAuthStore((state) => state.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-1 inline-flex items-center gap-2"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={user.image ? user.image : "https://i.pravatar.cc/64?img=32"}
              alt="user"
            />
            <AvatarFallback>DK</AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm">{user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function KpiCard({ title, value, hint }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        <div className="mt-2 text-xs text-muted-foreground">
          {typeof hint === "string" ? (
            <Badge variant="secondary">{hint}</Badge>
          ) : (
            hint
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function DataTable({ rows }) {
  if (!rows?.length)
    return (
      <div className="p-6 text-sm text-muted-foreground">No data found.</div>
    );
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Owner</TableHead>
            <TableHead className="text-right pr-4">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.name}</TableCell>
              <TableCell>
                <Badge
                  variant={r.status === "Active" ? "default" : "secondary"}
                >
                  {r.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{r.owner}</TableCell>
              <TableCell className="text-right pr-4 text-muted-foreground">
                {r.updated}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const ROWS = [
  {
    id: 1,
    name: "Project Alpha",
    status: "Active",
    owner: "Aditi",
    updated: "Today",
  },
  {
    id: 2,
    name: "Campaign Nova",
    status: "Active",
    owner: "Rohit",
    updated: "2d ago",
  },
  {
    id: 3,
    name: "Archive 2024",
    status: "Archived",
    owner: "Neha",
    updated: "1w ago",
  },
  {
    id: 4,
    name: "Website Redesign",
    status: "Active",
    owner: "Arjun",
    updated: "3h ago",
  },
];
export default DashboardCmp;
