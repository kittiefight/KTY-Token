pragma solidity ^0.5.0;

import './openzeppelin_v2_4_0/token/ERC777/ERC777.sol';
import './openzeppelin_v2_4_0/ownership/Ownable.sol';

contract KTYtoken is Ownable, ERC777 {
    string constant NAME    = 'Kittiefight';
    string constant SYMBOL  = 'KTY';
    uint256 constant MAX_TOTAL_SUPPLY = 100_000_000 * 10**18;

    constructor() ERC777(NAME, SYMBOL, new address[](0)) public {
    }

    /**
     * @notice Mint new KTY
     * It also verifies that MAX_TOTAL_SUPPLY will not be exeeded by this call
     * @param account Address to send minted tokens
     * @param amount Amount of tokens to mint
     * @return Should always return true
     */
    function mint(address account, uint256 amount) public onlyOwner returns (bool) {
        require(totalSupply().add(amount) <= MAX_TOTAL_SUPPLY, "KTYtoken: cap exceeded");
        _mint(_msgSender(), account, amount, '', '');
        return true;
    }
}

