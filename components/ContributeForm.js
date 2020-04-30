import React, { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Router from "next/router";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      Router.replace(`/campaigns/${address}`);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
    setValue("");
  };

  return (
    <Form onSubmit={onSubmit} error={!!error}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Field>

      <Message error header="Oops!" content={error} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
