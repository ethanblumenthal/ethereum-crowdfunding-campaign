import React from "react";
import factory from "../ethereum/factory";

export const getStaticProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
};

const CampaignIndex = ({ campaigns }) => {
  return <h1>{campaigns}</h1>;
};

export default CampaignIndex;
