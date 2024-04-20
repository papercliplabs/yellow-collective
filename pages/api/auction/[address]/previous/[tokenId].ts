import { NextApiRequest, NextApiResponse } from "next";
import { getPreviousAuction } from "data/nouns-builder/auction";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, tokenId } = req.query;

  const previousAuction = await getPreviousAuction({
    address: address as string,
    tokenId: tokenId as string,
  });

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  res.setHeader(
    "Cache-Control",
    `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );
  res.send(previousAuction);
};

export default handler;
