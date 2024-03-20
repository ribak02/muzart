const fs = require('fs')
const path = require('path')

const getABI = () => {
  try {
    const dir = path.resolve(
      __dirname,
      '../artifacts/contracts/MuzartArtifact.sol/MuzartArtifact.json'
    )
    const file = fs.readFileSync(dir, 'utf8')
    const json = JSON.parse(file)
    const abi = json.abi
    // Save ABI to a file
    fs.writeFileSync(
      path.resolve(__dirname, 'ABI.json'),
      JSON.stringify(abi, null, 2)
    )
    console.log('ABI saved to ABI.json')
  } catch (e) {
    console.error('Error:', e)
  }
}
getABI()
