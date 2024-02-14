const {assert} = require('chai')

const KryptoBird = artifacts.require("./KryptoBird");

require('chai')
.use(require('chai-as-promised'))
.should()

contract('KryptoBird', (accounts) => {
    let contract

    before( async () => {
        contract = await KryptoBird.deployed()
    })

    describe('Deployment', async () => {
        it('Deploys Successfully', async () => {
            const address = contract.address
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        })

        it('Name and Symbol matches', async () => {
            assert.notEqual(contract.name(), 'KryptoBird')
            assert.notEqual(contract.symbol(), 'KBIRDZ')
        })

    })

    describe('Minting', async () => {        
        it('Minting successful', async () => {
            const result = await contract.mint("AAAAA")
            const totalSupply = await contract.totalSupply()
            assert.equal(totalSupply, 1, 'Total supply should = 1')

            const event = result.logs[0].args
            assert.equal(event._from, '0x0000000000000000000000000000000000000000', 'From should be zero address')
            assert.equal(event._to, accounts[0], 'To should be message sender')

            await contract.mint("AAAAA").should.be.rejected;
        })
    })

    describe('Indexing', async () => {        
        it('List KryptoBirds', async () => {

            const totalSupplyBefore = await contract.totalSupply()
            await contract.mint("AAAAA1")
            await contract.mint("AAAAA2")
            await contract.mint("AAAAA3")
            const totalSupplyAfter = await contract.totalSupply()
            
            let result = []
            for(i = totalSupplyBefore; i < totalSupplyAfter; i++){
                let kryptoBird = await contract.kryptoBirdz(i)
                result.push(kryptoBird)
            }
            
            let expected = ["AAAAA1","AAAAA2","AAAAA3"]
            assert.equal(result.join(','), expected.join(','))
        })
    })
})