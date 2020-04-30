import React from "react";
import { Card } from "semantic-ui-react";
import factory from "../ethereum/factory";

export const getStaticProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
};

const CampaignIndex = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => ({
      header: address,
      description: <a>View Campaign</a>,
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
      />
      {renderCampaigns()}
    </div>
  );
};

export default CampaignIndex;
