import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
    clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-[18px]",
        "transition-all enabled:active:clickable-active",
        "disabled:pointer-events-none disabled:opacity-50 disabled:bg-disabled disabled:text-secondary disabled:border-none disabled:shadow-none active:shadow-none"
    ),
    {
        variants: {
            variant: {
                primary: "bg-accent-blue text-white hover:bg-[#319CFF] shadow-[0px_4.02px_0px_0px_#0464BC]",
                secondary: "bg-primary text-primary hover:bg-secondary shadow-[0px_4.02px_0px_0px_#BBB]  ",
                negative: "bg-negative text-white hover:bg-negative/80 shadow-[0px_4.02px_0px_0px_#bd1c11]  ",
                outline: "bg-transparent border-primary border-2 text-primary hover:bg-[#181818]/10 py-[13px]",
            },
            size: {
                default: "px-6 py-[15px]",
                icon: "px-[10px] py-[6px]",
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
            <button className={buttonVariants({ variant, size, className })} {...props} ref={ref}>
                {typeof children === "string" ? <h6>{children}</h6> : children}{" "}
            </button>
        );
    }
);
Button.displayName = "Button";

export default Button;
