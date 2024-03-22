import React, { useEffect, useState } from 'react'

interface Transaction {
  hash: string
  blockNumber: string
  timeStamp: string
  gasUsed: string
  from: string
  to: string
}

interface Props {
  contractAddress: string
  tokenId: string
  etherscanApiKey: string
}

const EtherscanInfo: React.FC<Props> = ({
  contractAddress,
  tokenId,
  etherscanApiKey,
}) => {
  const [mintTransaction, setMintTransaction] = useState<Transaction | null>(
    null
  )
  const [currentOwner, setCurrentOwner] = useState<string>('')
  const [previousOwners, setPreviousOwners] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNftTransactionHistory = async () => {
      const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=0&endblock=999999999&page=1&offset=10&sort=asc&apikey=${etherscanApiKey}`

      try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)

        if (data.status !== '1') {
          setError('Failed to fetch data')
          setIsLoading(false)
          return
        }

        const transactions: Transaction[] = data.result
        if (transactions.length > 0) {
          // Assuming the first transaction is the minting of the NFT
          setMintTransaction(transactions[0])
          // The current owner is the 'to' address of the last transaction
          setCurrentOwner(transactions[transactions.length - 1].to)
          // Extracting all unique previous owners
          const owners = transactions.map((tx) => tx.from)
          setPreviousOwners(Array.from(new Set(owners)))
        }
      } catch (error) {
        setError('Error fetching transaction data')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNftTransactionHistory()
  }, [contractAddress, tokenId, etherscanApiKey])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!mintTransaction) return <div>No minting transaction found.</div>

  return (
    <div>
      <h3>NFT Details</h3>
      {mintTransaction && (
        <>
          <p>
            Minting Transaction:{' '}
            <a
              href={`https://etherscan.io/tx/${mintTransaction.hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {mintTransaction.hash}
            </a>
          </p>
          <p>Block Number: {mintTransaction.blockNumber}</p>
          <p>
            Date and Time:{' '}
            {new Date(
              parseInt(mintTransaction.timeStamp) * 1000
            ).toLocaleString()}
          </p>
          <p>Gas Used: {mintTransaction.gasUsed}</p>
        </>
      )}
      <p>Current Owner: {currentOwner}</p>
      {previousOwners.length > 0 && (
        <>
          <p>Previous Owners:</p>
          <ul>
            {previousOwners.map((owner, index) => (
              <li key={index}>{owner}</li>
            ))}
          </ul>
        </>
      )}
      <p>Number of Transfers: {previousOwners.length}</p>
    </div>
  )
}

export default EtherscanInfo
