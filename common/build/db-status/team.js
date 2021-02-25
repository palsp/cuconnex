'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TeamStatus = void 0;
var TeamStatus;
(function(TeamStatus) {
  // user already accept team invitation
  TeamStatus['Accept'] = 'Accept';
  // user reject team invitation
  TeamStatus['Reject'] = 'Reject';
  // already send teeam invitation but not yet ack
  TeamStatus['Pending'] = 'Pending';
})((TeamStatus = exports.TeamStatus || (exports.TeamStatus = {})));
