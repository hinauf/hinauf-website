import Image from "@/components/Image";

type PhotoProps = {
    className?: string;
    image: string;
};

const Photo = ({ className, image }: PhotoProps) => (
    <div className="pt150">
        <div
            className={`relative h-[44.5rem] 2xl:h-[40rem] xl:h-[32rem] ${
                className || ""
            }`}
        >
            <Image className="object-cover" src={image} fill alt="" />
        </div>
    </div>
);

export default Photo;
