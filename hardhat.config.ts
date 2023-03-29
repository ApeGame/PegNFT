import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  networks: {
    polygon: {
      url: process.env.POLYGON_MAIN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygonzkevm: {
      url: process.env.POLYGON_MAIN_ZKEVM_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygontest: {
      url: process.env.POLYGON_TEST_URL || "",
      accounts:
        process.env.PRIVATE_KEY_TEST !== undefined
          ? [process.env.PRIVATE_KEY_TEST]
          : [],
    },
    polygontestzkevm: {
      url: process.env.POLYGON_TEST_ZKEVM_URL || "",
      accounts:
        process.env.PRIVATE_KEY_TEST !== undefined
          ? [process.env.PRIVATE_KEY_TEST]
          : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      polygonMumbai: "AETMWJBB9WTFK95EE98W8D3JTBXWGX83SZ",
      polygon: "AETMWJBB9WTFK95EE98W8D3JTBXWGX83SZ",
      polygonzkevm: "QADPA8U7I9EU4K1I672Y9QHRAY7PFJ5WAX",
    },
    customChains: [
      {
        network: "polygonzkevm",
        chainId: 1101,
        urls: {
          apiURL: "https://api-zkevm.polygonscan.com/api",
          browserURL: "https://zkevm.polygonscan.com/",
        },
      },
    ],
  },
};

export default config;
