"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
var web_push_1 = __importDefault(require("web-push"));
web_push_1.default.setVapidDetails("mailto:manishkumar17963@gmail.com", "BGnkaXDSgPnvw7D0wT3qmdOYlI_439qcz-_MiCZ_AAChFHC2vfSi3u6Gmm35YTvW8Ykz2GB2Am7GV6yXoKFzuzE", process.env.WEBPUSH_PRIVATEKEY);
exports.Options = {
    vapidDetails: {
        subject: "mailto:manishkumar17963@gmail.com",
        publicKey: "BGnkaXDSgPnvw7D0wT3qmdOYlI_439qcz-_MiCZ_AAChFHC2vfSi3u6Gmm35YTvW8Ykz2GB2Am7GV6yXoKFzuzE",
        privateKey: process.env.WEBPUSH_PRIVATEKEY,
    },
};
exports.default = web_push_1.default;
