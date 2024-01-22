// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC1155Token is ERC1155, Ownable {
    uint256 public constant ARTWORK = 0;
    
    constructor() ERC1155("https://myapi.com/api/token/{id}.json") {}

    function mint(address account, uint256 id, uint256 amount) public onlyOwner {
        _mint(account, id, amount, "");
    }

    function uri(uint256 tokenId) override public view returns (string memory) {
        return string(
            abi.encodePacked(
                "https://myapi.com/api/token/",
                Strings.toString(tokenId),
                ".json"
            )
        );
    }
}
