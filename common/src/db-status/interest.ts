// export enum InterestDescription {
//     Developer = "Developer",
//     Startup = "Startup",
//     Business = "Business",
// }

/**
 * Technology interest Description
 */
export enum Technology {
    Coding = "Coding",
    WebBuilder = "Web Builder",
    ChatBot = "ChatBot",
    FinTech = "FinTech"
}

/**
 * Business interest Description
 */
export enum Business {
    Marketing = "Marketing",
    BusinessCase = "Business Case",
    Startup = "Startup",
    Ecommerce = "Ecommerce",
}

/**
 * Design interest description
 */
export enum Design {
    Graphic = "Graphic",
    UXUI = "UXUI",
    Ads = "Ads",
    Fashion = "Fashion",
}


export type Description = Technology | Design | Business;

/**
 * Description for interest database
 */
export const InterestDescription: { [key: string]: any } = {
    "Business": Business,
    "Technology": Technology,
    "Design": Design,
}

let desc: any[] = [];

for (let key in InterestDescription) {
    const interest = Object.values(InterestDescription[key]);
    desc = desc.concat(interest)
}

console.log(desc);

