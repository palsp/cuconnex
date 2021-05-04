import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '@cuconnex/common';
import { Team, Event } from '../models';
import { IGetRegisterTeamResponse, ITeamResponse } from '../interfaces';

export const getRegisteredTeams = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  const event = await Event.findOne({ where: { id: eventId } });
  if (!event) {
    throw new NotFoundError('Event');
  }

  const teams: Team[] = await event.getMyCandidates();
  const response: IGetRegisterTeamResponse = {
    teams : teams.map(team => team.toJSON())
  };

  // for (let team of teams) {
  //   response.push(team.toJSON());
  // }
  
  res.status(200).send(response);
};
