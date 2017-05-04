

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'companieFilter'
})

export class CompanieFilterPipe implements PipeTransform {
    transform(items: any[], args: string): any {
      //  console.log(items)
        console.log(args)
        let returnItems = []
        items.forEach((item) => {
          let str1 = item.profile.name.toLowerCase()
          let str2 = args.toLowerCase()
          if(str1.includes(str2))
            returnItems.push(item)
        })
        return returnItems
    }
}
