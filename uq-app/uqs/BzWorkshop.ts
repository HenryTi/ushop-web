//=== UqApp builder created on Fri Jul 29 2022 17:08:53 GMT-0400 (北美东部夏令时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqQuery, UqAction, UqID, UqIX } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Render, IDXEntity } from "tonwa-react";


//===============================;
//======= UQ bizdev/workshop ========;
//===============================';

export interface ID {
    id?: number;
}

export interface IDX {
    id: number;
}

export interface IX {
    ix: number;
    xi: number;
}

export interface Param$role_My {
}
export interface Return$role_MyAdmins {
	id: number;
	unit: number;
	user: number;
	admin: number;
	entity: string;
}
export interface Return$role_MyRoles {
	id: number;
	unit: number;
	user: number;
	role: string;
	entity: string;
}
export interface Result$role_My {
	admins: Return$role_MyAdmins[];
	roles: Return$role_MyRoles[];
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface Param$setMyTimezone {
	_timezone: number;
}
export interface Result$setMyTimezone {
}

export interface Param$getUnitTime {
}
export interface Return$getUnitTimeRet {
	timezone: number;
	unitTimeZone: number;
	unitBizMonth: number;
	unitBizDate: number;
}
export interface Result$getUnitTime {
	ret: Return$getUnitTimeRet[];
}

export interface Draft extends ID {
	entity: number;
	content: string;
}

export interface DraftInActs extends ID {
	ID?: UqID<any>;
	entity: number;
	content: string;
}

export interface IxDraft extends IX {
}

export interface Note extends ID {
	staff: number;
	client: number;
	note: string;
	sensitive: number;
}

export interface NoteInActs extends ID {
	ID?: UqID<any>;
	staff: number | PersonInActs;
	client: number | PersonInActs;
	note: string;
	sensitive: number;
}

export interface IxStaffClient extends IX {
	tick: number;
}

export interface ParamSaveNote {
	id: number;
	staff: number;
	client: number;
	note: string;
	sensitive: number;
}
export interface ReturnSaveNoteRet {
	id: number;
}
export interface ResultSaveNote {
	ret: ReturnSaveNoteRet[];
}

export interface ParamMyClients {
}
export interface ReturnMyClientsRet {
	id: number;
	no: string;
	name: string;
	vice: string;
	firstName: string;
	lastName: string;
	middleName: string;
	gender: any;
	year: number;
	month: number;
	day: number;
	email: string;
	mobile: string;
	mobileCountry: string;
}
export interface ResultMyClients {
	ret: ReturnMyClientsRet[];
}

export enum Gender {
	female = 0,
	male = 1
}

export interface Person extends ID {
	no?: string;
	name: string;
	vice: string;
	firstName: string;
	lastName: string;
	middleName: string;
	gender: any;
	year: number;
	month: number;
	day: number;
	email: string;
	mobile: string;
	mobileCountry: string;
}

export interface PersonInActs extends ID {
	ID?: UqID<any>;
	no?: string;
	name: string;
	vice: string;
	firstName: string;
	lastName: string;
	middleName: string;
	gender: any;
	year: number;
	month: number;
	day: number;
	email: string;
	mobile: string;
	mobileCountry: string;
}

export interface IxPersonLog extends IX {
}

export interface ClientSurvey extends ID {
	client: number;
}

export interface ClientSurveyInActs extends ID {
	ID?: UqID<any>;
	client: number | ID;
}

export interface ParamGetPersonList {
	role: any;
}
export interface ReturnGetPersonListRet {
	id: number;
	no: string;
	name: string;
	vice: string;
	firstName: string;
	lastName: string;
	middleName: string;
	gender: any;
	year: number;
	month: number;
	day: number;
	email: string;
	mobile: string;
	mobileCountry: string;
	user: number;
}
export interface ReturnGetPersonListRoles {
	person: number;
	role: any;
}
export interface ResultGetPersonList {
	ret: ReturnGetPersonListRet[];
	roles: ReturnGetPersonListRoles[];
}

export interface ParamPersonSearch {
	role: any;
	key: string;
}
export interface ReturnPersonSearchRet {
	id: number;
	no: string;
	name: string;
	vice: string;
	firstName: string;
	lastName: string;
	middleName: string;
	gender: any;
	year: number;
	month: number;
	day: number;
	email: string;
	mobile: string;
	mobileCountry: string;
}
export interface ResultPersonSearch {
	ret: ReturnPersonSearchRet[];
}

export interface ParamGetPersonLog {
	person: number;
}
export interface ReturnGetPersonLogRet {
	log: number;
	type: string;
	value: string;
}
export interface ResultGetPersonLog {
	ret: ReturnGetPersonLogRet[];
}

export const TagGroupNames = {
	staff: "staff-tags",
	client: "client-tags",
	workshop: "workshop-tags",
	donator: "donator-tags",
	note: "note-tags"
}

export interface TagGroup extends ID {
	name: string;
}

export interface TagGroupInActs extends ID {
	ID?: UqID<any>;
	name: string;
}

export interface Tag extends ID {
	name: string;
	vice: string;
	single: number;
}

export interface TagInActs extends ID {
	ID?: UqID<any>;
	name: string;
	vice: string;
	single: number;
}

export interface TagItem extends ID {
	name: string;
}

export interface TagItemInActs extends ID {
	ID?: UqID<any>;
	name: string;
}

export interface IxTag extends IX {
}

export interface IxIdTag extends IX {
}

export interface IxLocalIdTag extends IX {
}

export interface IxGlobalIdTag extends IX {
}

export enum Role {
	staff = 10,
	counselor = 11,
	volunteer = 12,
	board = 13,
	support = 14,
	client = 20,
	donator = 30
}

export interface IxUserPerson extends IX {
}

export interface IxPersonRole extends IX {
}

export interface Test1 extends ID {
	a: string;
	b: string;
}

export interface Test1InActs extends ID {
	ID?: UqID<any>;
	a: string;
	b: string;
}

export interface Test2 extends ID {
	a: string;
	b: string;
}

export interface Test2InActs extends ID {
	ID?: UqID<any>;
	a: string;
	b: string;
}

export interface Test3 extends ID {
	a: string;
	b: string;
}

export interface Test3InActs extends ID {
	ID?: UqID<any>;
	a: string;
	b: string;
}

export interface Test4 extends ID {
	a: string;
	b: string;
}

export interface Test4InActs extends ID {
	ID?: UqID<any>;
	a: string;
	b: string;
}

export interface ParamTest {
}
export interface ResultTest {
}

export interface Workshop extends ID {
	no?: string;
	name: string;
	vice: string;
	staff: number;
}

export interface WorkshopInActs extends ID {
	ID?: UqID<any>;
	no?: string;
	name: string;
	vice: string;
	staff: number | PersonInActs;
}

export interface Session extends ID {
	workshop: number;
	date: any;
	vice: string;
	time: any;
	span: number;
}

export interface SessionInActs extends ID {
	ID?: UqID<any>;
	workshop: number | WorkshopInActs;
	date: any;
	vice: string;
	time: any;
	span: number;
}

export interface SessionPerson extends ID {
	session: number;
	person: number;
	workshop: number;
	deleted: number;
}

export interface SessionPersonInActs extends ID {
	ID?: UqID<any>;
	session: number | SessionInActs;
	person: number | PersonInActs;
	workshop: number | WorkshopInActs;
	deleted: number;
}

export interface IxWorkshopSession extends IX {
}

export interface IxSessionStaff extends IX {
	own: number;
	substitue: number;
	done: number;
}

export interface IxSessionClient extends IX {
	deleted: number;
}

export interface ParamSetSessionStaff {
	session: number;
	staff: number;
	own: number;
	substitue: number;
	done: number;
}
export interface ResultSetSessionStaff {
}

export interface ParamSaveWorkshopStaff {
	id: number;
	staff: number;
}
export interface ResultSaveWorkshopStaff {
}

export interface ParamSaveSessionAttendee {
	session: number;
	client: number;
	deleted: number;
}
export interface ResultSaveSessionAttendee {
}

export interface ParamMySessions {
}
export interface ReturnMySessionsRet {
	id: number;
	workshop: number;
	date: any;
	vice: string;
	time: any;
	span: number;
	own: number;
	substitue: number;
	done: number;
}
export interface ResultMySessions {
	ret: ReturnMySessionsRet[];
}

export interface ParamActs {
	draft?: DraftInActs[];
	ixDraft?: IxDraft[];
	note?: NoteInActs[];
	ixStaffClient?: IxStaffClient[];
	person?: PersonInActs[];
	ixPersonLog?: IxPersonLog[];
	clientSurvey?: ClientSurveyInActs[];
	tagGroup?: TagGroupInActs[];
	tag?: TagInActs[];
	tagItem?: TagItemInActs[];
	ixTag?: IxTag[];
	ixIdTag?: IxIdTag[];
	ixLocalIdTag?: IxLocalIdTag[];
	ixGlobalIdTag?: IxGlobalIdTag[];
	ixUserPerson?: IxUserPerson[];
	ixPersonRole?: IxPersonRole[];
	test1?: Test1InActs[];
	test2?: Test2InActs[];
	test3?: Test3InActs[];
	test4?: Test4InActs[];
	workshop?: WorkshopInActs[];
	session?: SessionInActs[];
	sessionPerson?: SessionPersonInActs[];
	ixWorkshopSession?: IxWorkshopSession[];
	ixSessionStaff?: IxSessionStaff[];
	ixSessionClient?: IxSessionClient[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
	IDRender(id:number):JSX.Element;
	IDLocalRender(id:number):JSX.Element;

	$role_My: UqQuery<Param$role_My, Result$role_My>;
	$poked: UqQuery<Param$poked, Result$poked>;
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	$getUnitTime: UqQuery<Param$getUnitTime, Result$getUnitTime>;
	Draft: UqID<any>;
	IxDraft: UqIX<any>;
	Note: UqID<any>;
	IxStaffClient: UqIX<any>;
	SaveNote: UqAction<ParamSaveNote, ResultSaveNote>;
	MyClients: UqQuery<ParamMyClients, ResultMyClients>;
	Person: UqID<any>;
	IxPersonLog: UqIX<any>;
	ClientSurvey: UqID<any>;
	GetPersonList: UqQuery<ParamGetPersonList, ResultGetPersonList>;
	PersonSearch: UqQuery<ParamPersonSearch, ResultPersonSearch>;
	GetPersonLog: UqQuery<ParamGetPersonLog, ResultGetPersonLog>;
	TagGroup: UqID<any>;
	Tag: UqID<any>;
	TagItem: UqID<any>;
	IxTag: UqIX<any>;
	IxIdTag: UqIX<any>;
	IxLocalIdTag: UqIX<any>;
	IxGlobalIdTag: UqIX<any>;
	IxUserPerson: UqIX<any>;
	IxPersonRole: UqIX<any>;
	Test1: UqID<any>;
	Test2: UqID<any>;
	Test3: UqID<any>;
	Test4: UqID<any>;
	Test: UqAction<ParamTest, ResultTest>;
	Workshop: UqID<any>;
	Session: UqID<any>;
	SessionPerson: UqID<any>;
	IxWorkshopSession: UqIX<any>;
	IxSessionStaff: UqIX<any>;
	IxSessionClient: UqIX<any>;
	SetSessionStaff: UqAction<ParamSetSessionStaff, ResultSetSessionStaff>;
	SaveWorkshopStaff: UqAction<ParamSaveWorkshopStaff, ResultSaveWorkshopStaff>;
	SaveSessionAttendee: UqAction<ParamSaveSessionAttendee, ResultSaveSessionAttendee>;
	MySessions: UqQuery<ParamMySessions, ResultMySessions>;
}


export const uqSchema={
    "$role_my": {
        "name": "$role_my",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "admins",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "user",
                        "type": "id"
                    },
                    {
                        "name": "admin",
                        "type": "tinyint"
                    },
                    {
                        "name": "entity",
                        "type": "char",
                        "size": 100
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "user",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "entity",
                        "type": "char",
                        "size": 100
                    }
                ]
            }
        ]
    },
    "$poked": {
        "name": "$poked",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "poke",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "$setmytimezone": {
        "name": "$setMyTimezone",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "_timezone",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "$getunittime": {
        "name": "$getUnitTime",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "timezone",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitTimeZone",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitBizMonth",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitBizDate",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "draft": {
        "name": "Draft",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "entity",
                "type": "smallint"
            },
            {
                "name": "content",
                "type": "text"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 3
    },
    "ixdraft": {
        "name": "IxDraft",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "note": {
        "name": "Note",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "staff",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            },
            {
                "name": "client",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            },
            {
                "name": "note",
                "type": "text"
            },
            {
                "name": "sensitive",
                "type": "tinyint"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 3
    },
    "ixstaffclient": {
        "name": "IxStaffClient",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "tick",
                "type": "int"
            },
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 2
    },
    "savenote": {
        "name": "SaveNote",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "staff",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            },
            {
                "name": "client",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            },
            {
                "name": "note",
                "type": "text"
            },
            {
                "name": "sensitive",
                "type": "tinyint"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "ID": "note",
                        "tuid": "note"
                    }
                ]
            }
        ]
    },
    "myclients": {
        "name": "MyClients",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "middleName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "year",
                        "type": "smallint"
                    },
                    {
                        "name": "month",
                        "type": "tinyint"
                    },
                    {
                        "name": "day",
                        "type": "tinyint"
                    },
                    {
                        "name": "email",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "mobile",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "mobileCountry",
                        "type": "char",
                        "size": 10
                    }
                ]
            }
        ]
    },
    "gender": {
        "name": "Gender",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "female": 0,
            "male": 1
        }
    },
    "person": {
        "name": "Person",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "name",
                "type": "char",
                "size": 100
            },
            {
                "name": "vice",
                "type": "char",
                "size": 50
            },
            {
                "name": "firstName",
                "type": "char",
                "size": 50
            },
            {
                "name": "lastName",
                "type": "char",
                "size": 50
            },
            {
                "name": "middleName",
                "type": "char",
                "size": 50
            },
            {
                "name": "gender",
                "type": "enum"
            },
            {
                "name": "year",
                "type": "smallint"
            },
            {
                "name": "month",
                "type": "tinyint"
            },
            {
                "name": "day",
                "type": "tinyint"
            },
            {
                "name": "email",
                "type": "char",
                "size": 100
            },
            {
                "name": "mobile",
                "type": "char",
                "size": 30
            },
            {
                "name": "mobileCountry",
                "type": "char",
                "size": 10
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "name",
            "no",
            "vice"
        ],
        "global": false,
        "idType": 2
    },
    "ixpersonlog": {
        "name": "IxPersonLog",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uid",
                "tuid": "$uid"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "clientsurvey": {
        "name": "ClientSurvey",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "client",
                "type": "id"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 3
    },
    "getpersonlist": {
        "name": "GetPersonList",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "role",
                "type": "enum"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "middleName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "year",
                        "type": "smallint"
                    },
                    {
                        "name": "month",
                        "type": "tinyint"
                    },
                    {
                        "name": "day",
                        "type": "tinyint"
                    },
                    {
                        "name": "email",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "mobile",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "mobileCountry",
                        "type": "char",
                        "size": 10
                    },
                    {
                        "name": "user",
                        "type": "id"
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "person",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "personsearch": {
        "name": "PersonSearch",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "role",
                "type": "enum"
            },
            {
                "name": "key",
                "type": "char",
                "size": 30
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "middleName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "year",
                        "type": "smallint"
                    },
                    {
                        "name": "month",
                        "type": "tinyint"
                    },
                    {
                        "name": "day",
                        "type": "tinyint"
                    },
                    {
                        "name": "email",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "mobile",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "mobileCountry",
                        "type": "char",
                        "size": 10
                    }
                ]
            }
        ]
    },
    "getpersonlog": {
        "name": "GetPersonLog",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "person",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "log",
                        "type": "id"
                    },
                    {
                        "name": "type",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "value",
                        "type": "text"
                    }
                ]
            }
        ]
    },
    "taggroupnames": {
        "name": "TagGroupNames",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "values": {
            "staff": "staff-tags",
            "client": "client-tags",
            "workshop": "workshop-tags",
            "donator": "donator-tags",
            "note": "note-tags"
        }
    },
    "taggroup": {
        "name": "TagGroup",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "create": true,
        "update": true,
        "global": false,
        "idType": 3
    },
    "tag": {
        "name": "Tag",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            },
            {
                "name": "vice",
                "type": "char",
                "size": 100
            },
            {
                "name": "single",
                "type": "tinyint"
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name",
            "vice"
        ],
        "create": true,
        "update": true,
        "global": false,
        "idType": 3
    },
    "tagitem": {
        "name": "TagItem",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "create": true,
        "update": true,
        "global": false,
        "idType": 3
    },
    "ixtag": {
        "name": "IxTag",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "ixidtag": {
        "name": "IxIdTag",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "ixlocalidtag": {
        "name": "IxLocalIdTag",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "ixglobalidtag": {
        "name": "IxGlobalIdTag",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "role": {
        "name": "Role",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "staff": 10,
            "counselor": 11,
            "volunteer": 12,
            "board": 13,
            "support": 14,
            "client": 20,
            "donator": 30
        }
    },
    "ixuserperson": {
        "name": "IxUserPerson",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "ID": "$user",
                "tuid": "$user"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 2
    },
    "ixpersonrole": {
        "name": "IxPersonRole",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "test1": {
        "name": "Test1",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "a",
                "type": "char",
                "size": 100
            },
            {
                "name": "b",
                "type": "char",
                "size": 100
            }
        ],
        "keys": [
            {
                "name": "a",
                "type": "char",
                "size": 100
            }
        ],
        "global": false,
        "idType": 2
    },
    "test2": {
        "name": "Test2",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "a",
                "type": "char",
                "size": 100
            },
            {
                "name": "b",
                "type": "char",
                "size": 100
            }
        ],
        "keys": [
            {
                "name": "a",
                "type": "char",
                "size": 100
            }
        ],
        "global": false,
        "idType": 2
    },
    "test3": {
        "name": "Test3",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "a",
                "type": "char",
                "size": 100
            },
            {
                "name": "b",
                "type": "char",
                "size": 100
            }
        ],
        "keys": [
            {
                "name": "a",
                "type": "char",
                "size": 100
            }
        ],
        "global": false,
        "idType": 3
    },
    "test4": {
        "name": "Test4",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "a",
                "type": "char",
                "size": 100
            },
            {
                "name": "b",
                "type": "char",
                "size": 100
            }
        ],
        "keys": [
            {
                "name": "a",
                "type": "char",
                "size": 100
            }
        ],
        "global": false,
        "idType": 3
    },
    "test": {
        "name": "Test",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [] as any
    },
    "workshop": {
        "name": "Workshop",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "name",
                "type": "char",
                "size": 100
            },
            {
                "name": "vice",
                "type": "text"
            },
            {
                "name": "staff",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "name",
            "no",
            "vice"
        ],
        "create": true,
        "global": false,
        "idType": 2
    },
    "session": {
        "name": "Session",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "workshop",
                "type": "id",
                "ID": "workshop",
                "tuid": "workshop"
            },
            {
                "name": "date",
                "type": "date"
            },
            {
                "name": "vice",
                "type": "char",
                "size": 200
            },
            {
                "name": "time",
                "type": "time"
            },
            {
                "name": "span",
                "type": "smallint"
            }
        ],
        "keys": [] as any,
        "nameNoVice": [
            "vice"
        ],
        "global": false,
        "idType": 2
    },
    "sessionperson": {
        "name": "SessionPerson",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "session",
                "type": "id",
                "ID": "session",
                "tuid": "session"
            },
            {
                "name": "person",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            },
            {
                "name": "workshop",
                "type": "id",
                "ID": "workshop",
                "tuid": "workshop"
            },
            {
                "name": "deleted",
                "type": "tinyint"
            }
        ],
        "keys": [
            {
                "name": "session",
                "type": "id",
                "ID": "session",
                "tuid": "session"
            },
            {
                "name": "person",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            }
        ],
        "global": false,
        "idType": 3
    },
    "ixworkshopsession": {
        "name": "IxWorkshopSession",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 2
    },
    "ixsessionstaff": {
        "name": "IxSessionStaff",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "own",
                "type": "tinyint"
            },
            {
                "name": "substitue",
                "type": "tinyint"
            },
            {
                "name": "done",
                "type": "tinyint"
            },
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 2
    },
    "ixsessionclient": {
        "name": "IxSessionClient",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "deleted",
                "type": "tinyint"
            },
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "create": true,
        "update": true,
        "xiType": 2
    },
    "setsessionstaff": {
        "name": "SetSessionStaff",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "session",
                "type": "id"
            },
            {
                "name": "staff",
                "type": "id"
            },
            {
                "name": "own",
                "type": "tinyint"
            },
            {
                "name": "substitue",
                "type": "tinyint"
            },
            {
                "name": "done",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "saveworkshopstaff": {
        "name": "SaveWorkshopStaff",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "staff",
                "type": "id"
            }
        ],
        "returns": [] as any
    },
    "savesessionattendee": {
        "name": "SaveSessionAttendee",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "session",
                "type": "id"
            },
            {
                "name": "client",
                "type": "id"
            },
            {
                "name": "deleted",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "mysessions": {
        "name": "MySessions",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "workshop",
                        "type": "id",
                        "ID": "workshop",
                        "tuid": "workshop"
                    },
                    {
                        "name": "date",
                        "type": "date"
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "time",
                        "type": "time"
                    },
                    {
                        "name": "span",
                        "type": "smallint"
                    },
                    {
                        "name": "own",
                        "type": "tinyint"
                    },
                    {
                        "name": "substitue",
                        "type": "tinyint"
                    },
                    {
                        "name": "done",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    }
}