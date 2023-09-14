import styled from "styled-components";

import { ValidNetwork } from "@daohaus/keychain-utils";

import { NFT_ADDRESS } from "../utils/constants";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { Loading, breakpoints, widthQuery } from "@daohaus/ui";
import { NftCard } from "./NftCard";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 4rem;
  row-gap: 2rem;
  justify-content: center;
  width: 64rem;
  @media (min-width: ${breakpoints.xs}) {
    justify-content: flex-start;
  }
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const ProfileNftList = ({
  address,
  daoChain,
  isHolder,
}: {
  address: string;
  daoChain: ValidNetwork;
  isHolder?: boolean;
}) => {
  //todo: will come from some shaman hook;
  const nftAddress = NFT_ADDRESS;

  const { accountNfts, isLoading } = useAccountNfts({
    accountAddress: address,
    contractAddress: nftAddress,
    chainId: daoChain,
  });

  console.log("accountNfts", accountNfts);

  if (isLoading) return <Loading />;

  return (
    <ListContainer>
      {accountNfts &&
        accountNfts.map((nft) => {
          return <NftCard nft={nft} key={nft.tokenID} isHolder={isHolder} />;
        })}
    </ListContainer>
  );
};
