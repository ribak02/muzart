const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
const CONTRACT_ADDRESS = '0xB4d287F47D7a27D575033328e5975c1a4Fc46AD3'
const TOKEN_ID = ''

async function fetchNftTransactionHistory() {
  const url = `https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${CONTRACT_ADDRESS}&tokenid=${TOKEN_ID}&page=1&offset=30&sort=asc&apikey=${ETHERSCAN_API_KEY}`

  const response = await fetch(url)
  const data = await response.json()

  if (data.status !== '1') {
    console.error('Failed to fetch data:', data.result)
    return
  }

  return data.result // Contains transactions related to the specific NFT
}

async function displayNftData() {
  const transactions = await fetchNftTransactionHistory()

  if (!transactions) {
    console.log('No transaction data available')
    return
  }

  // Assuming the first transaction is the minting, and the latest is the most recent transfer
  const mintTransaction = transactions[0]
  const latestTransaction = transactions[transactions.length - 1]

  // Transaction hash, Block number, Date and time, Gas fees
  console.log(`Transaction Hash: ${latestTransaction.hash}`)
  console.log(`Block Number: ${latestTransaction.blockNumber}`)
  console.log(
    `Transaction Date and Time: ${new Date(
      latestTransaction.timeStamp * 1000
    ).toLocaleString()}`
  )
  console.log(`Gas Fees: ${latestTransaction.gasPrice}`)

  // Current owner (latest 'to' address)
  console.log(`Current Owner: ${latestTransaction.to}`)

  // Previous owners (unique 'from' addresses)
  const previousOwners = transactions.map((tx) => tx.from)
  console.log(`Previous Owners: ${[...new Set(previousOwners)].join(', ')}`)

  // Number of transfers
  console.log(`Number of Transfers: ${transactions.length}`)
}

displayNftData()
