import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import SellNFT from "../components/sellNFT";
import Profile from "../components/Profile";
import NFTPage from "../components/NFTpage";
import Navbar from "../components/Navbar";
import { uploadJSONToIPFS, uploadFilesToIPFS } from "../components/Pinata";

export default function Home() {
  return (
    <div>
      {/* <Navbar />
      <SellNFT /> */}
      {/* <Profile /> */}
      {/* <NFTPage /> */}
    </div>
    // <Router>
    //   <Routes>
    //     <Route path="/Navbar" element={<Navbar />} />

    //     <Route path="/SellNFT" element={<SellNFT />} />
    //   </Routes>
    // </Router>
  );
}
