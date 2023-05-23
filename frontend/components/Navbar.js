import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router";
import { useRouter } from "next/router";
import Link from "next/link";
// import { getAddress } from "ethers/lib/utils";

const Navbar = () => {
  const [address, setAddres] = useState("0x");
  const [connected, toggleConnected] = useState();
  const router = useRouter();

  async function wallet() {
    const { ethereum } = window;
    await ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });
  }
  const connectWebsite = async () => {
    const chainID = await window.ethereum.request({ method: "eth_chainId" });
    if (chainID !== "0x5") {
      alert("Invalid network, connect goerli network");
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
    wallet();
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setAddres(accounts[0]);
  };

  useEffect(() => {
    let val = window.ethereum.isConnected();

    if (val) {
      console.log("It is because of this: ", val);
      {
        address;
      }
      toggleConnected(val);
    }
    window.ethereum.on("accountsChanged", function (accounts) {
      router.replace(router.pathname);
    });
  });

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href={"/"}>NFT Marketplace</Link>
          </li>
          <li>
            <ul>
              <ul>
                {router.pathname === "/" ? (
                  <li>
                    <Link href={"/"}>Marketplace</Link>
                  </li>
                ) : (
                  <li>
                    <Link href={"/"}>Marketplace</Link>
                  </li>
                )}
              </ul>
              {router.pathname === "/SellNFT" ? (
                <li>
                  <Link href={"/SellNFT"}>List NFT</Link>
                </li>
              ) : (
                <li>
                  <Link href={"/SellNFT"}>List NFT</Link>
                </li>
              )}
              {router.pathname === "/Profile" ? (
                <li>
                  <Link href={"/Profile"}>Profile</Link>
                </li>
              ) : (
                <li>
                  <Link href={"/Profile"}>Profile</Link>
                </li>
              )}
              <li>
                <button onClick={connectWebsite}>
                  {connected ? "Connected" : "Connect Wallet"}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div>
        {address !== "0x"
          ? "Connected to: "
          : "Not Connected: Please log in to see NFTs"}
        {address !== "0x" ? address.substring(0, 15) + "..." : " "}
      </div>
    </div>
  );
};

// const Navbar = () => {
//   const [currAddress, updateAddress] = useState("0x");
//   // const location = useLocation();
//   const router = useRouter();
//   const [connected, toggleConnected] = useState(false);
//   async function getAddress() {
//     const { ethereum } = window;
//     // const provider = new ethers.providers.Web3Provider(ethereum);
//     // const signer = provider.getSigner();
//     const addr = await ethereum.request({ method: "eth_requestAccounts" });
//     updateAddress(addr[0]);
//     console.log("Current Address:", currAddress);
//   }
//   const connectWebsite = async () => {
//     const chainID = await window.ethereum.request({ method: "eth_chainId" });
//     if (chainID !== "0x5") {
//       alert("Invalid network, connect goerli network");
//       await window.ethereum.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: "0x5" }],
//       });
//     }
//     await window.ethereum
//       .request({ method: "eth_requestAccounts" })
//       .then(() => {
//         console.log("Here");
//         getAddress();
//         window.router.replace(router.pathname);
//       });
//   };
//   useEffect(() => {
//     let val = window.ethereum.isConnected();
//     if (val) {
//       console.log("Is this because of ", val);
//       getAddress();
//       toggleConnected(val);
//     }
//     // window.ethereum.on("accountsChanged", function (accounts) {
//     //   window.router.replace(router.pathname);
//     // });
//   });
//   return (
//     <div>
//       <nav>
//         <ul>
//           <li>
//             <Link href={"/"}>NFT Marketplace</Link>
//           </li>
//           <li>
//             <ul>
//               <ul>
//                 {router.pathname === "/" ? (
//                   <li>
//                     <Link href={"/"}>Marketplace</Link>
//                   </li>
//                 ) : (
//                   <li>
//                     <Link href={"/"}>Marketplace</Link>
//                   </li>
//                 )}
//               </ul>
//               {router.pathname === "/sellNFt" ? (
//                 <li>
//                   <Link href={"/sellNFT"}>List my NFT</Link>{" "}
//                 </li>
//               ) : (
//                 <li>
//                   <Link href={"/"}>List My NFT</Link>
//                 </li>
//               )}
//               {router.pathname === "/profile" ? (
//                 <li>
//                   <Link href={"/profile"}>Profile</Link>{" "}
//                 </li>
//               ) : (
//                 <li>
//                   <Link href={"/profile"}>Profile</Link>{" "}
//                 </li>
//               )}
//               <li>
//                 <button onClick={connectWebsite}>
//                   {connected ? "Connected" : "Connect wallet"}
//                 </button>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </nav>
//       <div>
//         {currAddress !== "0x"
//           ? "Cnnected to: "
//           : "Not Connected. Please login to view NFTs"}
//         {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
//       </div>
//     </div>
//   );
// };
export default Navbar;
