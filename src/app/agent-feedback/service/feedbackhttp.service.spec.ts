import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { FeedbackhttpService } from './feedbackhttp.service';

describe('FeedbackhttpService', () => {
  let service: FeedbackhttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule],
        providers:[FeedbackhttpService]
    });
    service = TestBed.inject(FeedbackhttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should delete client', async(inject([HttpTestingController, FeedbackhttpService], (httpClient:HttpTestingController, service:FeedbackhttpService)=>{
    const feedback = {
        "feedbackId": "F109",
        "clientId": "C303",
        "agentId": "CSR100",
        "serviceId": "S203",
        "feedbackDesc": "This agent is ok!",
        "rating": 5,
        "feedbackDate": "2023-03-28T19:02:34.310Z"
      }

    service.getFeedbackByAgentId("CSR100").subscribe(res =>{
        expect(res).toEqual(feedback);
      })
  
      let req = httpMock.expectOne('http://localhost:8069/api/Feedback/viewFeedbackByAgentId/CSR100');
      expect(req.request.method).toBe("GET");
      req.flush(feedback);
      httpMock.verify(); 
  })))

});
