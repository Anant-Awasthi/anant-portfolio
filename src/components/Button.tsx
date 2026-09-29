import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "icon";
  ref?: Ref<HTMLButtonElement>;
};

export function Button({
  asChild = false,
  children,
  className,
  variant = "primary",
  size = "default",
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-primary text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:bg-primary/90",
        variant === "outline" && "border border-border bg-surface/60 text-foreground hover:border-primary/50 hover:bg-accent",
        variant === "ghost" && "text-muted-foreground hover:bg-accent hover:text-foreground",
        size === "default" && "h-11 px-5 text-sm",
        size === "icon" && "size-10",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}