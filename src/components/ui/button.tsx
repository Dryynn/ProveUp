import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "ghost";
    fullWidth?: boolean;
    className?: string;
}

const variantClasses = {
    primary: "flex bg-linear-to-br from-proveup-orange to-proveup-dark-orange text-white hover:shadow-[0_0_18px_rgba(242,116,39,0.6)]",
    secondary: "flex border-2 text-proveup-orange ",
    ghost: "",
}

export function Button({
    children,
    onClick,
    variant = "primary",
    fullWidth = false,
    className,
}: ButtonProps) {
    const classes = `
        ${fullWidth ? "w-42" : "w-auto"}
        ${variantClasses[variant]}
        h-8 font-bold py-2 px-4 rounded-2xl font-poppins transition-shadow duration-300 justify-center items-center
        ${className}
        `;


    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    );
}