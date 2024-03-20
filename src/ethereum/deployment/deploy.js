async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)

  const MuzartArtifact = await ethers.getContractFactory('MuzartArtifact')
  const muzartArtifact = await MuzartArtifact.deploy()

  await muzartArtifact.deployed()

  console.log('MuzartArtifact deployed to:', muzartArtifact.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
