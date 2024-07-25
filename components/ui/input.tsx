import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMsg?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMsg = "", ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            errorMsg ? "border-red" : "border-gray",
            "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMsg && (
          <p className="text-red text-sm mt-1 absolute right-4 top-[18%]">
            {errorMsg}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
