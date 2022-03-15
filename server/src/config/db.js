var admin = require("firebase-admin");

try {
// feeedback - attemtping db connection
console.log('Attempting db connection...')

//imports db admin module (main server side library)
var serviceAccount = require("./serviceAccountKey.json");


//configures db w our credentials and storage details (image storing)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "foodie-bb739.appspot.com"
});

//feedback: notify db connection succesful
console.log('Connected to the database');

//store core db functions in variable object
const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, bucket };
} catch(error) {
    console.log(error);
}