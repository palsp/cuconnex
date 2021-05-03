import { Subjects, EventEnd, Publisher } from '@cuconnex/common';



export class EventEndPub extends Publisher<EventEnd>{
    readonly subject = Subjects.EventEnded;
}