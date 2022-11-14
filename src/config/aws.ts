import AWS from "aws-sdk";
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: "ap-south-1",
  endpoint: "s3-ap-south-1.amazonaws.com",
});

export default s3;
