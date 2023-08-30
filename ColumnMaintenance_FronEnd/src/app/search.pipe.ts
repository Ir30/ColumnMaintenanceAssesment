import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor(){}

  transform(value:any,args: any): any {
    if(value.length===0 || args ===''){
      return value;
    }
    
    args = args.toLowerCase();

    const columns:any = []
    for(const column of value){
      if(column['name'].toLowerCase().includes(args)){
        columns.push(column)
      }
    }
    return columns
  }

}
