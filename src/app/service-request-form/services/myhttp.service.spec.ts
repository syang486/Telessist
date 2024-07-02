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

  it('should add service request', async(inject([HttpTestingController, MyhttpService], (httpClient:HttpTestingController, service:MyhttpService)=>{
    const request = {
      "serviceId": "S125",
      "clientId": "C523",
      "serviceRequestDesc": "I want new 5G Internet"
    }

    service.addServiceRequest(request).subscribe(res =>{
      expect(res).toBe(request);
    })

    let req = httpMock.expectOne('http://localhost:9000/api/telessist/user/addServiceRequest');
    expect(req.request.method).toBe("POST");
    req.flush(request);
    httpMock.verify(); 
  })))

  it('should get general service by location', async(inject([HttpTestingController, MyhttpService], (httpClient:HttpTestingController, service:MyhttpService)=>{
    const genService = [{
      "serviceId": "s090", 
      "serviceName": "Phone Internet 5G", 
      "monthlyPrice": 79.99, 
      "location": "Ontario", 
      "promotion": [ 
          { 
            "promoId": "p030", 
            "promoName": "Pre Summer Offer", 
            "discount": 12.0, 
            "promoDesc": "Get some good plans this summer", 
            "region": "Toronto", 
            "promoExpiryDate": "2023-05-31" 
          }
        ]
    }]

    service.getGeneralServiceByLocation("Ontario").subscribe(res =>{
      expect(res.length).toBe(1);
    })

    let req = httpMock.expectOne('http://localhost:9092/api/telessist/viewServiceByLocation/Ontario');
    expect(req.request.method).toBe("GET");
    req.flush(genService);
    httpMock.verify(); 
  })))
});
