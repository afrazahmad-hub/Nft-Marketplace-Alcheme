// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzepplin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzepplin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract NFTMarketplace is ERC721URIStorage {

    address payable owner;

    using Counters for Counter.counter;
    Counters.counter private _tokenIDs;
    Counters.counter private _itemsSold;

    constructor () ERC721 ("NFTMArketplace" "NFTM"){
        owner = payable(msg.sender);
    }

    uint256 listPrice = 0.001 ether;

    struct ListedToken {
        uint256 tokeId;
        address payable owner;
        addrtes payable seller;
        uint256 price;
        bool currentlyListed;
        
    }

    mapping (uint256 => ListedToken) private idToListedTokens;

    function updateListPrice(uint256 -listPrice) public payable {
        require(msg.sender == owner, "Only Owner can change the price !");
        listPrice =_listPrice
    }

    function getListPrice() public view returns(uint256){
        return listPrice;
    }

    function getLatestIdToListedToken() public view returns(ListedToken memory){
        uint256 currentTokenId = _tokenIDs.current();
        return idToListedTokens[currentTokenId];
    }

    function getListedForTokenId(uint256 _tokenId) public view returns(ListedToken memory){
        return idToListedTokens[_tokenId]
    }

    function getCurrentID() public view retuens(uint256){
        returns _tokenIDs.current();
    }
    
    function createToken(string memory _tokenURI, uint256 _price) public payable returns(uint){
        require(msg.value == listPrice,"Insufficient Balance !");
        require(price > 0, "MAke sure that price is not negative.")

        _tokenIDs.increment();
        uint256 currentTokenId = _tokenIDs.current();

        _safeMint(msg.sender, currentTokenId);
        _setTokenURI(currentTokenId, _tokenURI);
        createListedToken(currentTokenId, _price);

        return currentTokenId;
    }

    function createListedToken(uint256 _tokenID, uint256 price) private{
        idToListedTokens[_tokenID] = ListedToken(
            _tokenID,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        )
        _transfer(msg.sender, address(this), _tokenID);
        }

    function getAllNFTs() public view returns(ListedToken[] memory){
        uint nftCount = _tokenIDs.current();
        ListedToken[] memory tokens = new ListedToken[](nftCount);

        uint currentIndex = 0;

        for(uint i = 0; i < nftCount; i++){
            uint currentId = i +1;
            ListedToken storage currentItem = idToListedTokens[currentId];
            tokens[currentIndex] = currentItem;

            currentIndex += 1;
        }
        return tokens;
    }

    function getMyNFTs() public view returns(ListedToken[] memory){
        uint totalItemCount = _tokenIDs.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalItemCount; i++){
            
            if(idToListedTokens[i+1].owner == msg.sender || idToListedTokens.seller == msg.sender){
                itemCount += 1;
            }
        }

        ListedToken[] memory items = new ListedToken[](itemCount);
        for(uint i = 0; i < totalItemCount; i++){

             if(idToListedTokens[i+1].owner == msg.sender || idToListedTokens[i+1].seller == msg.sender){
                
                uint currentId = i +1;
                ListedToken storage currentItem = idToListedTokens[currentId];
                items[currentIndex] = currentItem;

                currentIndex += 1;
            }
        }
        return items;
    }
}

