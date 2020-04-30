import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xF2D28C9Aac0c22698A7bCE6014b637eaF2D14C08"
);

export default instance;
