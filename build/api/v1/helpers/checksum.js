"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genchecksumforrefund = exports.verifychecksumbystring = exports.verifychecksum = exports.genchecksumbystring = exports.genchecksum = exports.paramsToString = void 0;
var crypt_1 = __importDefault(require("./crypt"));
var util_1 = __importDefault(require("util"));
var crypto_1 = __importDefault(require("crypto"));
//mandatory flag: when it set, only mandatory parameters are added to checksum
function paramsToString(params, mandatoryflag) {
    var data = "";
    var tempKeys = Object.keys(params);
    tempKeys.sort();
    tempKeys.forEach(function (key) {
        var n = params[key].includes("REFUND");
        var m = params[key].includes("|");
        if (n == true) {
            params[key] = "";
        }
        if (m == true) {
            params[key] = "";
        }
        if (key !== "CHECKSUMHASH") {
            if (params[key] === "null")
                params[key] = "";
            //@ts-ignore
            if (!mandatoryflag || mandatoryParams.indexOf(key) !== -1) {
                data += params[key] + "|";
            }
        }
    });
    return data;
}
exports.paramsToString = paramsToString;
function genchecksum(params, key, cb) {
    //@ts-ignore
    var data = paramsToString(params);
    crypt_1.default.gen_salt(4, function (err, salt) {
        var sha256 = crypto_1.default
            .createHash("sha256")
            .update(data + salt)
            .digest("hex");
        var check_sum = sha256 + salt;
        var encrypted = crypt_1.default.encrypt(check_sum, key);
        cb(undefined, encrypted);
    });
}
exports.genchecksum = genchecksum;
function genchecksumbystring(params, key, cb) {
    crypt_1.default.gen_salt(4, function (err, salt) {
        var sha256 = crypto_1.default
            .createHash("sha256")
            .update(params + "|" + salt)
            .digest("hex");
        var check_sum = sha256 + salt;
        var encrypted = crypt_1.default.encrypt(check_sum, key);
        var CHECKSUMHASH = encodeURIComponent(encrypted);
        CHECKSUMHASH = encrypted;
        cb(undefined, CHECKSUMHASH);
    });
}
exports.genchecksumbystring = genchecksumbystring;
function verifychecksum(params, key, checksumhash) {
    var data = paramsToString(params, false);
    //TODO: after PG fix on thier side remove below two lines
    if (typeof checksumhash !== "undefined") {
        checksumhash = checksumhash.replace("\n", "");
        checksumhash = checksumhash.replace("\r", "");
        var temp = decodeURIComponent(checksumhash);
        var checksum = crypt_1.default.decrypt(temp, key);
        var salt = checksum.substr(checksum.length - 4);
        var sha256 = checksum.substr(0, checksum.length - 4);
        var hash = crypto_1.default
            .createHash("sha256")
            .update(data + salt)
            .digest("hex");
        if (hash === sha256) {
            return true;
        }
        else {
            util_1.default.log("checksum is wrong");
            return false;
        }
    }
    else {
        util_1.default.log("checksum not found");
        return false;
    }
}
exports.verifychecksum = verifychecksum;
function verifychecksumbystring(params, key, checksumhash) {
    var checksum = crypt_1.default.decrypt(checksumhash, key);
    var salt = checksum.substr(checksum.length - 4);
    var sha256 = checksum.substr(0, checksum.length - 4);
    var hash = crypto_1.default
        .createHash("sha256")
        .update(params + "|" + salt)
        .digest("hex");
    if (hash === sha256) {
        return true;
    }
    else {
        util_1.default.log("checksum is wrong");
        return false;
    }
}
exports.verifychecksumbystring = verifychecksumbystring;
function genchecksumforrefund(params, key, cb) {
    //@ts-ignore
    var data = paramsToStringrefund(params);
    crypt_1.default.gen_salt(4, function (err, salt) {
        var sha256 = crypto_1.default
            .createHash("sha256")
            .update(data + salt)
            .digest("hex");
        var check_sum = sha256 + salt;
        var encrypted = crypt_1.default.encrypt(check_sum, key);
        params.CHECKSUM = encodeURIComponent(encrypted);
        cb(undefined, params);
    });
}
exports.genchecksumforrefund = genchecksumforrefund;
function paramsToStringrefund(params, mandatoryflag) {
    var data = "";
    var tempKeys = Object.keys(params);
    tempKeys.sort();
    tempKeys.forEach(function (key) {
        var m = params[key].includes("|");
        if (m == true) {
            params[key] = "";
        }
        if (key !== "CHECKSUMHASH") {
            if (params[key] === "null")
                params[key] = "";
            //@ts-ignore
            if (!mandatoryflag || mandatoryParams.indexOf(key) !== -1) {
                data += params[key] + "|";
            }
        }
    });
    return data;
}
