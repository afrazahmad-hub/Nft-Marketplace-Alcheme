// import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { contractAddress, contractABI } from "./MarketplaceData";
import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import NFTTile from "./NFTTile";
// import { getAddress } from "ethers/lib/utils";
// import NFTTile from "./NFTTile";

export default function Profile() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");

  async function getNFTData(tokenId) {
    let sumPrice = 0;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // const addr = await ethereum.request({ method: "eth_requestAccounts" });
    // updateAddress(addr[0]);
    const addr = await signer.getAddress();
    updateAddress(addr);

    let contract = new ethers.Contract(contractAddress, contractABI, signer);

    let transaction = await contract.getMyNFTs();

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");

        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        sumPrice += Number(price);
        return item;
      })
    );
    updateData(items);
    updateFetched(true);
    // updateAddress(addr[0]);
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  return (
    <div>
      <div>
        <h2>Wallet Address</h2>
        {address}
      </div>
      <div>
        <h2>No. of NFTs</h2>
        {data.length}
      </div>
      <div>
        <h2>Total Value</h2>
        {totalPrice} ETH
      </div>
      <div>
        <h2>Your NFTs</h2>
        <div>
          {data.map((value, index) => {
            return <NFTTile data={value} key={index}></NFTTile>;
          })}
        </div>
        <div>
          {data.length == 0
            ? "Oops, No NFT data to display (Are you logged in?)"
            : " "}
        </div>
      </div>
    </div>
  );
}
