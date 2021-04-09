"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendStatus = void 0;
var FriendStatus;
(function (FriendStatus) {
    // No relation yet
    FriendStatus["toBeDefined"] = "toBedefined";
    // user already accept friend request
    FriendStatus["Accept"] = "Accept";
    // user reject friend request
    FriendStatus["Reject"] = "Reject";
    // already send friend request but not yet ack
    FriendStatus["Pending"] = "Pending";
})(FriendStatus = exports.FriendStatus || (exports.FriendStatus = {}));
