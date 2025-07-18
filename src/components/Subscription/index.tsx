import { useState } from "react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

type SubscriptionProps = {};

const Subscription = ({}: SubscriptionProps) => {
    const [email, setEmail] = useState("");

    return (
        <div className="pt150">
            <div className="container">
                <div className="relative flex items-end min-h-[39.69rem] px-12 py-18 rounded-[2rem] overflow-hidden after:absolute after:inset-0 after:bg-black/60 xl:min-h-[34rem] xl:py-12 md:px-5">
                    <Image
                        className="object-cover md:object-[70%50%]"
                        src="/images/content/bg-subscription.jpg"
                        fill
                        alt=""
                    />
                    <div className="relative z-3 flex lg:block">
                        <div className="shrink-0 w-[35.625rem] text-h1 text-w-50 2xl:w-[30rem] xl:w-[24rem] lg:w-full lg:mb-4">
                            Get the best driving experience with carsova
                            electric cars.
                        </div>
                        <div className="grow pl-30 2xl:pl-12 lg:pl-0">
                            <div className="mb-8 text-w-50">
                                Immediately discover unlimited driving freedom,
                                and enjoy your journey with the best style and
                                performance. Carsova Electric Cars, provides
                                more than just a car, but an unforgettable
                                driving experience
                            </div>
                            <form
                                className="flex max-w-[22.875rem] p-1.5 bg-g-500 rounded-full"
                                action=""
                                onSubmit={() => console.log("Submit")}
                            >
                                <input
                                    className="grow h-11 bg-white px-3 rounded-full outline-none text-caption font-normal text-g-500 placeholder:text-g-75"
                                    type="email"
                                    name="subscription"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                                <button className="group shrink-0 w-11 h-11 ml-2 bg-white rounded-full text-0">
                                    <Icon
                                        className="transition-colors group-hover:fill-g-200"
                                        name="arrow-right"
                                    />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
