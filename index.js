import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
connectButton.onclick = connect;
fundButton.onclick = fund;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("connectButton").innerHTML = "Connected";
  } else {
    document.getElementById("connectButton").innerHTML =
      "MetaMask is not installed!";
  }
}

async function fund() {
  const ethAmount = "1";
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenForTransaction(transactionResponse, provider);
    } catch (err) {
      console.log(err);
    }
  }
}

function listenForTransaction(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}...`);
  provider.once(transactionResponse.hash, (transactionReceipt) => {
    console.log(
      `completed with ${transactionReceipt.confirmations} confirmations`
    );
  });
}
