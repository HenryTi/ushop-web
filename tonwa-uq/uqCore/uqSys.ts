import { Entity } from "./entity";
import { Query } from "./query";

export interface UnitRole {
    unit: number;
    entity: string;
    isOwner: boolean;
    isAdmin: boolean;
    roles: string[];            // role names
}

export interface MyRole {
    sys: UnitRole;              // unit: 0
    units: UnitRole[];
}

export class UqSys {
    private readonly entities: { [name: string]: Entity } = {};
    constructor(entities: { [name: string]: Entity }) {
        this.entities = entities;
    }

    async Poked(): Promise<boolean> {
        let query: Query = this.entities['$poked'] as any;
        let ret = await query.query({});
        let arr: { poke: number; }[] = ret.ret;
        if (arr.length === 0) return false;
        let row = arr[0];
        return row["poke"] === 1;
    }

    async RoleMe(): Promise<MyRole> {
        let unitRoles: { [unit: number]: UnitRole } = {};
        let query: Query = this.entities['$role_my'] as any;
        let { admins, roles } = await query.query({});
        function getUnitRole(unit: number, entity: string) {
            let unitRole = unitRoles[unit];
            if (unitRole === undefined) {
                unitRoles[unit] = unitRole = {
                    unit,
                    entity,
                    isOwner: false,
                    isAdmin: false,
                    roles: [],
                }
            }
            return unitRole;
        }
        for (let row of admins) {
            let { unit, admin, entity } = row;
            let unitRole = getUnitRole(unit, entity);
            unitRole.isOwner = (admin & 1) === 1;
            unitRole.isAdmin = (admin & 2) === 2;
        }
        for (let row of roles) {
            let { unit, role, entity } = row;
            let unitRole = getUnitRole(unit, entity);
            unitRole.roles.push(role);
        }
        let sys: UnitRole;
        let units: UnitRole[] = [];
        for (let i in unitRoles) {
            let v = unitRoles[i];
            if (Number(i) === 0) {
                sys = v;
            }
            else {
                units.push(v);
            }
        }
        return { sys, units };
    }
}
