import React from "react";

import { ParMd, ParXl, SingleColumnLayout } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";
import { styled } from "styled-components";
import { ClaimList } from "../components/ClaimList";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { useClaimShaman } from "../hooks/useClaimShaman";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";

const ContentContainer = styled.div`
  text-align: left;
  width: 100%;
`;

export const Claim = ({ dao }: { dao: MolochV3Dao }) => {
  const { address } = useDHConnect();
  const { daoChain } = useCurrentDao();
  const { sdata } = useClaimShaman({
    dao,
    chainId: daoChain,
  });

  return (
    <SingleColumnLayout title="Claim Your Airdrop">
      {!address && (
        <ContentContainer>
          <ParXl>SiloHaus RDF airdrop tool</ParXl>
          <ParMd>Connect your wallet to see your available claims.</ParMd>
        </ContentContainer>
      )}
      {address && daoChain && sdata?.nft.result && (
        <ClaimList
          address={address}
          daoChain={daoChain}
          nftAddress={sdata.nft.result}
        />
      )}
    </SingleColumnLayout>
  );
};
