import { Technician } from "./technician";

export class TechRequest {
    techRequestId?:string;
    csrId?:string;
    clientId?:string;
    dateOfTechRequest?:Date;
    technician?:Technician;
    techRequestStatus?:string;
    techScheduledDate?:Date;
    techRequestDesc?:string;
}