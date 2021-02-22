export enum FriendStatus {
    // No relation yet
    toBeDefined = "toBedefined",

    // user already accept friend request
    Accept = "Accept",

    // user reject friend request
    Reject = "Reject",

    // already send friend request but not yet ack
    Pending = "Pending",
}