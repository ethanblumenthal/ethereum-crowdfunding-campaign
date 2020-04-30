import React from "react";
import Link from "next/link";
import { Button, Table } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
import RequestRow from "../../../../components/RequestRow";
import Campaign from "../../../../ethereum/campaign";

export const getServerSideProps = async (ctx) => {
  const { address } = ctx.query;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((elm, idx) => {
        return campaign.methods.requests(idx).call();
      })
  );
  return { props: { address, requests, requestCount } };
};

const RequestIndex = ({ address, requests, requestCount }) => {
  const { Header, HeaderCell, Body } = Table;

  renderRows = () => {
    return requests.map((request, idx) => (
      <RequestRow key={idx} id={idx} request={request} address={address} />
    ));
  };

  return (
    <Layout>
      <h3>Request List</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>

      <Table>
        <Header>
          <HeaderCell>ID</HeaderCell>
          <HeaderCell>Description</HeaderCell>
          <HeaderCell>Amount</HeaderCell>
          <HeaderCell>Recipient</HeaderCell>
          <HeaderCell>Approval Count</HeaderCell>
          <HeaderCell>Approve</HeaderCell>
          <HeaderCell>Finalize</HeaderCell>
        </Header>

        <Body>{renderRows()}</Body>
      </Table>
    </Layout>
  );
};

export default RequestIndex;
