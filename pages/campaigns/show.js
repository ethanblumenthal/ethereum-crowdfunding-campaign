import React from "react";
import Layout from "../../components/Layout";

const CampaignShow = () => {
  export const getStaticProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { props: { campaigns } };
  };

  return (
    <Layout>
      <h3>Campaign Show</h3>
    </Layout>
  );
};

export default CampaignShow;
