// import Navbar from "./Navbar";
import axie from "../public/tile.jpeg";
import { useLocation, useParams } from "react-router-dom";
import { contractAddress, contractABI } from "./MarketplaceData";
import { ethers } from "ethers";
import axios from "axios";
import { useState } from "react";

export default function NFTPage(props) {
  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await ethereum.request({ method: "eth_requestAccounts" });

    //Pull the deployed contract instance
    let contract = new ethers.Contract(contractAddress, contractABI, signer);
    //create an NFT Token
    const tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    console.log(listedToken);

    let item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };
    console.log(item);
    updateData(item);
    updateDataFetched(true);
    console.log("address", addr[0]);
    updateCurrAddress(addr[0]);
  }

  async function buyNFT(tokenId) {
    try {
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(contractAddress, contractABI, signer);
      const salePrice = ethers.utils.parseUnits(data.price, "ether");
      updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      alert("You successfully bought the NFT!");
      updateMessage("");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  return (
    <div style={{ "min-height": "100vh" }}>
      <div>
        <img src={data.image} alt="" className="w-2/5" />
        <div>
          <div>Name: {data.name}</div>
          <div>Description: {data.description}</div>
          <div>
            Price: <span>{data.price + " ETH"}</span>
          </div>
          <div>
            Owner: <span>{data.owner}</span>
          </div>
          <div>
            Seller: <span>{data.seller}</span>
          </div>
          <div>
            {currAddress == data.owner || currAddress == data.seller ? (
              <button onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
            ) : (
              <div>You are the owner of this NFT</div>
            )}

            <div>{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
