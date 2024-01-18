import FaqElement from "@/components/FaqElement";
import Image from "next/image";
import ExternalLink from "./ExternalLink";

interface FaqItem {
    title: string;
    content: React.ReactNode;
}

const faqItems: FaqItem[] = [
    {
        title: "An Evolving Collection",
        content: (
            <>
                <p>
                    Approximately once every 3 months, The Yellow Collective will host a community-wide art contest and
                    choose a new set of traits (heads and accessories) that will then be inducted into the collection.
                    We may also decide as a Collective to retire certain traits at these intervals. This way, the
                    Collection will always feel fresh and community-curated!
                </p>
                <p>
                    On a related note, several times per year, the Collective may take a community poll to choose the
                    TOP TRAIT added to the collection during that period and make a Proposal to have this trait
                    “Graduated” to the OG Nouns collection, pending governance approval. In this way, artists from our
                    community will have the opportunity by winning a Yellow Collective Trait contest, to have their art
                    featured not only in the coolest Nounish project on BASE, but also in the most evergreen NFT DAO
                    collection on ETH mainnet-- Nouns DAO.
                </p>
            </>
        ),
    },
    {
        title: "Collective Nounders: Slow Growth, Careful Leadership",
        content: (
            <>
                <p>
                    The Yellow Collective was founded by the core team behind The Noun Square, the Collective Nounders
                    (alphebetically):
                </p>
                <ul className="list-disc list-inside pl-4">
                    <li>Benbodhi</li>
                    <li>Brettdrawsstuff</li>
                    <li>JackWyldes</li>
                    <li>Joshua Fisher</li>
                    <li>Prof Werder</li>
                    <li>Robotfishgir</li>
                    <li>Santhosh</li>
                    <li>SuperTightWoodyl</li>
                    <li>Symbiotech</li>
                    <li>Toady Hawk</li>
                    <li>Xargs</li>
                </ul>
                <p>
                    In the combined experienced opinions of the Collective Nounders, many DAOs and DAO-like
                    organisations have failed in recent years because of a lack of cohesion and guidance in the early
                    days of their growth. To ensure that TYC embarks on the desired path and remains laser focused on
                    the mission of supporting and empowering artists and creatives in our ecosystem, the Collective
                    Nounders will not hesitate to employ social pressure, governance leadership and, if necessary, a
                    Veto power, to ensure that the early direction is not compromised. They do however envision a near
                    future wherein these responsibilities can be progressively decentralised to the community.
                </p>
                <p>
                    A Collective Noun is not a claim on whatever treasury may accrue, it is a membership in an onchain
                    club.
                </p>
            </>
        ),
    },
    {
        title: "Periodic Automatic Allocations",
        content: (
            <>
                <p>
                    Every 10th Collective Noun will go to the Collective Nounder wallet as an incentive-aligning founder
                    reward.
                </p>
                <p>
                    Every 11th Collective Noun will go to the Collective Noun treasury. These Nouns will be earmarked as
                    prizes for Art Contests, as well as periodic Raffle Prizes for minters of TNS{" "}
                    <ExternalLink href="https://nomo.wtf">NOMO Nouns </ExternalLink> (as a way to potentially allow for
                    a lower cost entry to TYC for any of our global community members who may feel priced out by the
                    Daily auction.)
                </p>
            </>
        ),
    },
    {
        title: "Relationship to Nouns DAO",
        content: (
            <>
                <p>
                    The Yellow Collective and Collective Nouns would not exist without the gargantuan efforts of the
                    Nounders, and everyone who has contributed and built Nouns DAO into what it is today- a paragon of
                    decentralized community experimentation. TYC thanks Nouns for making their protocol open source,
                    their art CC0, and for funding Zora to create Nouns Builder, a tool that allows {"'"}Maximum Viable
                    Communities{"'"} like TNS to create an onchain club in just a few clicks. What a time to be alive!
                </p>
                <p>
                    The Yellow Collective is going to produce a LOT of onchain media. Content produced by The Noun
                    Square Media Collective. Entries to our art contests... We want to mint (and encourage our community
                    to mint) all the things to the Superchain. Thanks to Zora{"'"}s ground-breaking Creator Rewards
                    Program, this expected volume of minted Nounish content can and will create revenue over time, and
                    we will split those rewards with artists, and with Nouns.
                </p>
                <p className="font-bold">
                    Ten percent of any Creator Rewards earned by any piece minted by The Yellow Collective will be
                    automatically shared with Nouns DAO, as a thank you for its open source infrastructure.
                </p>
                <p>
                    Collective Nouns Uses the same protocol for onchain SVG artwork, and the same kind of pseudorandom
                    seeder contract as Nouns DAO. You can read more about both of these at nouns.wtf.
                </p>
            </>
        ),
    },
];

export default function Faq() {
    return (
        <div className="flex flex-col w-full">
            <div className="bg-white w-full flex justify-center py-8 flex-col items-center">
                <div className="max-w-[754px] px-6 w-full flex flex-col gap-8 [&>p]:text-secondary bg-white">
                    <h2 className="md:px-4 pt-8">More Info:</h2>
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
