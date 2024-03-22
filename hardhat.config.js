/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config()

require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-waffle')

const { NEXT_PUBLIC_ALCHEMY_API_KEY, PRIVATE_KEY } = process.env

// console.log(`Private Key length: ${PRIVATE_KEY.length}`)
// console.log(`Alchemy URL length: ${ALCHEMY_API_KEY.length}`)

module.exports = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: 'sepolia',
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${NEXT_PUBLIC_ALCHEMY_API_KEY}`, // Use your Alchemy API key
      accounts: [`0x${PRIVATE_KEY}`], // Your account's private key
    },
  },
}
