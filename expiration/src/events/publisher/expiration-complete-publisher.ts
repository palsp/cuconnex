import { Subjects, ExpirationCompleteEvent, Publisher } from '@palspticket/common';



export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;
}