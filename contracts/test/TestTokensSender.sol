pragma solidity 0.5.16;

import "../openzeppelin_v2_4_0/token/ERC777/IERC777Sender.sol";
import {ERC1820Client} from "erc1820/contracts/ERC1820Client.sol";


contract TestTokensSender is ERC1820Client, IERC777Sender {

    function tokensToSend(
        address /*operator*/,
        address /*from*/,
        address /*to*/,
        uint /*amount*/,
        bytes memory userData,
        bytes memory /*operatorData*/
    )
    public
    {
        if (userData[0] == 0x01) {
            revert("TestTokensSender: tokensToSend reverted");
        }
    }

    // solhint-disable-next-line no-unused-vars
    function canImplementInterfaceForAddress(bytes32 /*interfaceHash*/, address /*addr*/) public view returns (bytes32) {
        this;
        return keccak256(abi.encodePacked("ERC1820_ACCEPT_MAGIC"));
    }
}
