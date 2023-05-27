const hre = require("hardhat");
const ethProvider = require("eth-provider");
const addressList = require("../airdrop.json");

const contractAddress = "0x59F2f1fCfE2474fD5F0b9BA1E73ca90b143Eb8d0"; // hardhat

const airdropAmount = "4.2";
const airdropAmountParsed = hre.ethers.utils.parseEther(airdropAmount);

async function main() {

    const myEthProvider = ethProvider(["frame"]);

    myEthProvider.setChain(hre.network.config.chainId);
    const provider = new hre.ethers.providers.Web3Provider(myEthProvider);
    
    const deployer = await provider.getSigner();
    const deployerAddress = await deployer.getAddress();
    const network = await provider.getNetwork();

    const token = await hre.ethers.getContractAt("Ethcoin", contractAddress, deployer);
  
    console.log("Token balance:", hre.ethers.utils.formatEther(await token.balanceOf(deployerAddress)));
    
    console.log("Sending", airdropAmount, " ETHC from", deployerAddress, "...");

    let address;
    const promises = [];
    const addressCount = addressList.length;
    for(let i = 0; i < 2; i++) {
        address = addressList[i];
        console.log("... to:", address);
        promises.push(await token.transfer(address, airdropAmountParsed));
    }

    await Promise.all(promises.map((e) => e.wait()));

    console.log("Finished.");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
  });