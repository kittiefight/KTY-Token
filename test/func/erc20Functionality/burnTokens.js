const { expect } = require('chai')
const { BN } = require('../../utils')

exports.test = function (f) {
    const context = f

    before(async () => {
        context.ktyToken = await context.KTYtoken.deployed()
        await context.ktyToken.mint(
            context.accounts[0],
            web3.utils.toWei('10000000')
        )
    });

    it('token holders should be able to burn their own tokens via erc20 burn function', async () => {
        const tokensBurn = 1000;
        const value = new BN(web3.utils.toWei(tokensBurn.toString()));

        let balanceBeforeBurn = []
        for (let j = 1; j < 6; j++) {
            let b0 = await context.ktyToken.balanceOf.call(context.accounts[j])
            b0 = web3.utils.fromWei(b0.toString(), 'ether')
            balanceBeforeBurn.push(b0)
        }

        expect(
            await context.ktyToken.burn(value, {
                gas: 300000,
                from: context.accounts[1]
            })
        ).to.have.nested.property('receipt.status', true);

        expect(
            await context.ktyToken.burn(value, {
                gas: 300000,
                from: context.accounts[2]
            })
        ).to.have.nested.property('receipt.status', true);

        expect(
            await context.ktyToken.burn(value, {
                gas: 300000,
                from: context.accounts[3]
            })
        ).to.have.nested.property('receipt.status', true);

        expect(
            await context.ktyToken.burn(value, {
                gas: 300000,
                from: context.accounts[4]
            })
        ).to.have.nested.property('receipt.status', true);

        expect(
            await context.ktyToken.burn(value, {
                gas: 300000,
                from: context.accounts[5]
            })
        ).to.have.nested.property('receipt.status', true);

        let balanceAfterBurn = []
        for (let k = 1; k < 6; k++) {
            let b1 = await context.ktyToken.balanceOf.call(context.accounts[k]);
            b1 = web3.utils.fromWei(b1.toString(), 'ether');
            balanceAfterBurn.push(b1);
        }

        for (let m = 0; m < 5; m++) {
            let burntAmount = balanceBeforeBurn[m] - balanceAfterBurn[m];
            expect(burntAmount).to.be.equal(tokensBurn);
        }
    })

    it('should be able for addrs 4,5 to allow addr 6 use their tokens', async () => {
        const tokenBurn = 1000;
        const value = new BN(web3.utils.toWei(tokenBurn.toString()));

        expect(
            await context.ktyToken.approve(context.accounts[6], value, {
                gas: 300000,
                from: context.accounts[4]
            })
        ).to.have.nested.property('receipt.status', true);

        expect(
            await context.ktyToken.approve(context.accounts[6], value, {
                gas: 300000,
                from: context.accounts[5]
            })
        ).to.have.nested.property('receipt.status', true)
    })
    /*
    it('should be able for addr 6 to burnFrom for addrs 4,5', async () => {
        const tokenBurn = 1000;
        const value = new BN(web3.utils.toWei(tokenBurn.toString()));

        let balanceBeforeBurn = []
        for (let j = 4; j < 6; j++) {
            const b = await context.ktyToken.balanceOf.call(context.accounts[j]);
            const balance = web3.utils.fromWei(b.toString(), 'ether');
            balanceBeforeBurn.push(balance);
        }

        expect(
            await context.ktyToken.burnFrom(
                context.accounts[4],
                value.toString(),
                { gas: 300000, from: context.accounts[6] }
            )
        ).to.have.nested.property('receipt.status', true)

        expect(
            await context.ktyToken.burnFrom(
                context.accounts[5],
                value.toString(),
                { gas: 300000, from: context.accounts[6] }
            )
        ).to.have.nested.property('receipt.status', true)

        let balanceAfterBurn = []
        for (let k = 4; k < 6; k++) {
            let bAfter = await context.ktyToken.balanceOf.call(context.accounts[k]);
            bAfter = web3.utils.fromWei(bAfter.toString(), 'ether');
            balanceAfterBurn.push(bAfter);
        }

        for (let m = 0; m < 2; m++) {
            let burnAmount = balanceBeforeBurn[m] - balanceAfterBurn[m];
            expect(burnAmount).to.be.equal(tokenBurn);
        }
    })
    */
}
