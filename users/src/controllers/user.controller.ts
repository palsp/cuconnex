import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { NotFoundError, BadRequestError, InterestDescription, currentUser } from '@cuconnex/common';
import { User, Team, Interest } from '../models'
import { deleteFile } from '../utils/file';
import { IFindRelationResponse, IUserResponse, IViewProfileResponse } from '../interfaces';
//Test for empty object
function isEmpty(obj: Object) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
function isNull(obj: Object){
    Object.keys(obj).map(key => {
        if(!key) return false;
    })
    return true;
}

/**
 * get current user profile
 * @param req 
 * @param res 
 * @returns 
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(302).send({});
        return
    }

    const response: IUserResponse = req.user.toJSON();
    res.status(200).send(response);
};

/**
 * View other users profile
 * @param req 
 * @param res 
 * @returns 
 */
export const viewUserProfile = async (req: Request, res: Response): Promise<void> => {

    const user = await User.fetchUser(req.params.userId);

    if (!user) {
        throw new NotFoundError();
    }


    const status = await user.findRelation(req.user!.id);

    const response: IViewProfileResponse = {
        ...user.toJSON(),
        status,
    }
    res.status(200).send(response);
}

/**
 * create user for first time login
 * @param req 
 * @param res 
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { interests, name, faculty, year, major, bio } = req.body;
    // console.log(interests, name)
    let imagePath = "";
    if (req.file) {
        imagePath = req.file.path
        if (req.file.size > 1024 * 1024 * 1024) {
            deleteFile(imagePath);
            throw new BadRequestError("Max File Size Exceeded!! Max file size is 1 GB");
        }
    }

    if (year) {
        const pattern = /^[1-4]$/
        if (!pattern.test(year)) {
            throw new BadRequestError('Year must be valid')
        }
    }

    // Make sure that user does not exist
    let user = await User.findOne({ where: { id: req.currentUser!.id } });
    if (user) {
        throw new BadRequestError('User already existed');
    }


    let createsuccess = false;
    // create users 

    try {
        user = await User.create({ id: req.currentUser!.id, name, faculty, year, major, bio, image: imagePath });
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

    const response: IUserResponse = {
        ...user!.toJSON(),
        interests
    }

    res.status(201).send(response);
}

export const search = async (req: Request, res: Response) => {
    const keyword = req.query.keyword
    const userConstraint = [
        { name: { [Op.startsWith]: keyword } },
        { id: { [Op.startsWith]: keyword } },
    ];

    /**
   * TODO: add role and lookingformember keyword for team search
   */
    const teamConstraint = { name: { [Op.startsWith]: keyword } };


    let users: User[];
    let team: Team[];
    try {
        users = await User.findAll({ where: { [Op.or]: userConstraint }, include: 'interests' });
        team = await Team.findAll({ where: teamConstraint });
    } catch (err) {
        console.log(err);
    }

    res.status(200).send({
        users: users! || [],
        team: team! || [],
    });
}

export const findRelation = async (req: Request, res: Response) => {
    if (!req.params.userId) {
        throw new NotFoundError();
    }

    const conn = await User.findOne({ where: { id: req.params.userId } })
    if (!conn) {
        throw new NotFoundError();
    }

    const relation = await req.user!.findRelation(req.params.userId)

    const response: IFindRelationResponse = {
        status: relation
    }
    res.status(200).send(response);
}

/**
 * Method for editing any field of the user with the specified id.
 * Expects req.body to have a user object
 * If all checks pass, will update User with the fields specified
 * Then sends 200 alongside the newly updated user object.
 * @param req 
 * @param res 
 */
export const editUser = async (req: Request, res: Response) => {
    if(!req.currentUser!.id) throw new BadRequestError("Please enter a user ID!");
    const user = await User.findOne({ where: { id: req.currentUser!.id } });
    if(!user) throw new NotFoundError();
    let imagePath = "";
    if (req.file) {
        imagePath = req.file.path
        if (req.file.size > 1024 * 1024 * 1024) {
            deleteFile(imagePath);
            throw new BadRequestError("Max File Size Exceeded!! Max file size is 1 GB");
        }
    }
 
    //if(isEmpty(req.body)) throw new BadRequestError("Empty request!");
    if (req.body.year) {
        const pattern = /^[1-4]$/
        if (!pattern.test(req.body.year)) {
            throw new BadRequestError('Year must be valid')
        }
    }

    User.update(
        { 
            name: req.body.name || user.name, 
            bio: req.body.bio || user.bio,
            faculty: req.body.faculty || user.faculty,
            interests: req.body.interests || user.interests,
            year: req.body.year || user.year,
            major: req.body.major || user.major,
            lookingForTeam: req.body.lookingForTeam || user.lookingForTeam,
            image: imagePath || user.image
        },
        { where: { id: req.params.userId } }
    )
        .then(async (rowsUpdated) => {
            console.log(rowsUpdated)
            let user = await User.findOne({ where: { id: req.currentUser!.id }})
            res.status(200).send(user)
        })
        .catch((err) => { 
            console.log(err.message)
            res.status(500).send(err.message);
        })
}
