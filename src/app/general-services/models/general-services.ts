import { Promotion } from "./promotion";

// Data Model for General Services
export class GeneralServices{
    serviceId!: string;
    serviceName?: string;
    monthlyPrice?: number;
    location?: string;
    promotion?: Array<Promotion>;
}