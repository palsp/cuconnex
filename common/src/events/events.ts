import { Subjects } from './subjects';

export interface EventCreated {
    subject : Subjects.EventCreated,
    data : {
        id : number,
        "event-name" : string,
        registration : boolean,
        endDate : string,
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

export interface EventEnd {
    subject : Subjects.EventEnded,
    data : {
        id : number,
    }
}