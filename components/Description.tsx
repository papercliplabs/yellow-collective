import Image from "next/image";
import ExternalLink from "./ExternalLink";

export default function Description() {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center gap-0">
                <div className="w-full h-[60px] relative translate-y-1">
                    <Image src="/white-drip.png" fill={true} alt="" />
                </div>
                <div className="bg-white w-full flex justify-center pt-8">
                    <div className="max-w-[720px] px-6 w-full flex flex-col gap-4 [&>p]:text-secondary">
                        <h2>WTF is The Yellow Collective and Collective Nouns?</h2>
                        <p>
                            The Yellow Collective is a new onchain club on the BASE Ethereum L2 network, designed to
                            support and empower artists and creatives in the Nouns and{" "}
                            <ExternalLink href="https://www.coingecko.com/learn/optimism-superchain-interoperability-ethereum">
                                Superchain
                            </ExternalLink>{" "}
                            ecosystems. One Collective Noun will be auctioned every day, forever. Auction proceeds will
                            be used to host art contests and commission creatives in our communities, in collaboration
                            with{" "}
                            <ExternalLink href="https://tns.wtf">
                                The Noun Square Onchain Media Collective.
                            </ExternalLink>
                        </p>
                        <video controls className="rounded-3xl border-[4px] border-secondary">
                            <source src="/yellow-collective-intro-720.mov" />
                        </video>
                        <p>
                            Members of The Yellow Collective will coordinate onchain using{" "}
                            <ExternalLink href="https://www.farcaster.xyz">Farcaster</ExternalLink> and snapshot voting
                            to help decide on contests and other activations to support artists and creators.
                        </p>
                        <p className="font-bold">
                            Minting a Collective Noun is a signal to your network that you love Nouns, that you believe
                            in the power of Ethereum L2s like BASE, Zora and Optimism, and that you are a modern day,
                            onchain, patron of the arts. Plus, they look pretty cool!
                        </p>
                        <h2 className="pt-4">Nouns Made By the Community, For the Community</h2>
                        <p>
                            Collective Nouns are made in the image of the original{" "}
                            <ExternalLink href="https://nouns.wtf">Nouns DAO</ExternalLink>, except all of the Head
                            Traits were drawn by community members at{" "}
                            <ExternalLink href="https://x.com/thenounsquare">The Noun Square</ExternalLink> in a{" "}
                            <ExternalLink href="https://offchain.prop.house/the-yellow-collective/the-yellow-collective-trait-contest-1:-best-noun-heads">
                                Prop House contest
                            </ExternalLink>
                            .
                        </p>
                        <p>
                            They all sport a distinctive shade of Yellow Collective Noggles (so that we can aways tell
                            they{"'"}re family!) And in lieu of the “warm” and “cool” backgrounds in classic Nouns,
                            Collective Nouns backdrops are either “Based” (light BASE blue) or “Yellow” (light TYC
                            Yellow.) At launch, we{"'"}ve used the bodies and accessories from the original Nouns
                            collection (with a couple Easter Eggs thrown in.) That{"'"}s the power of CC0!
                        </p>
                        <p>
                            Here{"'"}s a fun video we made showing off all 55 inaugural heads, in the style of a cheesy
                            90{"'"}s Toy Commercial:
                        </p>
                        <video controls className="rounded-3xl border-[4px] border-secondary">
                            <source src="/traits.mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </>
    );
}
