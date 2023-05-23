// require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/7c02737cf5f14c60899538534507f28c",
      accounts: [
        "e38f16732ae8363d931591061d2b36337c5778c45fa016aea283b2b632fdab0f",
      ],
    },
  },
  solidity: "0.8.18",
};

export default config;
