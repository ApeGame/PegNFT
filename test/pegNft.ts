import { PegNFT } from "./../typechain/PegNFT.d";
import { expect } from "chai";
import { ethers } from "hardhat";
import { constants, Wallet } from "ethers";

let PegNFTContract: PegNFT;

const bridge = new Wallet(
  "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
  ethers.provider
);

const test = new Wallet(
  "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
  ethers.provider
);

describe("Greeter", function () {
  before("create contract", async function () {
    const Greeter = await ethers.getContractFactory("PegNFT");
    const greeter = await Greeter.deploy(
      "Hello, world!",
      "HW",
      constants.AddressZero
    );
    PegNFTContract = await ethers.getContractAt(
      "PegNFT",
      (
        await greeter.deployed()
      ).address
    );
  });

  it("set bas uri", async function () {
    await expect(
      PegNFTContract.connect(test).setBaseURI("https://xiaobaiskill.com/image/")
    ).to.be.revertedWith("Ownable: caller is not the owner");

    PegNFTContract.setBaseURI("https://xiaobaiskill.com/image/");
  });

  it("set nft bridge", async function () {
    await expect(
      PegNFTContract.connect(test).setNftBridge(bridge.address, true)
    ).to.be.revertedWith("Ownable: caller is not the owner");

    await PegNFTContract.setNftBridge(bridge.address, true);
  });

  it("bridgeMint(address,uint256)", async function () {
    await expect(
      PegNFTContract.connect(test)["bridgeMint(address,uint256)"](
        test.address,
        1
      )
    ).to.be.revertedWith("caller is not bridge");

    await expect(
      PegNFTContract["bridgeMint(address,uint256)"](test.address, 1)
    ).to.be.revertedWith("caller is not bridge");

    PegNFTContract.connect(bridge)["bridgeMint(address,uint256)"](
      test.address,
      1
    );
  });

  it("bridgeMint(address,uint256,string)", async function () {
    await expect(
      PegNFTContract.connect(test)["bridgeMint(address,uint256,string)"](
        test.address,
        2,
        "1aaaa"
      )
    ).to.be.revertedWith("caller is not bridge");

    await expect(
      PegNFTContract["bridgeMint(address,uint256,string)"](
        test.address,
        2,
        "1aaaa"
      )
    ).to.be.revertedWith("caller is not bridge");

    PegNFTContract.connect(bridge)["bridgeMint(address,uint256,string)"](
      test.address,
      2,
      "1aaaa"
    );
  });

  it("burn", async function () {
    await expect(PegNFTContract.connect(test).burn(1)).to.be.revertedWith(
      "caller is not bridge"
    );

    await expect(PegNFTContract.burn(1)).to.be.revertedWith(
      "caller is not bridge"
    );

    expect(await PegNFTContract.ownerOf(1)).to.equal(test.address);
    expect(await PegNFTContract.ownerOf(2)).to.equal(test.address);

    console.log(await PegNFTContract.tokenURI(1));
    console.log(await PegNFTContract.tokenURI(2));

    PegNFTContract.connect(bridge).burn(1);
  });

  it("bridgeBurn", async function () {
    await expect(PegNFTContract.connect(test).bridgeBurn(2)).to.be.revertedWith(
      "caller is not bridge"
    );

    await expect(PegNFTContract.bridgeBurn(2)).to.be.revertedWith(
      "caller is not bridge"
    );

    await expect(
      PegNFTContract.connect(bridge).bridgeBurn(2)
    ).to.be.revertedWith("ERC721: burn caller is not owner nor approved");

    PegNFTContract.connect(test).approve(bridge.address, 2);

    PegNFTContract.connect(bridge).bridgeBurn(2);
  });
});
