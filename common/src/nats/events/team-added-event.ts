import { Subjects } from '../subjects'

export interface TeamAddedEvent {
    subject: Subjects.TeamAdded;
    data: {
        sid: string[];
    }
}