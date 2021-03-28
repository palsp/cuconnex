import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { InterestDescription, validateRequest } from '@cuconnex/common';
import { Interest } from '../../models/interest.model'
import { User } from '../../models/user.model';
import { BadRequestError } from '@cuconnex/common';

const router = express.Router();

const bodyChecker = [
  body('interests')
    .not()
    .isEmpty()

    .custom((input: Object) => {

      // check for validity
      let valid = true;

      // check if key in interests filed is existed in InterestDescription
      for (let key in input) {
        valid = valid && (key in InterestDescription)
      }

      // expect valid to be true so the process continue
      return valid
    })
    .withMessage('Valid interest must be provided'),
  body('name')
    .notEmpty()
    .withMessage('Name must be supplied')
];

// create user for first time login
router.post('/api/users', bodyChecker, validateRequest, async (req: Request, res: Response) => {
  const { interests, name, faculty } = req.body;

  for (let category in interests) {
    // select only valid interest description 
    interests[category] = Interest.validateDescription(interests[category], Object.values(InterestDescription[category]));
  }

  console.log(interests);
  // Make sure that user does not exist
  // let user = await User.findOne({ where: { id: req.currentUser!.id } });
  // if (user) {
  //   throw new BadRequestError('User already existed');
  // }



  // res.status(201).send({ id: user!.id, interests: uniqueInterests });
  res.status(201).send({});
});

export { router as newUserRouter };
