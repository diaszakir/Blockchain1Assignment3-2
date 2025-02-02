const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let MyToken;
  let myToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    MyToken = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    myToken = await MyToken.deploy(owner.address);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await myToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await myToken.balanceOf(owner.address);
      expect(await myToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should have correct initial supply", async function () {
      const totalSupply = await myToken.totalSupply();
      expect(totalSupply).to.equal(ethers.parseEther("2000"));
    });

    it("Should fail if deployed with zero address as owner", async function () {
      const MyToken = await ethers.getContractFactory("MyToken");
      await expect(MyToken.deploy(ethers.ZeroAddress)).to.be.reverted;
    });
  });
});
