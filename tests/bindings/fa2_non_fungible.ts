import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export enum update_operator_variant_types {
    add_operator = "add_operator",
    remove_operator = "remove_operator"
}
export abstract class update_operator_variant extends att.Enum<update_operator_variant_types> {
}
export class add_operator extends update_operator_variant {
    constructor() {
        super(update_operator_variant_types.add_operator);
    }
    to_mich() { return new att.Nat(0).to_mich(); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export class remove_operator extends update_operator_variant {
    constructor() {
        super(update_operator_variant_types.remove_operator);
    }
    to_mich() { return new att.Nat(1).to_mich(); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export const mich_to_update_operator_variant = (m: any): update_operator_variant => {
    const v = (new att.Nat(m)).to_big_number().toNumber();
    switch (v) {
        case 0: return new add_operator();
        case 1: return new remove_operator();
        default: throw new Error("mich_to_asset_type : invalid value " + v);
    }
};
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
export class update_operator_params implements att.ArchetypeType {
    constructor(public uotype: update_operator_variant, public uoowner: att.Address, public uooperator: att.Address, public uotoken_id: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.uotype.to_mich(), att.pair_to_mich([this.uoowner.to_mich(), att.pair_to_mich([this.uooperator.to_mich(), this.uotoken_id.to_mich()])])]);
    }
    equals(v: update_operator_params): boolean {
        return (this.uotype == v.uotype && this.uotype == v.uotype && this.uoowner.equals(v.uoowner) && this.uooperator.equals(v.uooperator) && this.uotoken_id.equals(v.uotoken_id));
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
export const update_operator_params_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("int", ["%uotype"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("address", ["%uoowner"]),
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("address", ["%uooperator"]),
            att.prim_annot_to_mich_type("nat", ["%uotoken_id"])
        ], [])
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
export type token_metadata_key = att.Nat;
export type ledger_key = att.Nat;
export class operators_key implements att.ArchetypeType {
    constructor(public oowner: att.Address, public ooperator: att.Address, public otoken_id: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.oowner.to_mich(), att.pair_to_mich([this.ooperator.to_mich(), this.otoken_id.to_mich()])]);
    }
    equals(v: operators_key): boolean {
        return (this.oowner.equals(v.oowner) && this.oowner.equals(v.oowner) && this.ooperator.equals(v.ooperator) && this.otoken_id.equals(v.otoken_id));
    }
}
export const token_metadata_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export const ledger_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export const operators_key_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%oowner"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("address", ["%ooperator"]),
        att.prim_annot_to_mich_type("nat", ["%otoken_id"])
    ], [])
], []);
export class token_metadata_value implements att.ArchetypeType {
    constructor(public mtoken_id: att.Nat, public mtoken_info: Array<[
        string,
        att.Bytes
    ]>) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.mtoken_id.to_mich(), att.list_to_mich(this.mtoken_info, x => {
                const x_key = x[0];
                const x_value = x[1];
                return att.elt_to_mich(att.string_to_mich(x_key), x_value.to_mich());
            })]);
    }
    equals(v: token_metadata_value): boolean {
        return (this.mtoken_id.equals(v.mtoken_id) && this.mtoken_id.equals(v.mtoken_id) && JSON.stringify(this.mtoken_info) == JSON.stringify(v.mtoken_info));
    }
}
export type ledger_value = att.Address;
export class operators_value implements att.ArchetypeType {
    constructor() { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.unit_to_mich();
    }
    equals(v: operators_value): boolean {
        return true;
    }
}
export const token_metadata_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%mtoken_id"]),
    att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("string", []), att.prim_annot_to_mich_type("bytes", []), ["%mtoken_info"])
], []);
export const ledger_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("address", []);
export const operators_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("unit", []);
export type token_metadata_container = Array<[
    token_metadata_key,
    token_metadata_value
]>;
export type ledger_container = Array<[
    ledger_key,
    ledger_value
]>;
export type operators_container = Array<[
    operators_key,
    operators_value
]>;
export const token_metadata_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("big_map", att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%mtoken_id"]),
    att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("string", []), att.prim_annot_to_mich_type("bytes", []), ["%mtoken_info"])
], []), []);
export const ledger_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("big_map", att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("address", []), []);
export const operators_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("big_map", att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%oowner"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("address", ["%ooperator"]),
        att.prim_annot_to_mich_type("nat", ["%otoken_id"])
    ], [])
], []), att.prim_annot_to_mich_type("unit", []), []);
const set_metadata_arg_to_mich = (k: string, d: att.Option<att.Bytes>): att.Micheline => {
    return att.pair_to_mich([
        att.string_to_mich(k),
        d.to_mich((x => { return x.to_mich(); }))
    ]);
}
const transfer_arg_to_mich = (from_: att.Address, tsx: Array<transfer_param>): att.Micheline => {
    return att.pair_to_mich([
        from_.to_mich(),
        att.list_to_mich(tsx, x => {
            return x.to_mich();
        })
    ]);
}
const update_operator_arg_to_mich = (updates: Array<update_operator_params>): att.Micheline => {
    return att.list_to_mich(updates, x => {
        return x.to_mich();
    });
}
const set_token_metadata_arg_to_mich = (tid: att.Nat, tdata: Array<[
    string,
    att.Bytes
]>): att.Micheline => {
    return att.pair_to_mich([
        tid.to_mich(),
        att.list_to_mich(tdata, x => {
            const x_key = x[0];
            const x_value = x[1];
            return att.elt_to_mich(att.string_to_mich(x_key), x_value.to_mich());
        })
    ]);
}
const mint_arg_to_mich = (to_: att.Address, token_id: att.Nat, token_metadata_: Array<[
    string,
    att.Bytes
]>): att.Micheline => {
    return att.pair_to_mich([
        to_.to_mich(),
        token_id.to_mich(),
        att.list_to_mich(token_metadata_, x => {
            const x_key = x[0];
            const x_value = x[1];
            return att.elt_to_mich(att.string_to_mich(x_key), x_value.to_mich());
        })
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
    async set_metadata(k: string, d: att.Option<att.Bytes>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_metadata", set_metadata_arg_to_mich(k, d), params);
        }
        throw new Error("Contract not initialised");
    }
    async transfer(from_: att.Address, tsx: Array<transfer_param>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "transfer", transfer_arg_to_mich(from_, tsx), params);
        }
        throw new Error("Contract not initialised");
    }
    async update_operator(updates: Array<update_operator_params>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "update_operator", update_operator_arg_to_mich(updates), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_token_metadata(tid: att.Nat, tdata: Array<[
        string,
        att.Bytes
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_token_metadata", set_token_metadata_arg_to_mich(tid, tdata), params);
        }
        throw new Error("Contract not initialised");
    }
    async mint(to_: att.Address, token_id: att.Nat, token_metadata_: Array<[
        string,
        att.Bytes
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "mint", mint_arg_to_mich(to_, token_id, token_metadata_), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_metadata_param(k: string, d: att.Option<att.Bytes>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_metadata", set_metadata_arg_to_mich(k, d), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_transfer_param(from_: att.Address, tsx: Array<transfer_param>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "transfer", transfer_arg_to_mich(from_, tsx), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_update_operator_param(updates: Array<update_operator_params>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "update_operator", update_operator_arg_to_mich(updates), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_token_metadata_param(tid: att.Nat, tdata: Array<[
        string,
        att.Bytes
    ]>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_token_metadata", set_token_metadata_arg_to_mich(tid, tdata), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_mint_param(to_: att.Address, token_id: att.Nat, token_metadata_: Array<[
        string,
        att.Bytes
    ]>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "mint", mint_arg_to_mich(to_, token_id, token_metadata_), params);
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
    async get_token_metadata_value(key: token_metadata_key): Promise<token_metadata_value | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.token_metadata), key.to_mich(), token_metadata_key_mich_type, token_metadata_value_mich_type), collapsed = true;
            if (data != undefined) {
                return new token_metadata_value((x => { return new att.Nat(x); })(data.mtoken_id), (x => { let res: Array<[
                    string,
                    att.Bytes
                ]> = []; for (let e of x.entries()) {
                    res.push([(x => { return x; })(e[0]), (x => { return new att.Bytes(x); })(e[1])]);
                } return res; })(data.mtoken_info));
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_token_metadata_value(key: token_metadata_key): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.token_metadata), key.to_mich(), token_metadata_key_mich_type, token_metadata_value_mich_type), collapsed = true;
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_ledger_value(key: ledger_key): Promise<ledger_value | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.ledger), key.to_mich(), ledger_key_mich_type, ledger_value_mich_type), collapsed = true;
            if (data != undefined) {
                return new att.Address(data);
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
    async get_operators_value(key: operators_key): Promise<operators_value | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.operators), key.to_mich(), operators_key_mich_type, operators_value_mich_type), collapsed = true;
            if (data != undefined) {
                return new operators_value();
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_operators_value(key: operators_key): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.operators), key.to_mich(), operators_key_mich_type, operators_value_mich_type), collapsed = true;
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_metadata_value(key: string): Promise<att.Bytes | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.metadata), att.string_to_mich(key), att.prim_annot_to_mich_type("string", []), att.prim_annot_to_mich_type("bytes", [])), collapsed = true;
            if (data != undefined) {
                return new att.Bytes(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_metadata_value(key: string): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.metadata), att.string_to_mich(key), att.prim_annot_to_mich_type("string", []), att.prim_annot_to_mich_type("bytes", [])), collapsed = true;
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
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\""),
        CALLER_NOT_OWNER: att.string_to_mich("\"CALLER_NOT_OWNER\""),
        FA2_NOT_OWNER: att.string_to_mich("\"FA2_NOT_OWNER\""),
        FA2_NOT_OPERATOR: att.string_to_mich("\"FA2_NOT_OPERATOR\""),
        NOT_ONE: att.string_to_mich("\"NOT_ONE\"")
    };
}
export const fa2_non_fungible = new Fa2_non_fungible();
