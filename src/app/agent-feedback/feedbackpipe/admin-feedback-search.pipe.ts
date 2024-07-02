import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminFeedbackSearch'
})
export class AdminFeedbackSearchPipe implements PipeTransform {

  transform(obs:any, searchText:any): any {
    if(searchText == null || searchText == "") {
      return obs;
    }
    return obs.filter((f:any) => f.agentId.toLowerCase().includes(searchText.toLowerCase()));
  }

}
