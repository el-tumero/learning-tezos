import { get_account, set_mockup, set_mockup_now, set_quiet } from "@completium/experiment-ts"
import { Nat } from "@completium/archetype-ts-types"
import { describe, it } from "mocha"
import { add_operator, fa2_non_fungible, operators_key, operators_value, transfer_param, update_operator_params, update_operator_variant, update_operator_variant_types } from "./bindings/fa2_non_fungible"
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

describe('Deploying contract', async () => {
    it("Deployment succeed!", async () => {
        await fa2_non_fungible.deploy(alice.get_address(), { as: alice })
    })
})

describe("Minting token", async () => {
    it("Mint tokens as owner (for yourself)", async () => {
        await fa2_non_fungible.mint(alice.get_address(), new Nat(0), "Hello", {as: alice})

        const owner = await fa2_non_fungible.get_ledger_value(new Nat(0))
        assert(owner?.lowner.equals(alice.get_address()))
    })

    it("Mint tokens as not owner (should be reverted)", async () => {
        try {
            await fa2_non_fungible.mint(alice.get_address(), new Nat(0), "Hello", {as: bob})
        } catch (error:any) {
            assert.equal(error.value, '"INVALID_CALLER"')
        }
    })

})


describe("Transfer token", async () => {
    it("Shound be succeed", async () => {
        const params = [new transfer_param(bob.get_address(), new Nat(0), new Nat(1))]
        await fa2_non_fungible.transfer(alice.get_address(), params, {as: alice})
        
        const owner = await fa2_non_fungible.get_ledger_value(new Nat(0))
        assert(owner?.lowner.equals(bob.get_address()))
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
