const key = "";
const secret = "";

const axios = require("axios");
const FormData = require("form-data");

export const uploadJSONToIPFS = async (JSONBody) => {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  return axios
    .post(url, JSONBody, {
      header: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then((res) => {
      return {
        success: true,
        pinataURL: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const uploadFilesToIPFS = async (file) => {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  let data = new FormData();
  data.append("file", file);

  const matadata = JSON.stringify({
    name: "testName",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });
  data.append("pinataMatadata", matadata);

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  data.append("pinataOptions", pinataOptions);
  return axios
    .post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_api_secret_key: secret,
      },
    })
    .then((res) => {
      console.log("ImageUploaded:", res.data.IpfsHash);
      return {
        success: true,
        pinataURl: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash,
      }.catch((error) => {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
    });
};
