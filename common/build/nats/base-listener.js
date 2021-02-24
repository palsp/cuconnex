"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
var Listener = /** @class */ (function () {
    function Listener(client) {
        this.ackWait = 5 * 1000;
        this.client = client;
    }
    Listener.prototype.subScriptionOptions = function () {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    };
    Listener.prototype.listen = function () {
        var _this = this;
        var subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subScriptionOptions());
        subscription.on('message', function (msg) {
            console.log("Message received " + _this.subject + " / " + _this.queueGroupName + " ");
            var parseData = _this.parseMessage(msg);
            _this.onMessage(parseData, msg);
        });
    };
    Listener.prototype.parseMessage = function (msg) {
        var data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf-8'));
    };
    return Listener;
}());
exports.Listener = Listener;
