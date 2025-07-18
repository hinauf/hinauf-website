import { useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Link from "next/link";
import Image from "@/components/Image";
import Button from "@/components/Button";

import { headerNavigation } from "@/constants/navigation";

type HeaderProps = {
    className?: string;
    light?: boolean;
};

const Header = ({ className, light }: HeaderProps) => {
    const [visible, setVisible] = useState<boolean>(false);

    const toggleMenu = () => {
        setVisible(!visible);
        if (visible) {
            enablePageScroll();
        } else {
            disablePageScroll();
        }
    };

    return (
        <header className={`relative z-10 ${className || ""}`}>
            <div className="container flex items-center h-20 md:h-17">
                <Link
                    className="shrink-0 w-[7.25rem] md:relative md:z-3 md:w-25"
                    href="/"
                >
                    <Image
                        className="w-full opacity-100"
                        src={
                            light
                                ? "/images/logo-light.svg"
                                : "/images/logo-dark.svg"
                        }
                        width={116}
                        height={28}
                        alt=""
                    />
                </Link>
                <div
                    className={`flex items-center grow md:fixed md:z-2 md:inset-0 md:flex-col md:items-start md:pt-24 md:px-5 md:pb-8 md:transition-all ${
                        light ? "md:bg-g-300" : "md:bg-white"
                    } ${visible ? "" : "md:invisible md:opacity-0"}`}
                >
                    <nav className="flex mx-auto space-x-6 md:flex-col md:mx-0 md:space-x-0 md:space-y-8 md:mb-auto">
                        {headerNavigation.map((link) => (
                            <Link
                                className={`text-base font-semibold transition-colors lg:text-caption md:text-h5 ${
                                    light
                                        ? "text-w-50 hover:text-w-300"
                                        : "text-g-500 hover:text-g-200"
                                }`}
                                href={link.url}
                                key={link.id}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </nav>
                    <Button
                        title="Contact"
                        href="/contact"
                        light={light}
                        arrow
                    />
                </div>
                <button
                    className={`hidden relative z-20 flex-col justify-center items-center w-9 h-9 ml-auto rounded-full tap-highlight-color before:w-4 before:h-0.5 before:rounded-full before:transition-all after:w-4 after:h-0.5 after:rounded-full after:transition-all md:flex ${
                        visible
                            ? "before:rotate-45 before:translate-y-[0.37rem] after:-rotate-45 after:-translate-y-[0.37rem]"
                            : ""
                    } ${
                        light
                            ? "bg-white before:bg-g-500 after:bg-g-500"
                            : "bg-g-500 before:bg-[#DEDEDE] after:bg-[#DEDEDE]"
                    }`}
                    onClick={toggleMenu}
                >
                    <span
                        className={`w-4 h-0.5 my-1 rounded-full transition-all ${
                            visible ? "w-0 opacity-0" : ""
                        } ${light ? "bg-g-500" : "bg-[#DEDEDE]"}`}
                    ></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
