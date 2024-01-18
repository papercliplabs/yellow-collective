import Image from "next/image";

export default function Description() {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center gap-0">
                <div className="w-full h-[60px] relative translate-y-1">
                    <Image src="/white-drip.png" fill={true} alt="" />
                </div>
                <div className="bg-white w-full flex justify-center pt-8">
                    <div className="max-w-[720px] px-6 w-full flex flex-col gap-4 [&>p]:text-secondary">
                        <h2>WTF is Yellow Collective?</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.{" "}
                        </p>
                        <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                            anim id est laborum.
                        </p>
                        <div className="py-6">VIDEO</div>
                    </div>
                </div>
            </div>
        </>
    );
}
