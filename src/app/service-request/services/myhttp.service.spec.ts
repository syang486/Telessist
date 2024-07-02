import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { MyhttpService } from './myhttp.service';

describe('MyhttpService', () => {
  let service: MyhttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[MyhttpService]
    });
    service = TestBed.inject(MyhttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update service request', async(inject([HttpTestingController, MyhttpService], (httpClient:HttpTestingController, service:MyhttpService)=>{
    let date = new Date();
    const request = {
      "serviceRequestId": "2478ee7a-6039-44c2-a4ee-299de0538295",
      "serviceId": "S124",
      "csrId": "CSR500",
      "clientId": "C556",
      "dateOfServiceRequest": date,
      "serviceRequestDesc": "I want new tv",
      "serviceRequestStatus": "Active"
    }
    
    service.updateServiceRequest(request).subscribe(res =>{
      expect(res).toBe(request);
    })

    let req = httpMock.expectOne('http://localhost:9000/api/telessist/agent/updateServiceRequest');
    expect(req.request.method).toBe("PUT");
    req.flush(request);
    httpMock.verify(); 
  })))

  it('should delete service request', async(inject([HttpTestingController, MyhttpService], (httpClient:HttpTestingController, service:MyhttpService)=>{
    let date = new Date();
    const request = {
      "serviceRequestId": "2478ee7a-6039-44c2-a4ee-299de0538295",
      "serviceId": "S124",
      "csrId": "CSR500",
      "clientId": "C556",
      "dateOfServiceRequest": date,
      "serviceRequestDesc": "I want new tv",
      "serviceRequestStatus": "Active"
    }
    
    service.deleteServiceRequest("2478ee7a-6039-44c2-a4ee-299de0538295").subscribe(res =>{
      expect(res).toBe(request);
    })

    let req = httpMock.expectOne('http://localhost:9000/api/telessist/agent/deleteServiceRequest/2478ee7a-6039-44c2-a4ee-299de0538295');
    expect(req.request.method).toBe("DELETE");
    req.flush(request);
    httpMock.verify(); 
  })))
});
