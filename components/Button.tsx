import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  clsx(
    "inline-flex items-center justify-center whitespace-nowrap shrink-0",
    "transition-all enabled:active:clickable-active",
    "disabled:pointer-events-none disabled:opacity-50 disabled:bg-disabled disabled:text-secondary disabled:border-none disabled:shadow-none active:shadow-none"
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-[--brand-text-main] text-[--brand-background-main] border-[--brand-text-main] border-2 hover:bg-[--brand-background-secondary-tran-2] hover:border-[--brand-text-main] hover:text-[--brand-text-main]  active:translate-y-1",
        secondary:
          "text-[--brand-text-main] border-[--brand-text-main] border hover:bg-[--brand-background-secondary-tran-2]  active:translate-y-1",
        negative:
          "bg-negative text-white hover:bg-negative/80  active:translate-y-1",
        outline:
          "bg-transparent border-[--brand-text-main] border text-primary hover:bg-[--brand-background-secondary-tran-2] py-[13px]",
        footer:
          "hover:bg-[--brand-text-main]"
      },
      size: {
        default: "px-6 py-[15px]",
        tight: "p-4",
        icon: "px-[10px] py-[6px] rounded-[18px]",
        rounded: "p-[12px] rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        {...props}
        ref={ref}
      >
        {typeof children === "string" ? <h6>{children}</h6> : children}{" "}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
