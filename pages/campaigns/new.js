import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Router from "next/router";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const CampaignNew = () => {
  const [minimum, setMinimum] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimum).send({ from: accounts[0] });
      Router.push("/");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
    setMinimum("");
  };

  return (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form onSubmit={onSubmit} error={!!error}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimum}
            onChange={(e) => setMinimum(e.target.value)}
          />
        </Form.Field>

        <Message error header="Oops!" content={error} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
