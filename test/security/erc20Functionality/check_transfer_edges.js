const { expectRevert } = require('../../utils');
const { BN } = require('../../utils');

exports.test = (f) => {
  const context = f;

  before(async () => {
    context.ktyToken = await context.KTYtoken.deployed();
    context.address0 = '0x0000000000000000000000000000000000000000';
    await context.ktyToken.mint(context.accounts[1], web3.utils.toWei('10000000'));
  });

  it('should not be able for addr 8 to transferFrom addr 1 without allowance privilages', async () => {
    const value = new BN(web3.utils.toWei('1000'));

    await expectRevert(context.ktyToken.transferFrom(
      context.accounts[1], context.accounts[2], value.toString(),
      { gas: 900000, from: context.accounts[8] }
    ), 'ERC777: transfer amount exceeds allowance');
  });

  it('should not be able for addr 1 to transfer to address(0)', async () => {
    const value = new BN(web3.utils.toWei('1000'));

    await expectRevert(context.ktyToken.transfer(
      context.address0, value.toString(),
      { gas: 900000, from: context.accounts[1] }
    ), 'ERC777: transfer to the zero address');
  });

  it('should not be able for addr 1 to transferFrom from address(0)', async () => {
    const value = new BN(web3.utils.toWei('1000'));

    await expectRevert(context.ktyToken.transferFrom(
      context.address0, context.accounts[2], value.toString(),
      { gas: 900000, from: context.accounts[1] }
    ), 'ERC777: transfer from the zero address');
  });

  it('should not be able for addr 1 to transferFrom to address(0)', async () => {
    const value = new BN(web3.utils.toWei('1000'));

    await expectRevert(context.ktyToken.transferFrom(
      context.accounts[2], context.address0, value.toString(),
      { gas: 900000, from: context.accounts[1] }
    ), 'ERC777: transfer to the zero address');
  });
};
