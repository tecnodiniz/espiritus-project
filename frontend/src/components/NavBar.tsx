import { cn } from "@/lib/utils";
import * as React from "react";
import { Link } from "react-router-dom";

const NavBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-3 pb-5 bg-blue-500 text-white shadow ", className)}
    {...props}
  />
));
NavBar.displayName = "NavBar";

const NavBarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col justify-center h-auto items-baseline justify-between gap-8 px-4 sm:px-6 md:flex-row",
      className
    )}
    {...props}
  />
));
NavBarContent.displayName = "NavBarContent";

const NavBarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-6", className)}
    {...props}
  />
));

function NavBarLink({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot="navbar-link"
      className={cn("hover:underline", className)}
      {...props}
    />
  );
}

NavBarLink.displayName = "NavbarLink";

export { NavBar, NavBarContent, NavBarItem, NavBarLink };
