import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import{ HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { EquipmentrequestservService } from './equipmentrequestserv.service';

describe('EquipmentrequestservService', () => {
  let service: EquipmentrequestservService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers:[EquipmentrequestservService]
    });
    service = TestBed.inject(EquipmentrequestservService);
    httpMock =  TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update equipment request', async(inject([HttpTestingController, EquipmentrequestservService], (httpClient:HttpTestingController, service:EquipmentrequestservService)=>{
    let date = new Date();
    const request = {
      "equipmentRequestId": "2478ee7a-6039-44c2-a4ee-299de0538295",
      "equipmentId": "S124",
      "csrId": "CSR500",
      "clientId": "C556",
      "dateOfEquipRequest": date,
      "equipRequestDesc": "I want new tv",
      "equipRequestStatus": "Active"
    }
    
    service.updateEquipmentRequest(request).subscribe(res =>{
      expect(res).toBe(request);
    })

    let req = httpMock.expectOne('http://localhost:9099/api/telessist/agent/updateEquipmentRequest');
    expect(req.request.method).toBe("PUT");
    req.flush(request);
    httpMock.verify(); 
  })))

  it('should delete equipment request', async(inject([HttpTestingController, EquipmentrequestservService], (httpClient:HttpTestingController, service:EquipmentrequestservService)=>{
    let date = new Date();
    const request = {
      "equipmentRequestId": "2478ee7a-6039-44c2-a4ee-299de0538295",
      "equipmentId": "S124",
      "csrId": "CSR500",
      "clientId": "C556",
      "dateOfEquipRequest": date,
      "equipRequestDesc": "I want new tv",
      "equipRequestStatus": "Active"
    }
    
    service.deleteEquipmentRequest(request).subscribe(res =>{
      expect(res).toBe(request);
    })

    let req = httpMock.expectOne('http://localhost:9099/api/telessist/agent/deleteEquipmentRequest/2478ee7a-6039-44c2-a4ee-299de0538295');
    expect(req.request.method).toBe("DELETE");
    req.flush(request);
    httpMock.verify(); 
  })))


});
