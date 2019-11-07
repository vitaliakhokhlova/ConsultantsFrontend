
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

export abstract class ResourceWithDescription extends Resource{
    description: string;
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
        depth: number;
        forces?: Array<Force>;
        formations?: Array<HistoryObject>;
        competences?: Array<Competence>;
        langues?: Array<Competence>;
        parcours?: Array<HistoryObject>;
        projets?: Array<HistoryObject>; 

        deserialize(input: any): this {
           Object.assign(this, input);
           this.formations = input.formations.map(
               formation => new HistoryObject().deserialize(formation)
               );
           return this;
          }
}

export class Force extends Resource{
    name: string;
}

export class HistoryObject extends Resource{
    title: string;
    institution: string;
    place: string;
    dates: string;
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