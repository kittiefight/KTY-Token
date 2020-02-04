const { expect } = require('chai');
const { BN } = require('../../utils');

exports.test = function(f) {
  const context = f;

  before(async () => {
    context.ktyToken = await context.KTYtoken.deployed();
    await context.ktyToken.mint(context.accounts[0], web3.utils.toWei('10000000'));
  });

  it('should be able to transfer tokens via erc20 transfer function', async () => {
    let value = new BN(web3.utils.toWei('10000'));

    expect(await context.ktyToken.transfer(
      context.accounts[1], value.toString(),
      { gas: 300000, from: context.accounts[0] }
    )).to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.transfer(
      context.accounts[2], value.toString(),
      { gas: 300000, from: context.accounts[0] }
    )).to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.transfer(
      context.accounts[3], value.toString(),
      { gas: 300000, from: context.accounts[0] }
    )).to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.transfer(
      context.accounts[4], value.toString(),
      { gas: 300000, from: context.accounts[0] }
    )).to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.transfer(
      context.accounts[5], value.toString(),
      { gas: 300000, from: context.accounts[0] }
    )).to.have.nested.property('receipt.status', true);
  });

  it('should be able for addrs 1,2 to approve tokens to addr 3', async () => {
    let value = new BN(web3.utils.toWei('1000'));

    expect(await context.ktyToken.approve(
      context.accounts[3], value.toString(),
      { gas: 300000, from: context.accounts[1] }
    )).to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.approve(
      context.accounts[3], value.toString(),
      { gas: 300000, from: context.accounts[2] }
    )).to.have.nested.property('receipt.status', true);
  });

  it('should be able for addr 3 to transferFrom (erc20) addrs 1,2 to addr 6', async () => {
    let value = new BN(web3.utils.toWei('800'));

    expect(await context.ktyToken.transferFrom(
      context.accounts[1], context.accounts[6], value.toString(),
      { gas: 300000, from: context.accounts[3] }
    )).to.have.nested.property('receipt.status', true);

    value = new BN(web3.utils.toWei('1000'));

    expect(await context.ktyToken.transferFrom(
      context.accounts[2], context.accounts[6], value.toString(),
      { gas: 300000, from: context.accounts[3] }
    )).to.have.nested.property('receipt.status', true);
  });
};
