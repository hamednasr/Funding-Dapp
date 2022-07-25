import { ethers } from "./ethers-5.6.esm.js";

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("connectButton").innerHTML = "Connected";
  } else {
    document.getElementById("connectButton").innerHTML =
      "MetaMask is not installed!";
  }
}

async function fund(ethAmount) {
  console.log();
}
