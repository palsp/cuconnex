import { Subjects } from './subjects';

export interface EventCreated {
    subject : Subjects.EventCreated,
    data : {
        id : number,
        "event-name" : string,
        registration : boolean,
    }
}