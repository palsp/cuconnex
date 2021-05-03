import { Subjects, EventCompleted, Publisher } from '@cuconnex/common';



export class EventCompletedPub extends Publisher<EventCompleted>{
    readonly subject = Subjects.EventCompleted;
}