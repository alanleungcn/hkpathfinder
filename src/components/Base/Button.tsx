import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";

const Button = ({
  children,
  className,
  disabled,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`cursor-pointer rounded-md border-[1px] border-neutral-200 bg-white px-3 py-1 transition-all enabled:hover:bg-neutral-500/5 enabled:active:bg-neutral-500/5 disabled:cursor-not-allowed disabled:bg-transparent  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
