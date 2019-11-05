export abstract class Resource {
    id?: number
  }

export abstract class ResourceWithDescription extends Resource{
    description: string;
}

export class Consultant extends Resource{      
        lastname: string;
        firstname: string;
        title?: string;
        forces?: Array<Force>;
        birthday?: Date;
        expession?: string;
        author?: string;
        profile?: string;
        interests?: string;
        occupancy?: string;
        mobility?: string;
        formations?: Array<Formation>;
        competences?: Array<Competence>;
}

export class Force extends Resource{
    name: string
}

export class Formation extends Resource{
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