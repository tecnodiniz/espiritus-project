import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

const NavBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "shadow text-black bg-neutral-50 dark:bg-neutral-950 dark:border-b dark:text-white",
      className
    )}
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
      "flex flex-wrap items-baseline justify-between min-h-20 max-w-7xl mx-auto px-4 pb-5 sm:px-6 lg:px-8",

      className
    )}
    {...props}
  />
));
NavBarContent.displayName = "NavBarContent";

const NavBarLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-6", className)}
    {...props}
  />
));

NavBarLogo.displayName = "NavBarLogo";

const NavbarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <div className="flex md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        ref={ref}
        className={cn("hidden md:flex items-baseline space-x-6", className)}
        {...props}
      />

      <div
        className={cn(
          "z-50 md:hidden w-full overflow-hidden transition-all duration-700 ease-in-out",
          isMenuOpen ? "max-h-[500px]" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-2">
          <div ref={ref} className="flex flex-col space-y-4" {...props} />
        </div>
      </div>
    </>
  );
});

NavbarMenu.displayName = "NavbarMenu";

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

export { NavBar, NavBarContent, NavBarLogo, NavbarMenu, NavBarLink };
