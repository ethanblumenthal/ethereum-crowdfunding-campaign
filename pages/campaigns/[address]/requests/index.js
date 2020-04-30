import React from "react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import { Button } from "semantic-ui-react";

export const getServerSideProps = async (ctx) => {
  const { address } = ctx.query;
  return { props: { address } };
};

const RequestIndex = ({ address }) => {
  return (
    <Layout>
      <h3>Request List</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
    </Layout>
  );
};

export default RequestIndex;
