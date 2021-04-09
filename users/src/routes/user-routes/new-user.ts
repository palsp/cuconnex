import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { InterestDescription, validateRequest } from '@cuconnex/common';
import { User, Interest } from '../../models';
import { transformRequest } from '../../middlewares/middleware';
import { BadRequestError } from '@cuconnex/common';
import { upload } from '../../config/multer.config';
import { deleteFile } from '../../utils/file';

const router = express.Router();



const bodyChecker = [
  body('interests')
    .not()
    .isEmpty()
    .custom((input: { [key: string]: any }) => {
      // check for validity
      let valid = true;

      // check if key in interests filed is existed in InterestDescription
      for (let key in input) {
        valid = valid && (key in InterestDescription)

        if (input[key]) {
          valid = valid && Array.isArray(input[key])
        }
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
router.post('/api/users', upload.single('myFile'), transformRequest, bodyChecker, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
  const { interests, name, faculty } = req.body;
  // console.log(interests, name)
  let imagePath = "";
  if (req.file) {
    imagePath = req.file.path
  }

  // Make sure that user does not exist
  let user = await User.findOne({ where: { id: req.currentUser!.id } });
  if (user) {
    throw new BadRequestError('User already existed');
  }


  let createsuccess = false;
  // create users 

  try {

    user = await User.create({ id: req.currentUser!.id, name: name, faculty: faculty || "", image: imagePath });

    for (let category in interests) {
      console.log(category);
      // select only valid interest description 
      interests[category] = Interest.validateDescription(interests[category], Object.values(InterestDescription[category]));
      await user.addInterestFromArray(interests[category]);

    }

    createsuccess = true;

  } catch (err) {
    createsuccess = false;
  }

  if (!createsuccess && user) {
    await user.destroy();
    throw new BadRequestError('Create User Failed');
  }
  res.status(201).send({ id: user!.id, interests, image: user!.image });

});



export { router as newUserRouter };
