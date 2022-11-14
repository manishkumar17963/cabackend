import webpush, { PushSubscription } from "web-push";

webpush.setVapidDetails(
  "mailto:manishkumar17963@gmail.com",
  "BGnkaXDSgPnvw7D0wT3qmdOYlI_439qcz-_MiCZ_AAChFHC2vfSi3u6Gmm35YTvW8Ykz2GB2Am7GV6yXoKFzuzE",
  process.env.WEBPUSH_PRIVATEKEY!
);
export const Options = {
  vapidDetails: {
    subject: "mailto:manishkumar17963@gmail.com",
    publicKey:
      "BGnkaXDSgPnvw7D0wT3qmdOYlI_439qcz-_MiCZ_AAChFHC2vfSi3u6Gmm35YTvW8Ykz2GB2Am7GV6yXoKFzuzE",
    privateKey: process.env.WEBPUSH_PRIVATEKEY!,
  },
};
export default webpush;
