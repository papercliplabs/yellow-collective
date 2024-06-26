import FaqElement from "@/components/FaqElement";
import ExternalLink from "./ExternalLink";

interface FaqItem {
  title: string;
  content: React.ReactNode;
}

const faqItems: FaqItem[] = [

  {
    title: "How the games work",
    content: (
      <>
        <p>  
        During major tournaments like the World Cup, UEFA Euros, and Copa America, 
        owners of Coppa Nouns have the chance to win ETH if they hold a Coppa Noun from a winning country. 
        If you mint or buy a Coppa Noun anytime during the tournament, you will automatically qualify for rewards for that country. 
        A snapshot will be taken at the kick-off of the final, so you will need to mint or buy your Coppa Noun before kick-off. 
        The winnings will be split among the holders of that country.


        </p>
        <p>
        For the Euros and Copa America, there will be a 0.5 ETH prize pool for both tournaments.
         For each tournament, rewards will be given out for 1st, 2nd, and 3rd place:          </p>
          <ul className="text-indent">
            1st place: 60% of the pool
          </ul>
          <ul className="text-indent">
            2nd place: 30% of the pool
          </ul>
          <ul className="text-indent">
            3rd place: 10% of the pool
          </ul>
        <p>
        The rewards will be paid out once the final has been played and a winning country has been decided. 
        Minting will continue throughout the tournament.         
        </p>
         </>
    ),
  },
  {
    title: "Relationship to Footy Nouns",
    content: (
      <>
        <p>
        Coppa Nouns would not exist without <ExternalLink href="https://www.footynouns.wtf/">Footy Nouns</ExternalLink>. 
        Footy Nouns was another football-centered Nouns derivative that launched on Arbitrum in 2021 that recently released the art to the community.
        Coppa Nouns brought back the original art from the project, and brought a whole lot more with it.

        While Coppa Nouns is not directly associated with Footy Nouns, we wouldn’t be here today without them.
        </p>
      </>
    ),
  },
];

export default function Faq() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex justify-center py-8 flex-col items-center">
        <div className="max-w-[754px] px-6 w-full flex flex-col gap-8">
          <h2 className="md:px-4 pt-8">Additional Info:</h2>
          <div className="flex flex-col gap-8 md:gap-4 w-full">
            {faqItems.map((item, i) => (
              <FaqElement title={item.title} key={i}>
                {item.content}
              </FaqElement>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
