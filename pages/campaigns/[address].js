import React from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";

export const getServerSideProps = async (ctx) => {
  const campaign = Campaign(ctx.params.address);
  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
};

const CampaignShow = () => {
  return (
    <Layout>
      <h3>Campaign Show</h3>
    </Layout>
  );
};

export default CampaignShow;
