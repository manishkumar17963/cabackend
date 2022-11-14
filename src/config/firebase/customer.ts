import admin from "firebase-admin";

var serviceAccount = require("../../../accounts/firebaseCustomerAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
