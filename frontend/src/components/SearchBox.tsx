import * as React from "react";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import "./SearchBox.css";
const SearchBox = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <div className="wrapper">
      <Search />
      <input
        type={type}
        className={cn(
          "flex h-9 w-full p10 rounded-md border border-input bg-transparent px-10 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
SearchBox.displayName = "SearchBox";

export { SearchBox };
