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

    expect(await context.ktyToken.operatorSend(
      context.accounts[4], context.accounts[7], value.toString(), "0x0", "0x0",
      { gas: 300000, from: context.accounts[6] }
    )).to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.operatorSend(
      context.accounts[5], context.accounts[7], value.toString(), "0x0", "0x0",
      { gas: 300000, from: context.accounts[6] }
    )).to.have.nested.property('receipt.status', true);
  });
};
