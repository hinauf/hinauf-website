import { ChangeEvent } from "react";

type FieldProps = {
    className?: string;
    classInput?: string;
    label?: string;
    note?: string;
    textarea?: boolean;
    type?: string;
};

const Field = ({
    className,
    classInput,
    label,
    note,
    textarea,
    type,
    ...inputProps
}: FieldProps &
    React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <div className={`${className || ""}`}>
            {label && <div className="mb-3.5">{label}</div>}
            <div className={`relative ${textarea ? "text-0" : ""}`}>
                {textarea ? (
                    <textarea
                        className={`w-full h-[14.875rem] p-4 bg-white border border-g-75 rounded-2xl font-sans text-caption font-normal text-g-500 resize-none placeholder:text-g-75 transition-colors focus:border-g-200 outline-none ${
                            classInput || ""
                        }`}
                        {...inputProps}
                    ></textarea>
                ) : (
                    <input
                        className={`w-full h-13 px-4 bg-white border border-g-75 rounded-full font-sans text-caption font-normal text-g-500 placeholder:text-g-75 transition-colors focus:border-g-200 outline-none md:h-11 ${
                            classInput || ""
                        }`}
                        type={type || "text"}
                        {...inputProps}
                    />
                )}
            </div>
        </div>
    );
};

export default Field;
