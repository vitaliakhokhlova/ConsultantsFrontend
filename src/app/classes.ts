import { ConsultantdetailComponent } from "./consultantdetail/consultantdetail.component";

import {  propArray, prop, required } from '@rxweb/reactive-form-validators';  


export interface Deserializable {
    deserialize(input: any): this;
  }

export class Resource {
    @prop()
    id?: number = 0;

    // deserialize(input: any): this {
    //     Object.assign(this, input);
    //     return this;
    // }
  }

export class ResourceWithDescription extends Resource{
    @prop()
    description: string ="";

    // deserialize(input: any): this {
    //     Object.assign(this, input);
    //     return this;
    // }
}

export class HistoryObject extends Resource{
    @prop()
    description: string = "";
    @prop()
    institution: string = "";
    @prop()
    place: string = "";
    @prop()
    dates: string = ""; 
    @prop()
    pictogram: string = ""; 
}   

export class HistoryObjectWithChildren extends HistoryObject{
    @propArray()
    details:  Array<ResourceWithDescription> = new Array<ResourceWithDescription>();

    // deserialize(input: any): this {
    //     Object.assign(this, input);
    //     if(input.details){
    //     this.details = input.details.map(
    //         item => new ResourceWithDescription().deserialize(item)
    //         );
    //     }
    //     return this;
    //    }
}


export class ForceItem extends ResourceWithDescription{
    // deserialize(input: any): this {
    //     Object.assign(this, input);
    //     return this;
    // }
}

export class Force extends Resource{
    @prop()
    position: number = 0;
    @prop()
    parent2: ForceItem = new ForceItem();
}

export class LangueItem extends ResourceWithDescription{
    //items?: Langue[];
    addNew?: string;
}

export class Competence extends Resource{
    @prop()
    annee?: number = 0;
    contexte?: string;
    interet?: string;
    @prop()
    experience?: number = 0;
}

export class InformaticCompetence extends Resource{
    niveau: number;
    parent2: CompetenceItem;
}

export class Langue extends Competence{
    @prop()
    parent2: LangueItem = new LangueItem();
    @prop()
    niveau: string = "";
}


export class Consultant extends Resource{ 
        @prop() 
        photoname: string = ""; 
        @required()
        lastname: string = "";
        @required()
        firstname: string = "";
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

        @propArray()
        formations?: Array<HistoryObject> = new Array<HistoryObject>();
        @propArray()
        parcours?: Array<HistoryObjectWithChildren> = new Array<HistoryObjectWithChildren>();
        @propArray()
        projets?: Array<HistoryObjectWithChildren> = new Array<HistoryObjectWithChildren>(); 
        @propArray()
        forces?: Array<Force> = new Array<Force> ();   
        competences?: Array<InformaticCompetence> = Array<InformaticCompetence>();
        @propArray()
        langues?: Array<Langue> = Array<Langue>();
        // deserialize(input: any): this {
        //    Object.assign(this, input);
        //    if(input.formations){
        //    this.formations = input.formations.map(
        //         item => new HistoryObject().deserialize(item)
        //        );
        //    }
        //    if(input.parcours){
        //     this.parcours = input.parcours.map(
        //         item => new HistoryObjectWithChildren().deserialize(item)
        //     );
        //    }
        //    if(input.projets){
        //     this.projets = input.projets.map(
        //         item => new HistoryObjectWithChildren().deserialize(item)
        //         );
        //     }
        //     if(input.forces){
        //         this.forces = input.forces.map(
        //             item => new Force().deserialize(item)
        //             );
        //         }
        //     if(input.langues){
        //         this.langues = input.langues.map(
        //             item => new Langue().deserialize(item)
        //             );
        //         }
        //    return this;
        //   }
}

export class CompetenceGroup extends ResourceWithDescription{
    items?: CompetenceItem[];
}

export class CompetenceItem extends ResourceWithDescription{
    parent2: CompetenceGroup;
    items?: Array<InformaticCompetence>;
}

export class Factory {
    create<T>(type: (new () => T)): T {
        return new type();
    }
}