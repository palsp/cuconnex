import { EventStatus } from '../db-status/event';
import { Subjects } from './subjects';

export interface EventCreated {
    subject : Subjects.EventCreated,
    data : {
        id : number,
        "event-name" : string,
        registration : boolean,
        expirationDate : string,
        status : EventStatus
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



export interface EventExpirationStart {
    subject : Subjects.Expiration,
    data : {
        id : number,
        expirationDate: string
    }

}


export interface EventStarted {
    subject : Subjects.EventStarted,
    data : {
        id : number,
        startDate : string
    }
}


export interface EventCompleted {
subject : Subjects.EventCompleted,
    data : {
        id : number,
    }
}