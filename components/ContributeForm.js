import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    const campaign = Campaign(address);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Field>

      <Button primary>Contribute!</Button>
    </Form>
  );
};

export default ContributeForm;
