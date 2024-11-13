import { NextApiRequest, NextApiResponse } from "next";
import { getMainnetBalanceOf } from "data/nouns-builder/token";
import { NOUNS_TOKEN_CONTRACT } from "constants/addresses";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.query;
  const balance = await getMainnetBalanceOf({
    address: NOUNS_TOKEN_CONTRACT as "0x${string}",
    user: user as "0x${string}",
  });

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  res.setHeader(
    "Cache-Control",
    `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );
  res.send(balance);
};

export default handler;
