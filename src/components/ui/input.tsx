import React from "react";

type InputProps = {
    children: React.ReactNode;
    idDaProp: string;
    placeholder: string;
    variant?: "primary" | "secondary" | "ghost";
    fullWidth?: boolean;
    className?: string;
}

const variantClasses = {
    primary: "text-white border-2 border-proveup-orange rounded-xl pl-4 py-2 hover:placeholder:text-transparent transition-all duration-300",
    secondary: "",
    ghost: "",
}

export function Input({
    children,
    idDaProp = "text",
    placeholder = "text",
    variant = "primary",
    fullWidth = false,
    className,
}: InputProps) {
    const classes = `
        ${fullWidth ? "w-full" : "w-sm"}
        ${variantClasses[variant]}
        ${className}
        `;

    return (
        <>
            <label htmlFor={idDaProp} className="p-2">{children}</label>
            <input id={idDaProp} className={classes} placeholder={placeholder} />
        </>
    );
}