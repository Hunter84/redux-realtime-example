const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.getTimer = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // your function body here - use the provided req and res from cors
    admin.database().ref('timerAnalytics').get().then((snapshot) => {
      const data = snapshot.val();
      if (!data) {
        admin.database().ref('timerAnalytics').set({
          timerRetrievedCount: 1
        });
      } else {
        admin.database().ref('timerAnalytics').update({
          timerRetrievedCount: parseInt(data.timerRetrievedCount || 0) + 1
        });
      }
    })

    admin.database().ref('timer').get().then((snapshot) => {

      response.send(JSON.stringify(snapshot.val() || {count: 0}));
    }).catch((error) => {
      functions.logger.error(error);
      response.send({count: 0});
    })
  })
});

exports.onTimerRetrieved = functions.database.ref('timer').onWrite((snapshot, context) => {
  admin.database().ref('timerAnalytics').get().then((snapshot) => {
    const data = snapshot.val();
    if (!data) {
      admin.database().ref('timerAnalytics').set({
        timerUpdatedCount: 1
      });
    } else {
      admin.database().ref('timerAnalytics').update({
        timerUpdatedCount: parseInt(data.timerUpdatedCount || 0) + 1
      });
    }
  }).catch((error) => {
    functions.logger.error(error);
  })
});
