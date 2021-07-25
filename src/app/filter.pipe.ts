import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'abc'
})
export class FilterPipe implements PipeTransform {

  constructor(private sequir:SecurityContext, private sanitizer:DomSanitizer){}
  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

   // return value.applyFilter(function(data:any){
     //   return JSON.stringify(data).toLowerCase().includes(args);
   // });
   const h1 = document.createElement('h1');
   h1.innerHTML = this.sanitizer.sanitize(
     SecurityContext.NONE,
     "<h1>jhabsdjhvabfdjh</h1>"
   )as string;
   h1.className = 'info-icon'
   return h1;
   
}

}
