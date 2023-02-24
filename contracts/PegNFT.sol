// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PegNFT is ERC721URIStorage, Ownable {
    mapping(address => bool) public nftBridges;
    string public baseURI;

    constructor(
        string memory name_,
        string memory symbol_,
        address _nftBridge
    ) ERC721(name_, symbol_) {
        nftBridges[_nftBridge] = true;
    }

    modifier onlyNftBridge() {
        require(nftBridges[msg.sender], "caller is not bridge");
        _;
    }

    function bridgeMint(
        address to,
        uint256 id,
        string memory
    ) external onlyNftBridge {
        _mint(to, id);
        // _setTokenURI(id, uri);
    }

    function burn(uint256 id) external onlyNftBridge {
        _burn(id);
    }

    // --------------------------------------------

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _uri) external onlyOwner {
        baseURI = _uri;
    }

    function setNftBridge(address _nftBridge, bool _auth) external onlyOwner {
        nftBridges[_nftBridge] = _auth;
    }

    function checkBridge(uint256) external pure returns (bool) {
        return true;
    }

    function bridgeMint(address _to, uint256 _tokenID) external onlyNftBridge {
        _mint(_to, _tokenID);
    }

    function bridgeBurn(uint256 _tokenID) external onlyNftBridge {
        require(
            _isApprovedOrOwner(_msgSender(), _tokenID),
            "ERC721: burn caller is not owner nor approved"
        );
        _burn(_tokenID);
    }
}
