import { InterestDescription, Description } from '@cuconnex/common'
import { Category } from './category.model'

/**
 *  startInterest create interests for the first time
 */
export const startDB = async () => {
    await createCategory();
}

const createCategory = async () => {
    for (let category in InterestDescription) {
        // create entry for each category
        const cat = await Category.create({ category });

        await createInterest(cat, Object.values(InterestDescription[category]));

    }
}


const createInterest = async (category: Category, interests: Description[]) => {

    for (let interest of interests) {
        await category.createInterestToCategory({
            description: interest
        });
    }

}

