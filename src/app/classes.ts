import {  propArray, prop, required, maxLength, propObject, maxNumber, minNumber } from '@rxweb/reactive-form-validators';


export interface Deserializable {
    deserialize(input: any): this;
  }

export class Resource {
    @prop()
    id?: number = 0;
  }

export class ResourceWithDescription extends Resource{
    @required({message: "Obligatoire"})
    description: string ="";
}


export class CompetenceGroup extends ResourceWithDescription{
    items?: CompetenceItem[];
    deep_id?: number;
}

export class CompetenceItem extends ResourceWithDescription{
    @propObject()
    parent2?: CompetenceGroup = new CompetenceGroup();
}

export class HistoryObject extends Resource{
    @prop()
    @required({message: "Obligatoire"})
    description: string = "";
    @prop()
    institution: string = "";
    @prop()
    place: string = "";
    @prop()
    dates: string = "";
}

export class HistoryObjectWithChildren extends HistoryObject{
    @prop()
    pictogram: string = "";
    @propArray()
    details:  Array<ResourceWithDescription> = new Array<ResourceWithDescription>();
}


export class ForceItem extends ResourceWithDescription{
}

export class Force extends Resource{
    @prop()
    position: number = 0;
    @prop()
    parent2: ForceItem = new ForceItem();
}

export class LangueItem extends ResourceWithDescription{
    addNew?: string;
}

export class Competence extends Resource{
    @prop()
    annee?: number = 0;
    @prop()
    contexte?: string = '';
    @prop()
    interet?: string = '';
    @prop()
    experience?: number = 0;
}

export class InformaticCompetence extends Competence{
    @prop()
    @maxNumber({value:9 })
    @minNumber({value:0 })
    niveau: number = 0;
    @propObject()
    parent2: CompetenceItem = null;
    @propObject()
    parent: Consultant = null;
}

export class Langue extends Competence{
    @propObject()
    parent2: LangueItem = new LangueItem();
    @prop()
    @maxLength({value: 20, message: "20 symboles max"})
    @required({message: "Obligatoire"})
    niveau: string = "";
}


export class Consultant extends Resource{
        @prop()
        photoname?: string = "incognito.png";
        @required()
        lastname?: string = "";
        @required()
        firstname?: string = "";
        @prop()
        title?: string = "";
        @prop()
        birthday?: Date = new Date(1990, 0, 1);
        @prop()
        expression?: string = "";
        @prop()
        author?: string = "";
        @prop()
        profile?: string = "";
        @prop()
        interests?: string = "";
        @prop()
        occupancy?: string = "";
        @prop()
        mobility?: string = "";
        @prop()
        userpic?: File = null;

        @propArray()
        formations?: Array<HistoryObject> = new Array<HistoryObject>();
        @propArray()
        parcours?: Array<HistoryObjectWithChildren> = new Array<HistoryObjectWithChildren>();
        @propArray()
        projets?: Array<HistoryObjectWithChildren> = new Array<HistoryObjectWithChildren>();
        @propArray()
        forces?: Array<Force> = new Array<Force> ();
        @propArray()
        competences?: Array<InformaticCompetence> = Array<InformaticCompetence>();
        @propArray()
        langues?: Array<Langue> = Array<Langue>();
}



export class Factory {
    create<T>(type: (new () => T)): T {
        return new type();
    }
}
