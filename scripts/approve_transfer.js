const hre = require("hardhat");
const ethProvider = require("eth-provider");

const tokenAddress = "0x98381bcff586865aefd91bbff23e6b1281ecae0c"; // goerli
const contractToApprove = "0x873289a1aD6Cf024B927bd13bd183B264d274c68";

const airdropAmount = "420";
const airdropAmountParsed = hre.ethers.utils.parseEther(airdropAmount);

const abi = [
    "function drop(address erc20, uint amount) external"
];

async function main() {

    const myEthProvider = ethProvider(["frame"]);

    myEthProvider.setChain(hre.network.config.chainId);
    const provider = new hre.ethers.providers.Web3Provider(myEthProvider);
    
    const tokenOwner = await provider.getSigner();
    const tokenOwnerAddress = await tokenOwner.getAddress();
    const network = await provider.getNetwork();

    const token = await hre.ethers.getContractAt("Ethcoin", tokenAddress, tokenOwner);
    const bucket = await hre.ethers.getContractAt(abi, contractToApprove, tokenOwner);
  
    console.log("Token balance:", hre.ethers.utils.formatEther(await token.balanceOf(tokenOwnerAddress)));
    
    console.log("Approving", airdropAmount, " ETHC to transfer to", contractToApprove, "...");

    const approve = await token.approve(contractToApprove, airdropAmountParsed);
    const approveResult = await approve.wait();

    console.log("Approve result:", approveResult);

    const drop = await bucket.drop(tokenAddress, airdropAmountParsed);
    const dropResult = await drop.wait();

    console.log("Drop result:", dropResult);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
  });