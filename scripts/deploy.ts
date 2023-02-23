// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
const args = require("../arguments");

async function main() {
  const Pegnft = await ethers.getContractFactory("PegNFT");

  const pegnft = await Pegnft.deploy(args[0], args[1], args[2]);
  await pegnft.deployed();

  console.log("Pegnft deployed to:", pegnft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
