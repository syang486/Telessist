import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Technician } from './model/technician';
import { techRequest } from './model/techRequest';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TechrequestService } from './techrequest.service';
import { HttpClient } from '@angular/common/http';

describe('TechrequestService', () => {
  let service: TechrequestService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    service = new TechrequestService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addTechRequest', () => {
    it('should add a tech request and emit a new value for techRequestsGlobal', (done) => {
      const techRequest: techRequest = {
        techRequestId: "1",
        csrId: "1",
        clientId: "1",
        dateOfTechRequest: new Date(),
        technician: {} as Technician,
        techRequestStatus: 'Pending',
        techRequestDesc: 'Test tech request',
        techScheduledDate: new Date()
      };
      spyOn(httpClient, 'post').and.returnValue(of(techRequest));
      service.addTechRequest(techRequest).subscribe(() => {
        expect(service.techRequests.length).toBe(1);
        expect(service.techRequests[0]).toEqual(techRequest);
        expect(service.techRequestsGlobal.getValue()).toEqual([techRequest]);
        done();
      });
    });
  });

  describe('viewAllTechRequests', () => {
    it('should return an array of tech requests', (done) => {
      const techRequests: techRequest[] = [{
        techRequestId: "1",
        csrId: "1",
        clientId: "1",
        dateOfTechRequest: new Date(),
        technician: {} as Technician,
        techRequestStatus: 'Pending',
        techRequestDesc: 'Test tech request',
        techScheduledDate: new Date()
      }];
      spyOn(httpClient, 'get').and.returnValue(of(techRequests));
      service.viewAllTechRequests().subscribe((res) => {
        expect(res).toEqual(techRequests);
        done();
      });
    });
  });

  describe('deleteTechRequest', () => {
    it('should delete a tech request and emit a new value for techRequestsGlobal', (done) => {
      const techRequest: techRequest = {
        techRequestId: "1",
        csrId: "1",
        clientId: "1",
        dateOfTechRequest: new Date(),
        technician: {} as Technician,
        techRequestStatus: 'Pending',
        techRequestDesc: 'Test tech request',
        techScheduledDate: new Date()
      };
      service.techRequests = [techRequest];
      spyOn(httpClient, 'delete').and.returnValue(of({}));
      service.deleteTechRequest(techRequest.techRequestId).subscribe(() => {
        expect(service.techRequests.length).toBe(0);
        expect(service.techRequestsGlobal.getValue()).toEqual([]);
        done();
      });
    });
  });

});
