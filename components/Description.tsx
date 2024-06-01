import Image from "next/image";
import ExternalLink from "./ExternalLink";


export default function Description() {

  return (
    
    <>
      <div className="w-full flex flex-col justify-center items-center gap-0">
        <div style={{color: "var(--brand-text-main)"}} className="w-full flex justify-center pt-8">
          <div className="max-w-[720px] px-6 w-full flex flex-col gap-4">
            <h2>
              The Beautiful Game: On-Chian
            </h2>
            <p>
            Coppa Nouns are the fútbal loving <ExternalLink  href="https://nouns.wtf/" > Nouns </ExternalLink>
            darivative, attempt to bring the love of the beautiful game on-chain. Coppa Nouns are the newest way to support your National team and to get rewarded for doing so!
          When you collect a Coppa Noun, you are not only supporting your favorite team, but you will also enter a very Nounish tournament. When the countries play games IRL during tournaments, the owns of the winning country will be rewarded with ETH from the treasury, specifical dedicated for real world Tournaments.
            
            </p>
          
            <h2 className="pt-4">
              Coppa Nouns Tournys for real world games:
            </h2>
            <p>
              Coppa Nouns were original part of {" "}
              <ExternalLink href="https://www.footynouns.wtf/">Footy Nouns</ExternalLink>,
              a <ExternalLink href="https://nouns.wtf"> Nouns</ExternalLink>{" "} derivative project released in 2021, but has found a new home here on Base!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
