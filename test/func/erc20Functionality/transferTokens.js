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
    let balanceBeforeTransfer = []
    for (let j=1; j<6; j++) {
        let bAcc0 = await context.ktyToken.balanceOf.call(context.accounts[j])
        bAcc0 = web3.utils.fromWei(bAcc0.toString(), 'ether')
        balanceBeforeTransfer.push(bAcc0)
    }

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

    let balanceAfterTransfer = []
    for (let k=1; k<6; k++) {
        let bAcc1 = await context.ktyToken.balanceOf.call(context.accounts[k])
        bAcc1 = web3.utils.fromWei(bAcc1.toString(), 'ether')
        balanceAfterTransfer.push(bAcc1)
    }
    for (let m=0; m<5; m++) {
      let transferAmount = balanceAfterTransfer[m] - balanceBeforeTransfer[m] 
      expect(transferAmount).to.be.equal(10000)
    }
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
    let balanceBeforeTransferFrom = []
    for (let j=1; j<3; j++) {
        let bAccBefore = await context.ktyToken.balanceOf.call(context.accounts[j])
        bAccBefore = web3.utils.fromWei(bAccBefore.toString(), 'ether')
        balanceBeforeTransferFrom.push(bAccBefore)
    }

    expect(await context.ktyToken.transferFrom(
      context.accounts[1], context.accounts[6], value.toString(),
      { gas: 300000, from: context.accounts[3] }
    )).to.have.nested.property('receipt.status', true);

    value = new BN(web3.utils.toWei('1000'));

    expect(await context.ktyToken.transferFrom(
      context.accounts[2], context.accounts[6], value.toString(),
      { gas: 300000, from: context.accounts[3] }
    )).to.have.nested.property('receipt.status', true);

    let balanceAfterTransferFrom = []
    for (let k=1; k<3; k++) {
        let bAccAfter = await context.ktyToken.balanceOf.call(context.accounts[k])
        bAccAfter = web3.utils.fromWei(bAccAfter.toString(), 'ether')
        balanceAfterTransferFrom.push(bAccAfter)
    }
    
      expect(balanceBeforeTransferFrom[0] - balanceAfterTransferFrom[0]).to.be.equal(800) 
      expect(balanceBeforeTransferFrom[1] - balanceAfterTransferFrom[1]).to.be.equal(1000)
  });
};
