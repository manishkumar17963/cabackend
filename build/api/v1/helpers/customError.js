"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(errorType, status) {
        if (errorType === void 0) { errorType = "Generic"; }
        if (status === void 0) { status = 500; }
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        var _this = _super.apply(this, params) || this;
        _this.errorType = errorType;
        _this.status = status;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, CustomError);
        }
        _this.errorType = errorType;
        _this.status = status;
        _this.name = "ClientError";
        return _this;
    }
    return CustomError;
}(Error));
exports.default = CustomError;
