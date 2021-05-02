import { Subjects } from './subjects';

export interface EventCreated {
    subject : Subjects.EventCreated,
    data : {
        id : number,
        "event-name" : string,
        registration : boolean,
    }
}

export interface EventUpdated {
    subject : Subjects.EventUpdated,
    data : {
        id : number,
        "event-name" : string,
        registration : boolean,
        version : number,        
    }
}