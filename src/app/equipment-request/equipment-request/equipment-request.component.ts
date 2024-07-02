import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipmentRequest } from '../model/equipment-request.model';
import { Equipment } from '../model/equipment.model';
import { EquipmentrequestservService } from '../services/equipmentrequestserv.service';

import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-equipment-request',
  templateUrl: './equipment-request.component.html',
  styleUrls: ['./equipment-request.component.css']
})
export class EquipmentRequestComponent implements OnInit{
  equipreq : EquipmentRequest = new EquipmentRequest();

  equipmentForm!: FormGroup;

  equipments : Array<Equipment> = [];
  //equipment : Equipment = new Equipment();
  msg:string="";
  
  constructor(private erService: EquipmentrequestservService, private formBuilder: FormBuilder, private snackBar: SnackbarService){
    this.equipmentForm = this.formBuilder.group({
      clientId:[sessionStorage.getItem('clientId')],
      equipmentId:['', [Validators.required]],
      equipRequestDesc: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getEquipmentForDropdown();
    console.log(this.equipments)
  }


  addEquipmentRequest(){
    if(this.equipmentForm.valid){
      this.erService.addEquipmentRequest(this.equipmentForm.value).subscribe({
        next : (res:any)=>{
          this.msg = "Equipment Request submitted"
          this.snackBar.validSnackBar('Equipment Request Successfully Added', 'Close')
          console.log(res);
        },
        error:(err:any)=>
        {
          this.msg=err
          this.snackBar.invalidSnackBar('Equipment Request not Added', 'Try Again')
        }
      })
    } else {
      this.msg = "Please update the form with all fields!"
      this.snackBar.invalidSnackBar(this.msg, 'Try Again');
    }
    this.equipmentForm.reset();
  }

  getEquipmentForDropdown(){
    this.erService.getEquipment().subscribe(
      { 
        next : (res:any)=>
        {
          const result = [...res.reduce((mp:any, o:any)=> {
            const key = JSON.stringify([o.equipmentModel, o.equipmentType, o.equipmentPrice]);
            if(!mp.has(key)) mp.set(key, {...o,count: 0});
            mp.get(key).count++;
            return mp;
          }, new Map).values()];

          this.equipments = result;
          console.log(result)
        },
        error:(err:any)=>
        {
          this.msg=err
        }
       }
       
    )
    
  }

  





}