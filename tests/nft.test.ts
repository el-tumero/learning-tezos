import { get_account, set_mockup, set_mockup_now, set_quiet } from "@completium/experiment-ts"
import { Nat } from "@completium/archetype-ts-types"
import { describe, it } from "mocha"
import { fa2_non_fungible, transfer_param } from "./bindings/fa2_non_fungible"
import assert from "assert"

// Accounts
const alice = get_account("alice")
const bob = get_account("bob")

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
    it("Mint tokens as owner", async () => {
        await fa2_non_fungible.mint(alice.get_address(), new Nat(0), "Hello", {as: alice})

        const owner = await fa2_non_fungible.get_ledger_value(new Nat(0))
        assert(owner?.lowner.equals(alice.get_address()))
    })
})


describe("Transfer token", async () => {
    it("Transfer token", async () => {
        const params = [new transfer_param(bob.get_address(), new Nat(0), new Nat(1))]
        await fa2_non_fungible.transfer(alice.get_address(), params, {as: alice})
        
        const owner = await fa2_non_fungible.get_ledger_value(new Nat(0))
        assert(owner?.lowner.equals(bob.get_address()))
    })
})
