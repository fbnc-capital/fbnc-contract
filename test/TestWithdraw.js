const BEP20Token = artifacts.require('BEP20Token');
const FBNCToken = artifacts.require('FBNCToken');
const FbncWithdraw = artifacts.require('FbncWithdraw');
const fs = require("fs");

contract('Test\n', function (accounts) {
    let governance = accounts[0];
    console.log(governance);
    let transaction;

    describe('Test\n', function () {
        it("Test deployer", async function () {
            let busd = await BEP20Token.new();
            console.log(`1. address busd ${busd.address}`);

            let fbnc = await FBNCToken.new();
            console.log(`1.1. address fbnc ${fbnc.address}`);

            let fbncWithdraw = await FbncWithdraw.new(busd.address);
            console.log(`2. address fbncWithdraw ${fbncWithdraw.address}`);

            transaction = await busd.transfer(fbncWithdraw.address, "10000000000000000000");
            console.log(`3. transaction transfer fbncWithdraw ${transaction.tx}`);

            transaction = await fbncWithdraw.withdraw("12341", [busd.address], governance, ["1000000000000000000"]);
            console.log(`4. transaction withdraw ${transaction.tx}`);

        }).timeout(40000000000000);

    });
});
