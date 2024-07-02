import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientsearch'
})
export class ClientsearchPipe implements PipeTransform {

  transform(obs: any, searchText: any): any {
    if(searchText == null) {
      return obs;
    }

    return obs.filter((c:any) => c.userName.toLowerCase().includes(searchText.toLowerCase()) || c.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
    c.lastName.toLowerCase().includes(searchText.toLowerCase()));
  }

}
