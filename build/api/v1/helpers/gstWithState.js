"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GstWithStart = {
    "10": "bihar",
    "11": "sikkim",
    "12": "arunachal pradesh",
    "13": "nagaland",
    "14": "manipur",
    "15": "mizoram",
    "16": "tripura",
    "17": "meghalaya",
    "18": "assam",
    "19": "west bengal",
    "20": "jharkhand",
    "21": "odisha",
    "22": "chattisgarh",
    "23": "madhya pradesh",
    "24": "gujrat",
    "26": "daman and diu",
    "27": "maharashtra",
    "29": "karnataka",
    "30": "goa",
    "32": "kerela",
    "33": "tamil nadu",
    "34": "pudducherry",
    "36": "telangana",
    "37": "andhra pradesh",
    "38": "ladakh",
    "04": "chandigarh",
    "07": "rajasthan",
    "06": "haryana",
    "02": "himachal pradesh",
    "01": "jammu and kashmir",
    "03": "punjab",
    "09": "uttar pradesh",
    "05": "uttrakhand",
};
function getStateByGstNumber(value) {
    var start = value.substring(0, 2);
    return GstWithStart[start];
}
exports.default = getStateByGstNumber;
