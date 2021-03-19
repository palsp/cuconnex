import { InterestDescription } from '@cuconnex/common'

import { Interest } from './interest.model'

// startInterest create interests for the first time
export const startInterest = async () => {
    for (let interest of Object.values(InterestDescription)) {
        // Create entitiy in interest's database
        await Interest.create({ description: interest })
    }
}

