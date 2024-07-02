import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agentFeedbackSearch'
})
export class AgentFeedbackSearchPipe implements PipeTransform {

  transform(obs:any, searchDate:any): any {
    if(searchDate == null || searchDate == "") {
      return obs
    }
    return obs.filter((f:any) => new Date(f.feedbackDate).getDay() == searchDate.getDay() && new Date(f.feedbackDate).getMonth() == searchDate.getMonth() && 
      new Date(f.feedbackDate).getFullYear() == searchDate.getFullYear());
  }

}
