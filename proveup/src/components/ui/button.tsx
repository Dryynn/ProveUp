import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "ghost";
    fullWidth?: boolean;
}

const variantClasses = {
    primary: "flex bg-linear-to-br from-proveup-orange to-proveup-dark-orange text-white hover:shadow-[0_0_15px_rgba(242,116,39,0.4)]",
    secondary: "flex border-2 text-proveup-orange ",
    ghost: "",
}

export function Button({
    children,
    onClick,
    variant = "primary",
    fullWidth = false,
}: ButtonProps) {
    const classes = `
        ${fullWidth ? "w-42" : "w-auto"}
        ${variantClasses[variant]}
        h-8 font-bold py-2 px-4 rounded-2xl font-poppins transition-shadow duration-300 justify-center items-center
        `;


    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    );
}