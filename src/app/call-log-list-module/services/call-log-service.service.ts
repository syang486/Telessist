import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CallLog } from '../model/callLog';


@Injectable({
  providedIn: 'root'
})
export class CallLogServiceService {

  callLogs: CallLog[] = [];
  callLogsGlobal: BehaviorSubject<Array<CallLog>>;

  constructor(private httpclientobj : HttpClient) { 
    this.callLogsGlobal = new BehaviorSubject<Array<CallLog>>([]);
  }

  fetchCallLogs(){
    return this.httpclientobj.get<Array<CallLog>>('http://localhost:8187/CallLogs')
  }

  getCallLogForCsrId(id:any){
    return this.httpclientobj.get<Array<CallLog>>('http://localhost:8187/CallLogs/callLogByCsrId/'+id)
  }

  getCallLogsByDate(startDate: Date,endDate:Date){
    return this.httpclientobj.get<Array<CallLog>>(`http://localhost:8187/CallLogs/viewCallLogByDate/${startDate}/${endDate}`);
  }

 

  deleteCallLog(id:any): Observable<any> {
    return this.httpclientobj.delete('http://localhost:8187/CallLogs/'+id).pipe(
      tap((res:any) => {
        let index = this.callLogs.findIndex(cl => cl.callLogId === id);
        this.callLogs.splice(index, 1);
        this.callLogsGlobal.next(this.callLogs);
        return this.callLogsGlobal;
      })
    )
  }

  updateCallLog(callLog: CallLog): Observable<any> {
    return this.httpclientobj.put<CallLog>('http://localhost:8187/CallLogs/'+ callLog.callLogId, callLog).pipe(
      tap((res:any) => {
        const existCallLog = this.callLogs.find(cl => cl.callLogId === callLog.callLogId)
        if(existCallLog){
          Object.assign(existCallLog, callLog);
        }
        this.callLogsGlobal.next(this.callLogs);
        return this.callLogsGlobal
      })
    )
  }

}
