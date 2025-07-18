import Link from "next/link";
import Icon from "@/components/Icon";

type ButtonProps = {
    className?: string;
    title: string;
    href?: any;
    onClick?: () => void;
    arrow?: boolean;
    light?: boolean;
};

const Button = ({
    className,
    title,
    href,
    onClick,
    arrow,
    light,
}: ButtonProps) => {
    const CreatedTag = href ? Link : "button";

    return (
        <CreatedTag
            className={`btn group ${
                light
                    ? "border-w-50 bg-w-50 text-g-500 hover:bg-g-500 hover:text-white"
                    : "border-g-500 bg-g-500 text-w-50 hover:bg-white hover:text-g-500"
            } ${className || ""}`}
            href={href}
            onClick={onClick}
        >
            <span className="mr-auto">{title}</span>
            {arrow && (
                <span
                    className={`flex items-center justify-center w-8 h-8 ml-6 -mr-3 rounded-full transition-colors ${
                        light
                            ? "bg-g-500 group-hover:bg-white"
                            : "bg-white group-hover:bg-g-500"
                    }`}
                >
                    <Icon
                        className={`!w-5 !h-5 transition-colors ${
                            light
                                ? "fill-white group-hover:fill-g-500"
                                : "fill-g-500 group-hover:fill-white"
                        }`}
                        name="arrow-right"
                    />
                </span>
            )}
        </CreatedTag>
    );
};

export default Button;
