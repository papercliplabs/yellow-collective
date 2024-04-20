import { NextApiRequest, NextApiResponse } from "next";
import { getEnsName } from "data/ens";
import { Address } from "viem";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;
  const ensName = await getEnsName({ address: address as Address });

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  res.setHeader(
    "Cache-Control",
    `s-maxage=${ONE_DAY_IN_SECONDS}, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );
  res.send(ensName);
};

export default handler;
