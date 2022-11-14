import admin from "firebase-admin";

var serviceAccount = require("../../../accounts/firebaseEmployeeAccount.json");

const employeeApp = admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
  },
  "employee"
);

export default employeeApp;
