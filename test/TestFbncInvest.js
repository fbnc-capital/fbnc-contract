const BEP20Token = artifacts.require('BEP20Token');
const FBNCInvest = artifacts.require('FBNCInvest');
const fs = require("fs");

contract('Test\n', function (accounts) {
    let governance = accounts[0];
    console.log(governance);
    let transaction;

    describe('Test\n', function () {
        it("Test deployer", async function () {
            let busd = await BEP20Token.new();
            console.log(`1. address busd ${busd.address}`);

            let fbncInvest = await FBNCInvest.new(busd.address, governance);
            console.log(`2. address fbncInvest ${fbncInvest.address}`);

            transaction = await busd.approve(fbncInvest.address, "10000000000000000000000000000");
            console.log(`3. transaction approve fbncInvest ${transaction.tx}`);

            transaction = await fbncInvest.invest("FBNC12345", "FBNC54321", busd.address, "1000000000000000000");
            console.log(`4. transaction invest ${transaction.tx}`);

            transaction = await fbncInvest.invest("FBNC12345", "FBNC54321", busd.address, "1000000000000000000");
            console.log(`5. transaction invest ${transaction.tx}`);

        }).timeout(40000000000000);

    });
});
