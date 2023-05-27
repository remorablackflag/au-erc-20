require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.18",
    defaultNetwork: "goerli",
    networks: {
        goerli: {
            chainId: 5,
            url: process.env.ALCHEMY_GOERLI_URL,
            // accounts: [process.env.PRIVATE_KEY]
        },
        hardhat: {
            chainId: 31337,
        }
    }
};
