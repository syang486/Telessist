import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CallStatsServiceService } from './call-stats-service.service';

describe('CallStatsServiceService', () => {
  let service: CallStatsServiceService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[CallStatsServiceService]
    });
    service = TestBed.inject(CallStatsServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all call logs by csr agent id', async(inject([HttpTestingController, CallStatsServiceService], (httpClient:HttpTestingController, service:CallStatsServiceService)=>{
    const calllogs = [{
      "callLogId": "log1",
      "csrId": "csr1",
      "clientId": "client1",
      "requestId": "req1",
      "callDate": "2023-03-31T00:00:00",
      "callTime": 20,
      "callType": "Incoming",
      "callDesc": "fds",
      "callSolution": "asf"
    }]

    service.getCallLogsByAgentId("csr1").subscribe(res => {
      expect(res.length).toBe(1);
    })

    let req = httpMock.expectOne('http://localhost:8187/CallLogs/callLogByCsrId/csr1');
    expect(req.request.method).toBe("GET");
    req.flush(calllogs);
    httpMock.verify();
  })))

  it('should get all agent information', async(inject([HttpTestingController, CallStatsServiceService], (httpClient:HttpTestingController, service:CallStatsServiceService)=>{
    const agents = [{
      "agentId":"CSR101",
      "userName":"asdf",
      "firstName":"dfs",
      "lastName":"123wqe",
      "email":"fssfkldj@sfljssf"
  }]

    service.getAllAgents().subscribe(res => {
      expect(res.length).toBe(1);
    })

    let req = httpMock.expectOne('http://localhost:8039/api/Agent/viewAllAgents');
    expect(req.request.method).toBe("GET");
    req.flush(agents);
    httpMock.verify();
  })))

  it('should get all feedbacks by csr agent id', async(inject([HttpTestingController, CallStatsServiceService], (httpClient:HttpTestingController, service:CallStatsServiceService)=>{
    const feedbacks = [{
      "feedbackId":"1wq23ew",
      "clientId":"1qwerewq",
      "agentId":"CSR100",
      "serviceId":"qwsade",
      "feedbackDesc":"asdfdsa",
      "rating":5.6482
  }]

    service.getFeedbackByAgentId("CSR100").subscribe(res => {
      expect(res.length).toBe(1);
    })

    let req = httpMock.expectOne('http://localhost:8069/api/Feedback/viewFeedbackByAgentId/CSR100');
    expect(req.request.method).toBe("GET");
    req.flush(feedbacks);
    httpMock.verify();
  })))
});
