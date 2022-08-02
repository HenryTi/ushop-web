//=== UqApp builder created on Fri Jul 29 2022 17:08:53 GMT-0400 (北美东部夏令时间) ===//
import * as BzWorkshop from './BzWorkshop';

export interface UQs {
	BzWorkshop: BzWorkshop.UqExt;
}

export const uqsSchema = {
	"bizdev/workshop": BzWorkshop.uqSchema,
}

export * as BzWorkshop from './BzWorkshop';
