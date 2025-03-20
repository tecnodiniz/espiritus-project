import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { cn } from "@/utility/utils";

const NavBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "sticky top-0 z-50 shadow-md text-white bg-gradient-to-r from-purple-950 to-purple-800 dark:from-neutral-950 dark:to-gray-900 px-4 backdrop-blur-sm transition-all duration-300",
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
      "container mx-auto flex-col flex-wrap justify-between items-baseline sm:px-6 lg:px-8 md:flex sm:flex-col lg:flex-row",
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
  <div ref={ref} className={cn("text-xl font-bold", className)} {...props} />
));

NavBarLogo.displayName = "NavBarLogo";

const NavbarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <div className="flex md:hidden justify-end w-full">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-yellow-300 focus:outline-none transition-colors duration-200"
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
        className={cn(
          "hidden md:flex items-center gap-6 justify-between w-full lg:w-auto",
          className
        )}
        {...props}
      />

      <div
        className={cn(
          "absolute left-0 right-0 bg-gradient-to-r from-purple-950 to-purple-800 dark:from-neutral-950 dark:to-gray-900 md:hidden w-full overflow-hidden transition-all duration-500 ease-in-out border-t border-purple-700 dark:border-gray-800 shadow-lg",
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
        style={{
          top: isMenuOpen ? "100%" : "calc(100% - 5px)",
        }}
      >
        <div className="px-6 py-4">
          <div ref={ref} className="flex flex-col space-y-5" {...props} />
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
      className={cn(
        "text-white relative font-medium px-2 py-1 hover:text-yellow-300 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-yellow-300 after:transition-all hover:after:w-full",
        className
      )}
      {...props}
    />
  );
}

NavBarLink.displayName = "NavbarLink";

export { NavBar, NavBarContent, NavBarLogo, NavbarMenu, NavBarLink };
