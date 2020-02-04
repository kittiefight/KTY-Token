pragma solidity 0.5.16;

import "../openzeppelin_v2_4_0/token/ERC777/IERC777Recipient.sol";
import {ERC1820Client} from "erc1820/contracts/ERC1820Client.sol";


contract TestTokensRecipient is ERC1820Client, IERC777Recipient {

    function tokensReceived(
        address operator,
        address from,
        address to,
        uint amount,
        bytes memory userData,
        bytes memory operatorData
    )
    public
    {
        if (userData[0] == 0x01) {
            revert("TestTokensRecipient: tokensReceived reverted");
        }
    }
}
