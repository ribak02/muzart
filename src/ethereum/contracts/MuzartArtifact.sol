// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MuzartArtifact is ERC1155, AccessControl {
    uint256 private _tokenIdCounter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    // Removed unused Strings library and _baseURI variable as they're not used efficiently

    mapping(uint256 => string) private _tokenURIs;

    // Events declaration simplified by removing indexed where not necessary for filtering
    event OriginalMinted(address operator, uint256 tokenId, uint256 amount);
    event CopyMinted(address operator, uint256 tokenId, uint256 amount);
    event BaseURIChanged(string newBaseURI);
    event MinterRoleGranted(address account);
    event MinterRoleRevoked(address account);

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(MINTER_ROLE, _msgSender());
    }

    function mintOriginal(uint256 amount, string memory tokenURI) external {
        require(hasRole(MINTER_ROLE, _msgSender()), "MuzartArtifact: must have minter role to mint");
        require(amount > 0, "MuzartArtifact: amount must be greater than zero"); // Ensure non-zero amount
        uint256 newItemId = _tokenIdCounter;
        _mint(_msgSender(), newItemId, amount, "");
        _setTokenURI(newItemId, tokenURI); // Set URI during minting, assuming immutability is ensured elsewhere
        _tokenIdCounter++;
        emit OriginalMinted(_msgSender(), newItemId, amount);
    }

    function mintCopy(uint256 id, uint256 amount) external {
        require(id < _tokenIdCounter, "MuzartArtifact: No artifact found with the given ID");
        require(amount > 0, "MuzartArtifact: amount must be greater than zero"); // Ensure non-zero amount
        _mint(_msgSender(), id, amount, "");
        emit CopyMinted(_msgSender(), id, amount);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        require(bytes(_tokenURIs[tokenId]).length > 0, "MuzartArtifact: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Simplified role management functions, unnecessary emit removed
    function grantMinterRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(MINTER_ROLE, account);
    }

    function revokeMinterRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(MINTER_ROLE, account);
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter;
    }

    // Ensured that token URI is only set once and made the function private since it's an internal concern
    function _setTokenURI(uint256 tokenId, string memory tokenURI) private {
        require(bytes(_tokenURIs[tokenId]).length == 0, "MuzartArtifact: URI is immutable");
        _tokenURIs[tokenId] = tokenURI;
    }
}
