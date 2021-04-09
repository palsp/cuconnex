/**
 * Technology interest Description
 */
export declare enum Technology {
    Coding = "Coding",
    WebBuilder = "Web Builder",
    ChatBot = "ChatBot",
    FinTech = "FinTech"
}
/**
 * Business interest Description
 */
export declare enum Business {
    Marketing = "Marketing",
    BusinessCase = "Business Case",
    Startup = "Startup",
    Ecommerce = "Ecommerce"
}
/**
 * Design interest description
 */
export declare enum Design {
    Graphic = "Graphic",
    UXUI = "UXUI",
    Ads = "Ads",
    Fashion = "Fashion"
}
export declare type Description = Technology | Design | Business;
/**
 * Description for interest database
 */
export declare const InterestDescription: {
    [key: string]: any;
};
