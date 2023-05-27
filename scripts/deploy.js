const hre = require("hardhat");
const ethProvider = require("eth-provider");

async function main() {
    
    const myEthProvider = ethProvider(["frame"]);

    myEthProvider.setChain(hre.network.config.chainId);
    const provider = new hre.ethers.providers.Web3Provider(myEthProvider);
    
    const deployer = await provider.getSigner();
    const deployerAddress = await deployer.getAddress();
    const network = await provider.getNetwork();
  
    console.log("Deploying contract on chain", network.chainId, "using account", deployerAddress);
  
    const weiAmount = (await deployer.getBalance()).toString();
    
    console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));
  
    const Token = await ethers.getContractFactory("Ethcoin", deployer);
    const token = await Token.deploy();
  
    console.log("Token address:", token.address);
    console.log("Owner balance: ", hre.ethers.utils.formatEther(await token.balanceOf(deployerAddress)));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
  });