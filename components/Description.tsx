import Image from "next/image";
import ExternalLink from "./ExternalLink";


export default function Description() {

  return (
    
    <>
      <div className="w-full flex flex-col justify-center items-center gap-0">
        <div style={{color: "var(--brand-text-main)"}} className="w-full flex justify-center pt-8">
          <div className="max-w-[720px] px-6 w-full flex flex-col gap-4">
            <h2>
              The Beautiful Game Onchain
            </h2>
            <p>
              Coppa Nouns is a football-loving DAO that brings the beautiful game onchain.
              When you mint a Coppa Noun, the kit your Coppa Noun wears determines which country it represents.
              During major tournaments, owners of Coppa Nouns have the opportunity to win rewards for the country they represent.
              </p>
              <p>
              Funds from auctions, along with sponsorships from those who believe in our mission, go towards Coppa Nouns tournaments.
              These rewards are then distributed back to the community of Coppa Noun holders based on how well their country plays.
              </p>
              <p>
              If you believe in a team or want to support your favorite country, mint a Coppa Noun and help us bring the beautiful game onchain.
              </p>
          </div>
        </div>
      </div>
    </>
  );
}
