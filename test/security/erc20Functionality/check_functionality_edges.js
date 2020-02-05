const { expectRevert } = require('../../utils');
const { BN } = require('../../utils');

exports.test = (f) => {
  const context = f;

  before(async () => {
    context.ktyToken = await context.KTYtoken.deployed();
    context.address0 = '0x0000000000000000000000000000000000000000';
    await context.ktyToken.mint(context.accounts[1], web3.utils.toWei('10000000'));
  });

  it('should not be able for addr 1 to approve to address(0)', async () => {
    const value = new BN(web3.utils.toWei('1000'));

    await expectRevert(context.ktyToken.approve(
      context.address0, value.toString(),
      { gas: 900000, from: context.accounts[1] }
    ), 'ERC777: approve to the zero address');
  });

  it('should not be able for addr 0 to mint to address(0)', async () => {
    const value = new BN(web3.utils.toWei('1000'));

    await expectRevert(context.ktyToken.mint(
      context.address0, value.toString(),
      { gas: 900000, from: context.accounts[0] }
    ), 'ERC777: mint to the zero address');
  });
};
