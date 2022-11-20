import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class transfer_param implements att.ArchetypeType {
    constructor(public tto: att.Address, public ttoken_id: att.Nat, public tamount: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.tto.to_mich(), att.pair_to_mich([this.ttoken_id.to_mich(), this.tamount.to_mich()])]);
    }
    equals(v: transfer_param): boolean {
        return (this.tto.equals(v.tto) && this.tto.equals(v.tto) && this.ttoken_id.equals(v.ttoken_id) && this.tamount.equals(v.tamount));
    }
}
export class balance_of_request implements att.ArchetypeType {
    constructor(public browner: att.Address, public brtoken_id: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.browner.to_mich(), this.brtoken_id.to_mich()]);
    }
    equals(v: balance_of_request): boolean {
        return (this.browner.equals(v.browner) && this.browner.equals(v.browner) && this.brtoken_id.equals(v.brtoken_id));
    }
}
export class balance_of_response implements att.ArchetypeType {
    constructor(public request: balance_of_request, public brbalance: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.request.to_mich(), this.brbalance.to_mich()]);
    }
    equals(v: balance_of_response): boolean {
        return (this.request == v.request && this.request == v.request && this.brbalance.equals(v.brbalance));
    }
}
export const transfer_param_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%tto"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%ttoken_id"]),
        att.prim_annot_to_mich_type("nat", ["%tamount"])
    ], [])
], []);
export const balance_of_request_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%browner"]),
    att.prim_annot_to_mich_type("nat", ["%brtoken_id"])
], []);
export const balance_of_response_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("address", ["%browner"]),
        att.prim_annot_to_mich_type("nat", ["%brtoken_id"])
    ], ["%request"]),
    att.prim_annot_to_mich_type("nat", ["%brbalance"])
], []);
export type ledger_key = att.Nat;
export const ledger_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export class ledger_value implements att.ArchetypeType {
    constructor(public lowner: att.Address, public lmetadata: string) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.lowner.to_mich(), att.string_to_mich(this.lmetadata)]);
    }
    equals(v: ledger_value): boolean {
        return (this.lowner.equals(v.lowner) && this.lowner.equals(v.lowner) && this.lmetadata == v.lmetadata);
    }
}
export const ledger_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%lowner"]),
    att.prim_annot_to_mich_type("string", ["%lmetadata"])
], []);
export type ledger_container = Array<[
    ledger_key,
    ledger_value
]>;
export const ledger_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("big_map", att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%lowner"]),
    att.prim_annot_to_mich_type("string", ["%lmetadata"])
], []), []);
const transfer_arg_to_mich = (from_: att.Address, tsx: Array<transfer_param>): att.Micheline => {
    return att.pair_to_mich([
        from_.to_mich(),
        att.list_to_mich(tsx, x => {
            return x.to_mich();
        })
    ]);
}
const mint_arg_to_mich = (to_: att.Address, token_id: att.Nat, token_metadata: string): att.Micheline => {
    return att.pair_to_mich([
        to_.to_mich(),
        token_id.to_mich(),
        att.string_to_mich(token_metadata)
    ]);
}
const balance_of_arg_to_mich = (requests: Array<balance_of_request>): att.Micheline => {
    return att.list_to_mich(requests, x => {
        return x.to_mich();
    });
}
export const deploy_balance_of_callback = async (params: Partial<ex.Parameters>): Promise<att.DeployResult> => {
    return await ex.deploy_callback("balance_of", att.list_annot_to_mich_type(att.pair_array_to_mich_type([
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("address", ["%browner"]),
            att.prim_annot_to_mich_type("nat", ["%brtoken_id"])
        ], ["%request"]),
        att.prim_annot_to_mich_type("nat", ["%brbalance"])
    ], []), []), params);
};
export class Fa2_non_fungible {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    balance_of_callback_address: string | undefined;
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(owner: att.Address, params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./contracts/fa2_non_fungible.arl", {
            owner: owner.to_mich()
        }, params)).address;
        this.address = address;
        this.balance_of_callback_address = (await deploy_balance_of_callback(params)).address;
    }
    async transfer(from_: att.Address, tsx: Array<transfer_param>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "transfer", transfer_arg_to_mich(from_, tsx), params);
        }
        throw new Error("Contract not initialised");
    }
    async mint(to_: att.Address, token_id: att.Nat, token_metadata: string, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "mint", mint_arg_to_mich(to_, token_id, token_metadata), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_transfer_param(from_: att.Address, tsx: Array<transfer_param>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "transfer", transfer_arg_to_mich(from_, tsx), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_mint_param(to_: att.Address, token_id: att.Nat, token_metadata: string, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "mint", mint_arg_to_mich(to_, token_id, token_metadata), params);
        }
        throw new Error("Contract not initialised");
    }
    async balance_of(requests: Array<balance_of_request>, params: Partial<ex.Parameters>): Promise<Array<balance_of_response>> {
        if (this.address != undefined) {
            if (this.balance_of_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.balance_of_callback_address), "callback");
                await ex.call(this.address, "balance_of", att.getter_args_to_mich(balance_of_arg_to_mich(requests), entrypoint), params);
                return await ex.get_callback_value<Array<balance_of_response>>(this.balance_of_callback_address, x => { const res: Array<balance_of_response> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return new balance_of_response((x => { return new balance_of_request((x => { return new att.Address(x); })(x.browner), (x => { return new att.Nat(x); })(x.brtoken_id)); })(x.request), (x => { return new att.Nat(x); })(x.brbalance)); })(x[i]));
                } return res; });
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_owner(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Address(storage.owner);
        }
        throw new Error("Contract not initialised");
    }
    async get_ledger_value(key: ledger_key): Promise<ledger_value | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.ledger), key.to_mich(), ledger_key_mich_type, ledger_value_mich_type), collapsed = true;
            if (data != undefined) {
                return new ledger_value((x => { return new att.Address(x); })(data.lowner), (x => { return x; })(data.lmetadata));
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_ledger_value(key: ledger_key): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.ledger), key.to_mich(), ledger_key_mich_type, ledger_value_mich_type), collapsed = true;
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        NOT_OWNER: att.string_to_mich("\"NOT_OWNER\""),
        NOT_ONE: att.string_to_mich("\"NOT_ONE\"")
    };
}
export const fa2_non_fungible = new Fa2_non_fungible();

