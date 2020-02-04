import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
    transform(collection: FormGroup[], property: string, subproperty: string): any[] 
    {
        // prevents the application from breaking if the array of objects doesn't exist yet        
        if(!collection) {
            return null;
        }

        const groupedCollection = collection.reduce(
            (previous, current) => 
            {
                const currentValue = this.getNavigationPropertyValue(current, property, subproperty);
                if (!previous[currentValue.key]) 
                {
                    previous[currentValue.key] = [currentValue.value];
                } 
                else 
                {
                    previous[currentValue.key].push(currentValue.value);
                }
                
                return previous;
            }, 
            {}
        );
        console.log(groupedCollection);
        // this will return an array of objects, each object containing a group of objects
        return Object.keys(groupedCollection).map(
            key => ({ key, value: groupedCollection[key] }));
    }
        
    getNavigationPropertyValue(current: FormGroup, property: string, subproperty: string): any 
    {       
        if (current == null) 
        {
            return property;
        }
        return { value: current, 
            key: (<FormGroup>current.controls[property]).controls['id'].value };
    }
}