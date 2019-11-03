export abstract class Resource {
    id: number
  }

export class Consultant extends Resource{      
        lastname?: string;
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