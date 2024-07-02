import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { MyhttpTwoService } from './myhttp-two.service';

describe('MyhttpTwoService', () => {
  let service: MyhttpTwoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[MyhttpTwoService]
    });
    service = TestBed.inject(MyhttpTwoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete client', async(inject([HttpTestingController, MyhttpTwoService], (httpClient:HttpTestingController, service:MyhttpTwoService)=>{
    const client = {
        "clientId": "C100",
        "userName": "yogurt123",
        "firstName": "Kay",
        "lastName": "Kim",
        "phoneNumber": "111-111-1111",
        "streetAddress": "123 Galaxy Way",
        "city": "Toronto",
        "province": "Ontario",
        "postalCode": "L6R R5J"
    }

    service.deleteClient("C100").subscribe(res =>{
        expect(res.length).toEqual(undefined);
      })
  
      let req = httpMock.expectOne('http://localhost:8056/api/Client/deleteClient/C100');
      expect(req.request.method).toBe("DELETE");
      req.flush(client);
      httpMock.verify(); 
  })))

});
