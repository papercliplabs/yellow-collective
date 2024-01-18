import FaqElement from "@/components/FaqElement";
import Image from "next/image";

interface FaqItem {
    title: string;
    content: React.ReactNode;
}

const faqItems: FaqItem[] = [
    {
        title: "Summary",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        title: "Nouns Traits",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
];

export default function Faq() {
    return (
        <div className="flex flex-col w-full">
            <div className="bg-white w-full flex justify-center py-8 flex-col items-center">
                <div className="max-w-[754px] px-6 w-full flex flex-col gap-8 [&>p]:text-secondary bg-white">
                    <h2 className="md:px-4">FAQs</h2>
                    <div className="flex flex-col gap-4 w-full">
                        {faqItems.map((item, i) => (
                            <FaqElement title={item.title} key={i}>
                                {item.content}
                            </FaqElement>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-[68px] relative -translate-y-1">
                <Image src="/white-drip-2.png" fill={true} alt="" />
            </div>
        </div>
    );
}
