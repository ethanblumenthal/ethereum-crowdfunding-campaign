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
  const approversCount = await campaign.methods.approversCount().call();

  const requestData = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((elm, idx) => {
        return campaign.methods.requests(idx).call();
      })
  );

  const requests = JSON.parse(JSON.stringify(requestData));
  return { props: { address, requests, requestCount, approversCount } };
};

const RequestIndex = ({ address, requests, requestCount, approversCount }) => {
  const { Header, HeaderCell, Body } = Table;

  const renderRows = () => {
    return requests.map((request, idx) => (
      <RequestRow
        key={idx}
        id={idx}
        address={address}
        request={request}
        approversCount={approversCount}
      />
    ));
  };

  return (
    <Layout>
      <Link href={`/campaigns/${address}`}>
        <a>Back</a>
      </Link>
      <h3>Request List</h3>

      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: "10px" }}>
            Add Request
          </Button>
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
      <div>Found {requestCount} requests.</div>
    </Layout>
  );
};

export default RequestIndex;
