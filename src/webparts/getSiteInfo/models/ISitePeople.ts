import { ISiteUser } from "./ISiteUser";

export interface ISitePeople {

    owners: ISiteUser[];

    members: ISiteUser[];

    visitors: ISiteUser[];

}