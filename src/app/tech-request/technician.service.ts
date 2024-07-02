import { Injectable } from '@angular/core';
import { Technician } from './model/technician';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  private readonly TECHNICIANS_KEY = 'technicians';
  constructor() { }
  technicians: Array<Technician> =[];
  getTechnicians() : any[] {
    const techniciansJson = sessionStorage.getItem(this.TECHNICIANS_KEY);
    if(techniciansJson) {
      // this.technicians = techniciansJson;
      return JSON.parse(techniciansJson);
    } else {
      return [];
    }
  }

  saveTechnicians(technician: Technician): void {
    const storedTechnicians = sessionStorage.getItem(this.TECHNICIANS_KEY);
    // this.technicians.push(technician);
    if (storedTechnicians) {
      this.technicians = JSON.parse(storedTechnicians);
    }

    this.technicians.push(technician);
    const techniciansjson = JSON.stringify(this.technicians);
    sessionStorage.setItem(this.TECHNICIANS_KEY, techniciansjson);
  }
}
