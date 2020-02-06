const { expect } = require('chai');
const { BN } = require('../../utils');

exports.test = function(f) {
  const context = f;

  before(async () => {
    context.ktyToken = await context.KTYtoken.deployed();
    await context.ktyToken.mint(context.accounts[0], web3.utils.toWei('10000000'));
  });

  it('should be able to send tokens via erc777 send function', async () => {
    let value = new BN(web3.utils.toWei('10000'));
    let balanceBeforeSent = []
    for (let j=1; j<6; j++) {
        let bal0 = await context.ktyToken.balanceOf.call(context.accounts[j])
        bal0 = web3.utils.fromWei(bal0.toString(), 'ether')
        balanceBeforeSent.push(bal0)
    }

    expect(await context.ktyToken.send(
      context.accounts[1], value.toString(), "0x0",
      { gas: 300000, from: context.accounts[0] }
    )).to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.send(
      context.accounts[2], value.toString(), "0x0",
      { gas: 300000, from: context.accounts[0] }
    )).to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.send(
      context.accounts[3], value.toString(), "0x0",
      { gas: 300000, from: context.accounts[0] }
    )).to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.send(
      context.accounts[4], value.toString(), "0x0",
      { gas: 300000, from: context.accounts[0] }
    )).to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.send(
      context.accounts[5], value.toString(), "0x0",
      { gas: 300000, from: context.accounts[0] }
    )).to.have.nested.property('receipt.status', true);

    let balanceAfterSent = []
    for (let k=1; k<6; k++) {
        let bal1 = await context.ktyToken.balanceOf.call(context.accounts[k])
        bal1 = web3.utils.fromWei(bal1.toString(), 'ether')
        balanceAfterSent.push(bal1)
    }
    for (let m=0; m<5; m++) {
      let sentAmount = balanceAfterSent[m] - balanceBeforeSent[m] 
      expect(sentAmount).to.be.equal(10000)
    }
  });

  it('should be able for addrs 4,5 to make addr 6 their operator', async () => {
    expect(await context.ktyToken.authorizeOperator(
      context.accounts[6],
      { gas: 300000, from: context.accounts[4] }
    )).to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.authorizeOperator(
      context.accounts[6],
      { gas: 300000, from: context.accounts[5] }
    )).to.have.nested.property('receipt.status', true);
  });

  it('should be able for addr 6 to operatorSend for addrs 4,5', async () => {
    let value = new BN(web3.utils.toWei('2000'));
    let balanceBeforeOperatorSent = []
    for (let j=4; j<6; j++) {
        let balBefore = await context.ktyToken.balanceOf.call(context.accounts[j])
        balBefore = web3.utils.fromWei(balBefore.toString(), 'ether')
        balanceBeforeOperatorSent.push(balBefore)
    }

    expect(await context.ktyToken.operatorSend(
      context.accounts[4], context.accounts[7], value.toString(), "0x0", "0x0",
      { gas: 300000, from: context.accounts[6] }
    )).to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.operatorSend(
      context.accounts[5], context.accounts[7], value.toString(), "0x0", "0x0",
      { gas: 300000, from: context.accounts[6] }
    )).to.have.nested.property('receipt.status', true);

    let balanceAfterOperatorSent = []
    for (let k=4; k<6; k++) {
        let balAfter = await context.ktyToken.balanceOf.call(context.accounts[k])
        balAfter = web3.utils.fromWei(balAfter.toString(), 'ether')
        balanceAfterOperatorSent.push(balAfter)
    }
    for (let m=0; m<2; m++) {
      let sentAmount = balanceBeforeOperatorSent[m] - balanceAfterOperatorSent[m]  
      expect(sentAmount).to.be.equal(2000)
    }
  });
};
