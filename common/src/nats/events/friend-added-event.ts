import { Subjects } from '../subjects'

export interface FriendAddedEvent {
    subject: Subjects.FriendAdded;
    data: {
        sid: string;
    }
}