import { Promotion } from "./promotion";

export class GeneralService{
    serviceId?:string;
    serviceName?:string;
    monthlyPrice?:number;
    location?:string;
    promotion?:Array<Promotion>;
}