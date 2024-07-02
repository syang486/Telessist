import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { EquipmentManagementServiceService } from './equipment-management-service.service';

describe('EquipmentManagementServiceService', () => {
  let service: EquipmentManagementServiceService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[EquipmentManagementServiceService]
    });
    service = TestBed.inject(EquipmentManagementServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new equipment', async(inject([HttpTestingController, EquipmentManagementServiceService], (httpClient:HttpTestingController, service:EquipmentManagementServiceService)=>{
    const equip = {
      "equipmentId":"2478ee7a-6039-44c2-a4ee-299de0538295",
      "equipmentModel":"IPhone 23",
      "equipmentType":"Mobile",
      "equipmentPrice":1234.45
    }
  service.saveEquipment(equip).subscribe(res=>{
    expect(res).toBe(equip);
  })
  let req = httpMock.expectOne('http://localhost:9091/api/telessist/admin/addEquipment');
  expect(req.request.method).toBe("POST");
  req.flush(equip);
  httpMock.verify();
  })))

  it('should update the equipment', async(inject([HttpTestingController, EquipmentManagementServiceService], (httpClient:HttpTestingController, service:EquipmentManagementServiceService)=>{
    const equip = {
      "equipmentId":"2478ee7a-6039-44c2-a4ee-299de0538295",
      "equipmentModel":"IPhone 23",
      "equipmentType":"Mobile",
      "equipmentPrice":1234.45
    }
  service.updateEquipment(equip).subscribe(res=>{
    expect(res).toBe(equip);
  })
  let req = httpMock.expectOne('http://localhost:9091/api/telessist/admin/updateEquipment');
  expect(req.request.method).toBe("PUT");
  req.flush(equip);
  httpMock.verify();
  })))

  it('should delete the equipment', async(inject([HttpTestingController, EquipmentManagementServiceService], (httpClient:HttpTestingController, service:EquipmentManagementServiceService)=>{
    const equip = {
      "equipmentId":"2478ee7a-6039-44c2-a4ee-299de0538295",
      "equipmentModel":"IPhone 23",
      "equipmentType":"Mobile",
      "equipmentPrice":1234.45
    }
  service.deleteEquipment("2478ee7a-6039-44c2-a4ee-299de0538295").subscribe(res=>{
    expect(res).toBe(equip);
  })
  let req = httpMock.expectOne('http://localhost:9091/api/telessist/admin/deleteEquipment/2478ee7a-6039-44c2-a4ee-299de0538295');
  expect(req.request.method).toBe("DELETE");
  req.flush(equip);
  httpMock.verify();
  })))

});
