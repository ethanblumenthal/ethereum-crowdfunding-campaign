import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xD5F985B7D6EAB16110E3682cccCE5D26F605A569"
);

export default instance;
