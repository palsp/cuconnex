import { Request, Response } from 'express';
import { NotFoundError, BadRequestError, InterestDescription } from '@cuconnex/common';
import { User, Interest, UserInterest, Category } from '../models'

/**
 * get current user profile
 * @param req 
 * @param res 
 * @returns 
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        return res.redirect('/userInfo');
    }

    const interests = await req.user.getInterests({ attributes: ['description'] });
    res.status(200).send({ id: req.user.id, name: req.user.name, interests, image: req.user.image });
};

/**
 * View other users profile
 * @param req 
 * @param res 
 * @returns 
 */
export const viewUserProfile = async (req: Request, res: Response): Promise<void> => {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
        throw new NotFoundError();
    }

    const interests = await UserInterest.findAll({ where: { userId: user.id } });
    if (!interests) {
        console.log(interests);
    }

    const status = await user.findRelation(req.user!.id);

    res.status(200).send({ id: user.id, name: user.name, interests, status, image: user.image });
}

/**
 * create user for first time login
 * @param req 
 * @param res 
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
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
}

export const getInterest = async (req: Request, res: Response): Promise<void> => {
    // const interests = await Interest.findAll();
    // if (!interests) {
    //     console.log(interests);
    // }

    const categories = await Category.findAll({ include: "interests" })

    const response = categories.map(category => {
        return {
            category: category.category,
            interests: category.interests?.map(interest => interest.serializer())
        }
    })


    res.status(200).send({ interests: response });

}