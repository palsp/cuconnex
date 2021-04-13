import express, { NextFunction, Request, Response } from 'express';
import { InterestDescription, validateRequest } from '@cuconnex/common';
import { User, Interest } from '../../models';
import { transformRequest } from '../../middlewares/middleware';
import { BadRequestError } from '@cuconnex/common';
import { upload } from '../../config/multer.config';
import { postUserValidator } from '../../utils/validators';

const router = express.Router();


// create user for first time login
router.post('/api/users', upload.single('myFile'), transformRequest, postUserValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
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
      // select only valid interest description 
      interests[category] = Interest.validateDescription(interests[category], Object.values(InterestDescription[category]));
      await user.addInterestFromArray(interests[category]);

    }

    createsuccess = true;

  } catch (err) {
    createsuccess = false;
  }

  // destroy the created resource if something goes wrong
  if (!createsuccess && user) {
    await user.destroy();
    throw new BadRequestError('Create User Failed');
  }
  res.status(201).send({ id: user!.id, interests, image: user!.image });

});



export { router as newUserRouter };
