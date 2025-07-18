import { Listbox, Transition } from "@headlessui/react";
import Icon from "@/components/Icon";

type ItemsType = {
    id: string;
    title: string;
};

type SelectProps = {
    className?: string;
    classButton?: string;
    classOption?: string;
    label?: string;
    placeholder?: string;
    value: any;
    onChange: any;
    items: ItemsType[];
};

const Select = ({
    className,
    classButton,
    classOption,
    label,
    placeholder,
    value,
    onChange,
    items,
}: SelectProps) => (
    <div className={`${className || ""}`}>
        {label && <div className="mb-3.5">{label}</div>}
        <Listbox
            className="relative"
            value={value}
            onChange={onChange}
            as="div"
        >
            <Listbox.Button
                className={`flex justify-between items-center w-full h-14 px-4 rounded-full border border-g-75 text-body font-normal outline-none transition-colors ui-open:border-g-200 md:h-12 md:text-caption ${
                    value ? "text-g-500" : "text-g-75"
                } ${classButton || ""}`}
            >
                <div className="truncate">
                    {value ? value.title : placeholder}
                </div>
                <Icon
                    className="shrink-0 ml-2 fill-[#09244B] transition-transform ui-open:rotate-180"
                    name="arrow-down"
                />
            </Listbox.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Listbox.Options className="absolute top-full left-0 right-0 z-2 mt-0.5 border border-g-75 bg-white rounded-3xl outline-none overflow-hidden">
                    {items.map((item) => (
                        <Listbox.Option
                            className={`px-4 py-3 text-body font-normal transition-colors cursor-pointer hover:bg-g-50/30 ui-selected:bg-g-50 md:text-caption ${
                                classOption || ""
                            }`}
                            key={item.id}
                            value={item}
                        >
                            {item.title}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    </div>
);

export default Select;
