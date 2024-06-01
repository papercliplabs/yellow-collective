import FaqElement from "@/components/FaqElement";
import ExternalLink from "./ExternalLink";

interface FaqItem {
  title: string;
  content: React.ReactNode;
}

const faqItems: FaqItem[] = [

  {
    title: "How the games work:",
    content: (
      <>
        <p>
          80% of all auctions go towards real world tournaments.
        </p>
        <p>  
           During major tournaments, like the World Cup, UEFA Euro, and Copa America,
          games will be choosen by the founders but will consist of group play winners, knockout rounds, and the final, and will also be dependent on wwhich countries have been minted. (i.e. if a particual country has not been minted, their game wont be selected.)
          If you mint or buy a Coppa Noun anytime during the tournament, you will automaticly qualify for rewards for that country, include previous games.
        </p>
        <p>
         Weights will be added to the games, with the final recieving the most rewards and group winners receiving the lowest amount. 
        Thw winnings will then be split between the owners of the winning country.
        </p>
        <p>
         The rewards will be paid out once the final has been played and a winning country has been decided. Minting will continue through the tournament.
         </p>
         </>
    ),
  },
  {
    title: "Relationship to Footy Nouns",
    content: (
      <>
        <p>
          Coppa Nouns would not exist without the <ExternalLink href="https://www.footynouns.wtf/">Footy Nouns</ExternalLink>. 
          Footy Nouns originally launch in 2021 on Arbitrum. The art was then released to the community and Copppaa Nouns was born, finding a new home on base. 
          While Coppa Nouns is not directly asssocite with Footy Nouns, we wont be here today if it wasnt for them.
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
