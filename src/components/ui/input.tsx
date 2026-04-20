import React, { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    children: React.ReactNode;
    idDaProp: string;
    variant?: "primary" | "secondary" | "ghost";
    fullWidth?: boolean;
    error?: string;
}

const variantClasses = {
    primary: "text-white bg-transparent border-2 border-proveup-orange rounded-xl px-4 py-2 hover:placeholder:text-transparent transition-all duration-300 focus:outline-hidden",
    secondary: "",
    ghost: "",
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    children,
    idDaProp = "text",
    variant = "primary",
    fullWidth = false,
    className = "",
    error,
    ...props
}, ref) => {
    const errorClass = error ? "border-red-500 focus:border-red-500" : "focus:border-proveup-dark-orange";
    
    // Cleanup spacing and concatenation
    const baseWidth = fullWidth ? "w-full" : "w-sm";
    const classes = `${baseWidth} ${variantClasses[variant]} ${errorClass} ${className}`;

    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={idDaProp} className="text-white text-sm pl-1">{children}</label>
            <input 
                ref={ref}
                id={idDaProp} 
                className={classes} 
                {...props} 
            />
            {error && <span className="text-red-500 text-xs px-1 inline-block min-h-[16px]">{error}</span>}
        </div>
    );
});
Input.displayName = "Input";
