import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { InterestDescription, validateRequest } from '@cuconnex/common';
import { User, Interest } from '../../models';
import { requireFile } from '../../middlewares';
import { BadRequestError } from '@cuconnex/common';
import { upload } from '../../config/multer.config';

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
router.post('/api/users', /*bodyChecker, validateRequest,*/ upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
  const { interests, name, faculty } = req.body;
  console.log(JSON.parse(interests));
  const file = req.file;


  // // Make sure that user does not exist
  let user = await User.findOne({ where: { id: req.currentUser!.id } });
  if (user) {
    throw new BadRequestError('User already existed');
  }


  let createsuccess = false;
  // create users 

  try {
    if (file) {
      user = await User.create({ id: req.currentUser!.id, name, faculty: faculty || "", image: file!.path })
    }
    user = await User.create({ id: req.currentUser!.id, name, faculty: faculty || "", image: '' });

    for (let category in interests) {
      // 
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
  res.status(201).send({ id: user!.id, interests });

});

// /*TODO: remove this route after development, it's only for testing that uploading file works */
router.post('/api/upload', upload.single('myFile'), requireFile, async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;
  console.log('req.body: ', req.body.name)
  console.log(file);
  res.status(200).json("You've successfully uploaded the file: " + file.originalname + " It is now stored as " + file.filename);

})

export { router as newUserRouter };
