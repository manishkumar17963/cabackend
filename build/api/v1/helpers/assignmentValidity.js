"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
function checkValidity(startTime, endTime, employee) {
    var invalid = employee.schdule.some(function (meetingTime) {
        var firstCheck = moment_1.default(meetingTime.startTime).isBefore(startTime) &&
            moment_1.default(meetingTime.endTime).isAfter(startTime);
        var secondCheck = moment_1.default(meetingTime.startTime).isBefore(endTime) &&
            moment_1.default(meetingTime.endTime).isAfter(endTime);
        var thirdCheck = moment_1.default(meetingTime.startTime).isAfter(startTime) &&
            moment_1.default(meetingTime.startTime).isBefore(endTime);
        return firstCheck || secondCheck || thirdCheck;
    });
    return invalid;
}
exports.default = checkValidity;
