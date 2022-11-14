"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NotificationType;
(function (NotificationType) {
    NotificationType["Assigned"] = "assigned";
    NotificationType["CreateTask"] = "create task";
    NotificationType["Declined"] = "declined";
    NotificationType["completed"] = "completed";
    NotificationType["Initiated"] = "initiated";
    NotificationType["FileAdded"] = "file added";
    NotificationType["HolidayAdded"] = "holiday added";
    NotificationType["HolidayRemoved"] = "holiday removed";
    NotificationType["HolidayApproved"] = "holiday approved";
    NotificationType["HolidayDeny"] = "holiday denied";
    NotificationType["HolidayRequest"] = "holiday request";
})(NotificationType || (NotificationType = {}));
exports.default = NotificationType;
