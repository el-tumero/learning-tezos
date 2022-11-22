import { get_account, set_mockup, set_mockup_now, set_quiet } from "@completium/experiment-ts"
import { Bytes, Nat } from "@completium/archetype-ts-types"
import { describe, it } from "mocha"
import { add_operator, balance_of_request, fa2_non_fungible, token_metadata_value, transfer_param, update_operator_params } from "./bindings/fa2_non_fungible"
import assert from "assert"

// Accounts
const alice = get_account("alice")
const bob = get_account("bob")
const carl = get_account("carl")

// Config

set_mockup()
set_quiet(true)
const now = new Date(Date.now())
set_mockup_now(now)

// Scenarios

describe.only('Deploying contract', async () => {
    it("Deployment succeed!", async () => {
        await fa2_non_fungible.deploy(alice.get_address(), { as: alice })
    })
})

describe.only("Minting token", async () => {
    it.only("Mint tokens as contract owner (for yourself)", async () => {
        await fa2_non_fungible.mint(alice.get_address(), new Nat(0), [["name", Bytes.hex_encode("hello")]], {as: alice})
        const owner = await fa2_non_fungible.get_ledger_value(new Nat(0))
        assert(owner?.equals(alice.get_address()))
    })

    it.only("Returns metadata of token", async () => {
        const metadata = await fa2_non_fungible.get_token_metadata_value(new Nat(0))
        const name = metadata?.mtoken_info[0][1].hex_decode()
        assert.equal("hello", name)
    })

    it("Mint tokens as not contract owner (should be reverted)", async () => {
        try {
            const tmetadata = [["symbol", new Bytes("NFT")], ["name", new Bytes("NonFT0")]] as [string, Bytes][]
            await fa2_non_fungible.mint(alice.get_address(), new Nat(0), tmetadata, {as: bob})
        } catch (error:any) {
            assert.equal(error.value, '"INVALID_CALLER"')
        }
    })

    it("Mint same token (should be reverted", async () => {
        try {
            const tmetadata = [["symbol", new Bytes("NFT")], ["name", new Bytes("NonFT0")], ["decimals", new Bytes("0")]] as [string, Bytes][]
            await fa2_non_fungible.mint(alice.get_address(), new Nat(0), tmetadata, {as: alice})
        } catch (error:any) {
            assert.equal(error.value, '(Pair "KEY_EXISTS" "ledger")')
        }
    })

})


describe("Transfer token", async () => {
    it("Shound be succeed", async () => {
        const params = [new transfer_param(bob.get_address(), new Nat(0), new Nat(1))]
        await fa2_non_fungible.transfer(alice.get_address(), params, {as: alice})
        
        const owner = await fa2_non_fungible.get_ledger_value(new Nat(0))
        // assert(owner?.lowner.equals(bob.get_address()))
    })

    it("Shound be reverted", async () => {
        const params = [new transfer_param(bob.get_address(), new Nat(0), new Nat(1))]
        try {
            await fa2_non_fungible.transfer(alice.get_address(), params, {as: alice})  
        } catch (error:any) {
            assert.equal(error.value, '"NOT_OWNER"')
        }
    })

})

describe("Update operator",async () => {
    it("Should make Alice operator of Bob's token", async () => {
        const params = [new update_operator_params(new add_operator() , bob.get_address(), alice.get_address(), new Nat(0))]
        await fa2_non_fungible.update_operator(params, {as: bob})
    })

    it("Transfer Bob's token to Carl by Alice's transaction", async () => {
        const params = [new transfer_param(carl.get_address(), new Nat(0), new Nat(1))]
        await fa2_non_fungible.transfer(bob.get_address(), params, {as: alice})  
    })

})

describe("Check balance", async () => {
    it("Shound return Carl balance", async() => {
        const [result] = await fa2_non_fungible.balance_of([new balance_of_request(carl.get_address(), new Nat(0))], {as: alice})
        assert(result.brbalance.equals(new Nat(1)))
    })
})
