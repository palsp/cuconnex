import { Subjects } from '../subjects'
import { FriendStatus } from '../../db-status/friend'

export interface FriendUpdatedEvent {
    subject: Subjects.FriendUpdated;
    data: {
        sid: string;
        status: FriendStatus;
    }
}