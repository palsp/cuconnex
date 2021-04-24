// import express, { Request, Response, NextFunction } from 'express';
// import { requireUser } from '../../middlewares';
// import { Member } from '../../models';

// import { validateRequest, TeamStatus, } from '@cuconnex/common';

// const router = express.Router();

// router.get(
//   '/api/users/notification/invite',
//   requireUser,
//   validateRequest,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const user = req.user!;

//       const invitations = await Member.findAll({
//         where: { userId: user.id, status: TeamStatus.Pending },
//       });

//       if (!invitations || invitations.length === 0) {
//         // 204 === no content
//         return res.status(204).send({ message: 'No invitaions', teams: [] });
//       }

//       var teams = [];
//       for (let i = 0; i < invitations.length; i++) {
//         teams.push(invitations[i].teamName);
//       }

//       res.status(200).send({ message: 'Invitation(s) is/are from these teams.', teams: teams });
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// export { router as notificationUserRouter };
