import Icon from "@/components/Icon";

type PaginationProps = {};

const Pagination = ({}: PaginationProps) => {
    const active = true;

    return (
        <div className="flex justify-center items-center mt-25 space-x-2 2xl:mt-20 xl:mt-12 md:space-x-1">
            <button className="group w-10 h-9 text-0">
                <Icon
                    className="!w-5 !h-5 fill-g-100 transition-colors group-hover:fill-g-500"
                    name="arrow-left"
                />
            </button>
            <button
                className={`w-10 h-9 font-normal text-g-100 transition-colors hover:text-g-500 ${
                    active ? "text-g-500 font-medium" : ""
                }`}
            >
                01
            </button>
            <button className="w-10 h-9 font-normal text-g-100 transition-colors hover:text-g-500">
                02
            </button>
            <button className="w-10 h-9 font-normal text-g-100 transition-colors hover:text-g-500">
                03
            </button>
            <button className="w-10 h-9 font-normal text-g-100 transition-colors hover:text-g-500">
                04
            </button>
            <button className="w-10 h-9 font-normal text-g-100 transition-colors hover:text-g-500">
                ...
            </button>
            <button className="w-10 h-9 font-normal text-g-100 transition-colors hover:text-g-500">
                10
            </button>
            <button className="group w-10 h-9 text-0">
                <Icon
                    className="!w-5 !h-5 fill-g-100 transition-colors group-hover:fill-g-500"
                    name="arrow-right"
                />
            </button>
        </div>
    );
};

export default Pagination;
