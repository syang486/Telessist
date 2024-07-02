import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GeneralServicesServiceService } from './general-services-service.service';

describe('GeneralServicesServiceService', () => {
  let service: GeneralServicesServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeneralServicesServiceService]
    });
    service = TestBed.inject(GeneralServicesServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchGeneralServices', () => {
    it('should retrieve general services', () => {
      const mockServices = [
        { serviceId: '1', serviceName: 'Service 1', serviceDesc: 'Description 1' },
        { serviceId: '2', serviceName: 'Service 2', serviceDesc: 'Description 2' }
      ];

      service.fetchGeneralServices();

      const req = httpMock.expectOne('http://localhost:9092/api/telessist/viewAllServices');
      expect(req.request.method).toEqual('GET');
      req.flush(mockServices);

      service.viewAllGeneralServices().subscribe((services) => {
        expect(services.length).toEqual(2);
        expect(services).toEqual(mockServices);
      });
    });
  });

});

