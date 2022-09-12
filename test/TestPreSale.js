const BEP20Token = artifacts.require("BEP20Token");
const FBNCToken = artifacts.require("FBNCToken");
const FbncPreSale = artifacts.require("FbncPreSale");

const {expectRevert} = require("openzeppelin-test-helpers");
const Web3 = require("web3");
const network = "wss://kovan.infura.io/ws/v3/8d62942fd62641a7ab758673105b6df3";
const web3 = new Web3(network);
const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const {ethers} = require('hardhat');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const listWallets = new HDWalletProvider(mnemonic, "https://kovan.infura.io/v3/8d62942fd62641a7ab758673105b6df3").wallets;
let addressPrivatekey = {};
Object.entries(listWallets).forEach((item, index) => {
    addressPrivatekey[item[0]] = item[1].privateKey.toString("hex");
});
contract("Referral test", function (accounts) {
    console.log(accounts);
    let governance = accounts[0];

    let transaction;
    const claimFee = web3.utils.toWei("0.0039", "ether");
    describe("Referral", function () {
            it("1", async function () {
                let tokenTest = await BEP20Token.new();
                console.log("1. tokenTest", tokenTest.address);

                let fbncToken = await FBNCToken.new();
                console.log("1. fbncToken", fbncToken.address);

                let preSell = await FbncPreSale.new(fbncToken.address, tokenTest.address, governance, 1000);
                console.log("2. preSale address", preSell.address);

                transaction = await fbncToken.transfer(preSell.address, "100000000000000000000");
                console.log("3. transaction transfer", transaction.tx);

                await tokenTest.approve(preSell.address, "1000000000000000000000000000");

                transaction = await preSell.preSale("1000000000000000000");
                console.log(`4. F0 claim transaction referral.claimAirdrop ${transaction.tx}`);

            }).timeout(40000000000);

        },
    );

});
