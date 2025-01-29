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
    // Get the ContractFactory and Signers here.
    MyToken = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy a new MyToken contract before each test
    myToken = await MyToken.deploy();
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
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await myToken.transfer(addr1.address, 50);
      const addr1Balance = await myToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      // Transfer 50 tokens from addr1 to addr2
      await myToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await myToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      // Try to send more tokens than the total supply
      const totalSupply = await myToken.totalSupply();
      const exceedingAmount = totalSupply + ethers.parseEther("1"); // Trying to send more than exists

      // Try to send tokens from addr1 (which has 0 tokens)
      await expect(
        myToken.connect(addr1).transfer(addr2.address, exceedingAmount)
      ).to.be.reverted;

      // Try to send tokens from owner (more than their balance)
      await expect(myToken.transfer(addr1.address, exceedingAmount)).to.be
        .reverted;

      // Check that balances remained unchanged
      expect(await myToken.balanceOf(addr1.address)).to.equal(0);
      expect(await myToken.balanceOf(owner.address)).to.equal(totalSupply);
    });

    it("Should update transaction history on transfer", async function () {
      const transferAmount = 100;
      await myToken.transfer(addr1.address, transferAmount);

      const latestSender = await myToken.getLatestTransactionSender();
      const latestReceiver = await myToken.getLatestTransactionReceiver();

      expect(latestSender).to.equal(owner.address);
      expect(latestReceiver).to.equal(addr1.address);
    });
  });

  describe("Transaction History", function () {
    it("Should fail to get latest transaction details when no transactions exist", async function () {
      await expect(myToken.getLatestTransactionTime()).to.be.revertedWith(
        "No transactions yet"
      );
      await expect(myToken.getLatestTransactionSender()).to.be.revertedWith(
        "No transactions yet"
      );
      await expect(myToken.getLatestTransactionReceiver()).to.be.revertedWith(
        "No transactions yet"
      );
    });

    it("Should return correct transaction time format", async function () {
      await myToken.transfer(addr1.address, 100);
      const timeString = await myToken.getLatestTransactionTime();

      // Check if the returned string matches the expected format (YYYY-MM-DD HH:MM:SS)
      expect(timeString).to.match(
        /^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/
      );
    });
  });

  describe("TransferFrom", function () {
    it("Should handle transferFrom correctly", async function () {
      const approveAmount = 1000;
      const transferAmount = 500;

      // Owner approves addr1 to spend tokens
      await myToken.approve(addr1.address, approveAmount);

      // addr1 transfers tokens from owner to addr2
      await myToken
        .connect(addr1)
        .transferFrom(owner.address, addr2.address, transferAmount);

      // Check balances
      expect(await myToken.balanceOf(addr2.address)).to.equal(transferAmount);
      expect(await myToken.allowance(owner.address, addr1.address)).to.equal(
        approveAmount - transferAmount
      );

      // Check transaction history
      const latestSender = await myToken.getLatestTransactionSender();
      const latestReceiver = await myToken.getLatestTransactionReceiver();
      expect(latestSender).to.equal(owner.address);
      expect(latestReceiver).to.equal(addr2.address);
    });
  });
});
