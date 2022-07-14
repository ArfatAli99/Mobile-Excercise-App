import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gridView'
})
export class GridViewPipe implements PipeTransform {

  transform(value: any, size?: any): any {
  	const modules: any[] = [];
    const groupedElements:any = {};

   let counter=0;
   let index = 0;
    value.forEach((obj: any) => {
     if (counter%size==0) {
     	index++;
        groupedElements[index] = [];
      }
      groupedElements[index].push(obj);
      counter++;

    });

    for (let prop in groupedElements) {
      if (groupedElements.hasOwnProperty(prop)) {
        modules.push({
          row: prop,
          modules: groupedElements[prop]
        });
      }
    }
    console.log('modules:', modules);
    return modules;
  }

}
