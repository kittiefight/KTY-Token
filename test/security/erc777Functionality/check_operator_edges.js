const { expectRevert } = require('../../utils');
const { BN } = require('../../utils');

exports.test = (f) => {
  const context = f;

  before(async () => {
    context.ktyToken = await context.KTYtoken.deployed();
    context.address0 = '0x0000000000000000000000000000000000000000';
  });

  it('should not be able for addr 1 to authorizeOperator itself', async () => {
    await expectRevert(context.ktyToken.authorizeOperator(
      context.accounts[1],
      { gas: 900000, from: context.accounts[1] }
    ), 'ERC777: authorizing self as operator');
  });

  it('should not be able for addr 1 to revokeOperator itself', async () => {
    await expectRevert(context.ktyToken.revokeOperator(
      context.accounts[1],
      { gas: 900000, from: context.accounts[1] }
    ), 'ERC777: revoking self as operator');
  });
};
