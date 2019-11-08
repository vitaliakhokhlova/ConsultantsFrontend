
export interface Deserializable {
    deserialize(input: any): this;
  }

export class Resource implements Deserializable{
    id?: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
      }
  }

export class ResourceWithDescription extends Resource{
    description: string;
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
       }
}

export class Consultant extends Resource{     
        lastname: string;
        firstname: string;
        title?: string;
        birthday?: Date;
        expession?: string;
        author?: string;
        profile?: string;
        interests?: string;
        occupancy?: string;
        mobility?: string;
        forces?: Array<Force>;   
        competences?: Array<Competence>;
        langues?: Array<Competence>;
        formations?: Array<HistoryObject>;
        parcours?: Array<HistoryObjectWithChildren>;
        projets?: Array<HistoryObjectWithChildren>; 

        deserialize(input: any): this {
           Object.assign(this, input);
           if(input.formations){
           this.formations = input.formations.map(
                item => new HistoryObject().deserialize(item)
               );
           }
           if(input.parcours){
            this.parcours = input.parcours.map(
                item => new HistoryObjectWithChildren().deserialize(item)
            );
           }
           if(input.projets){
            this.projets = input.projets.map(
                item => new HistoryObjectWithChildren().deserialize(item)
                );
            }
           return this;
          }
}

export class Force extends Resource{
    name: string;
}

export class HistoryObject extends Resource{
    description: string;
    institution: string;
    place: string;
    dates: string;
    
}   

export class HistoryObjectWithChildren extends HistoryObject{
    details:  Array<ResourceWithDescription>;

    constructor(){
        super();
        this.details = new Array<ResourceWithDescription>();
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        if(input.details){
        this.details = input.details.map(
            item => new ResourceWithDescription().deserialize(item)
            );
        }
        return this;
       }
}


export class CompetenceGroup extends ResourceWithDescription{
    items: CompetenceItem[];
}

export class CompetenceItem extends ResourceWithDescription{
    items: Competence[];
}

export class Competence extends ResourceWithDescription{
    parent2: CompetenceItem;
    annee: number;
    contexte: string;
    interet: string;
    niveau: number;
    experience: number;
}