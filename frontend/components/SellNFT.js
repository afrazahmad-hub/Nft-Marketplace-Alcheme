import React, { useState } from "react";
import { ethers } from "ethers";
import { uploadFilesToIPFS, uploadJSONToIPFS } from "./Pinata";
// import Navbar from "./Navbar";
// import { getAddress } from "ethers/lib/utils";

const SellNFT = () => {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const [message, updateMessage] = useState("");

  async function onChangeFile(e) {
    const file = e.target.file[0];

    try {
      const response = await uploadFilesToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded file on URl:", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (error) {
      console.log("Uploaded failed !", error);
    }
  }

  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;

    if (!name || !description || !price || !fileURL) return;

    const nftJSON = { name, description, price, image: fileURL };

    try {
      const response = await uploadJSONToIPFS(nftJSON);

      if (response.success === true) {
        console.log("Uploaded successful: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("Udploaded failed: ", e);
    }
  }

  async function listNFT(e) {
    e.preventdefault();

    try {
      const matadataURl = await uploadMetadataToIPFS();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      updateMessage("Uploading file, please wait ..... (upto 5 minutes)");
      const contract = new ethers.Contract(address, abi, signer);

      const price = new ethers.utils.parseUnits(formParams.price, "ether");
      let listingPrice = new contract.getListPrice();
      listingPrice = listingPrice.toString();

      const transaction = await contract.createToken(matadataURl, price, {
        value: listingPrice,
      });
      await transaction.wait();

      alert("Successfully listed your NFT ");

      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });

      window.location.replace("/");
    } catch (e) {
      alert("Upload error" + e);
    }
  }
  return (
    <div>
      <form>
        <h3>Upload your NFT to Market Place</h3>
        <div>
          <label>NFT Name</label>
          <input
            id="name"
            type={"text"}
            placeholder="Axie#4563"
            onChange={(e) =>
              updateFormParams({ ...formParams, name: e.target.value })
            }
            value={formParams.name}
          ></input>
        </div>
        <div>
          <label htmlFor="descriptions">NFT Descriptions</label>
          <textarea
            cols={"40"}
            rows="5"
            id="descriptions"
            type={"text"}
            onChange={(e) =>
              updateFormParams({ ...formParams, descriptions: e.target.value })
            }
            value={formParams.description}
          ></textarea>
        </div>
        <div>
          <label>Price (in eth)</label>
          <input
            id="price"
            type={"number"}
            placeholder="Minimin 0.01 eth"
            step={"0.01"}
            value={formParams.price}
            onChange={(e) =>
              updateFormParams({ ...formParams, price: e.target.value })
            }
          ></input>
        </div>
        <div>
          <label htmlFor="image">Upload image</label>
          <input type={"file"} onChange={onChangeFile}></input>
        </div>
        <br />
        <br />
        <div>{message}</div>
        <button onClick={listNFT}>List NFT</button>
      </form>
    </div>
  );
};

export default SellNFT;
