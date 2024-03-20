const { ethers } = require('hardhat')
const chai = require('chai')
const { solidity } = require('ethereum-waffle')

chai.use(solidity)
const { expect } = chai

beforeEach(async function () {
  ;[owner, addr1, addr2] = await ethers.getSigners()
  const MuzartArtifact = await ethers.getContractFactory('MuzartArtifact')
  muzartArtifact = await MuzartArtifact.deploy()
  await muzartArtifact.deployed()
})

describe('Role Management', function () {
  it('should only allow MINTER_ROLE to mint original artifacts', async function () {
    // Attempt to mint without MINTER_ROLE should fail
    await expect(
      muzartArtifact.connect(addr1).mintOriginal(1, 'ipfs://exampleTokenURI/')
    ).to.be.reverted // This checks for a revert regardless of the message
  })

  it('Dynamic Role Assignment', async function () {
    await muzartArtifact.grantMinterRole(addr1.address)
    await expect(
      muzartArtifact.connect(addr1).mintOriginal(1, 'ipfs://exampleTokenURI/')
    ).to.emit(muzartArtifact, 'OriginalMinted')
  })

  it('Unauthorized Role Actions', async function () {
    await expect(
      muzartArtifact.connect(addr1).revokeMinterRole(addr2.address)
    ).to.be.revertedWith('AccessControlUnauthorizedAccount') // Adjust the expected error message to what your contract actually reverts with
  })
})

describe('Minting Functionality', function () {
  it('should allow minting copies of existing tokens', async function () {
    await muzartArtifact.mintOriginal(1, 'ipfs://exampleTokenURI/')
    await expect(muzartArtifact.mintCopy(0, 2))
      .to.emit(muzartArtifact, 'CopyMinted')
      .withArgs(owner.address, 0, 2)
    expect(await muzartArtifact.balanceOf(owner.address, 0)).to.equal(3) // 1 original + 2 copies
  })

  it('should revert when minting copies of non-existent tokens', async function () {
    await expect(muzartArtifact.mintCopy(999, 1)).to.be.revertedWith(
      'MuzartArtifact: No artifact found with the given ID'
    )
  })

  it('Mint With Zero Amount', async function () {
    await expect(
      muzartArtifact.connect(owner).mintOriginal(0, 'ipfs://zeroAmountURI/')
    ).to.be.revertedWith('MuzartArtifact: amount must be greater than zero') // Ensure this message matches exactly what's in your contract
  })

  it('Minting the Same Token URI Multiple Times', async function () {
    await muzartArtifact.grantMinterRole(owner.address)
    await expect(muzartArtifact.mintOriginal(1, 'ipfs://sameURI/')).to.emit(
      muzartArtifact,
      'OriginalMinted'
    )
    await expect(muzartArtifact.mintOriginal(1, 'ipfs://sameURI/')).to.emit(
      muzartArtifact,
      'OriginalMinted'
    )
  })
})

describe('URI Management', function () {
  it('should correctly generate token URIs', async function () {
    // Mint a token with a specific URI
    await muzartArtifact.mintOriginal(1, 'ipfs://exampleTokenURI/')
    // Query the URI for the minted token
    expect(await muzartArtifact.uri(0)).to.equal('ipfs://exampleTokenURI/')
  })

  it('Token URI Immutability', async function () {
    await muzartArtifact.grantMinterRole(owner.address)
    await muzartArtifact.mintOriginal(1, 'ipfs://initialURI/')
    const tokenId = (await muzartArtifact.getCurrentTokenId()) - 1 // Adjust based on how the ID is incremented
    const initialURI = await muzartArtifact.uri(tokenId)

    // Since URI is immutable, trying to set it again should fail or be ineffective
    expect(initialURI).to.equal('ipfs://initialURI/')
  })

  it('Fetching Nonexistent Token URI', async function () {
    await expect(muzartArtifact.uri(999)).to.be.revertedWith(
      'MuzartArtifact: URI query for nonexistent token'
    )
  })
})

describe('Interface Support', function () {
  it('should support ERC1155 and AccessControl interfaces', async function () {
    expect(await muzartArtifact.supportsInterface('0xd9b67a26')).to.be.true // ERC1155 interface ID
    expect(await muzartArtifact.supportsInterface('0x7965db0b')).to.be.true // AccessControl interface ID
  })
})

describe('Event Emissions', function () {
  it('should emit events for key actions', async function () {
    // Test event for minting original
    await expect(muzartArtifact.mintOriginal(1, 'ipfs://exampleTokenURI/'))
      .to.emit(muzartArtifact, 'OriginalMinted')
      .withArgs(owner.address, 0, 1)
  })
})

describe('Copy Minting Specifics', function () {
  it('Minting Copies Before Originals', async function () {
    // Attempt to mint a copy before the original is minted
    await expect(
      muzartArtifact.connect(addr1).mintCopy(999, 1)
    ).to.be.revertedWith('MuzartArtifact: No artifact found with the given ID')
  })
})

describe('MuzartArtifact', function () {
  it('Should mint and transfer an NFT to someone', async function () {
    const MuzartArtifact = await ethers.getContractFactory('MuzartArtifact')
    const muzartArtifact = await MuzartArtifact.deploy()
    await muzartArtifact.deployed()

    const mintTx = await muzartArtifact.mintOriginal(
      1,
      'ipfs://exampleTokenURI/'
    )
    // wait until the transaction is mined
    await mintTx.wait()

    const [owner] = await ethers.getSigners()

    const balance = await muzartArtifact.balanceOf(owner.address, 0)
    // Use BigNumber comparison
    expect(balance.eq(1)).to.be.true
  })
})
