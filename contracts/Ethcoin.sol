// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Ethcoin is ERC20 {
    uint constant _initial_supply = 42000000 * (10**18);
    
    constructor() ERC20("Ethcoin", "ETHC") {
        _mint(msg.sender, _initial_supply);
    }
}