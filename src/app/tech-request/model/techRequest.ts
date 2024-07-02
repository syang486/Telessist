import { Technician } from "./technician";

export class techRequest{
    techRequestId?: string;
    csrId?: string;
    clientId?: string;
    dateOfTechRequest?: Date;
    techRequestDesc?: string;
    techScheduledDate?: Date;
    technician?: Technician;
    techRequestStatus?: string;
}