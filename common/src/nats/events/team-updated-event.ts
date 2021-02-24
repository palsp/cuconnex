import { Subjects } from '../subjects'
import { TeamStatus } from '../../db-status/team'

export interface TeamUpdatedEvent {
    subject: Subjects.TeamUpdated;
    data: {
        sid: string;
        status: TeamStatus
    }
}