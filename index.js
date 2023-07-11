const admin = require('firebase-admin');

// Initialize Firebase Admin SDK

var serviceAccount = require("C:/Users/Jerry/Desktop/Code/SendFirebaseAppNotification/privatekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();
const collectionRef = db.collection('users');

collectionRef.get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
     var userId =  data["id"]
      const docRef = db.collection('users').doc(userId);
      const unsubscribe = docRef.onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          const newToken = data["push_token"];
          // const newToken = "es9I8nWPQyCSy4yLdq4FZ_:APA91bFkz1aNMCwyKOahe8r9xZhBUq9TA-1c33SV8Z-uuwlGyNr-eK979ZnnuxcoGjG8w3SPOgghM0yyCIP9nL_z4JIvkNIv7irs9J9Nus5BZn0hhhBsU5_NISVqeHVtcKrURnzdX-pG";
          
          // const newToken = "f6m0zD0mRGO2ORLDSF0Sr2:APA91bGqnH2j-2OKz80nxl4HD0YhUmZpc28ceeUEAbjJyljw-xaa52G8wPD32kShnXkRLl3itMr55wJLyRKoBznmkT9d1QLtSO7VtBgl1uv55vKdOCjC75pw-cZTjZ2irEnFVeYlLD49";
          const name = data["name"];
          if(newToken !== ""){
          const message = {
            "token": newToken,
            "notification": {
              title: name,
              body: "Notification has been recieved by Kmv"
             }
          }
        
          admin.messaging().send(message).then(function(response){
            console.log("Successfully send message", response);
              const notificationData = {
                id: '12wr',
                user_id: userId,
                title: "Your order is delivered"
                // Add more key-value pairs as needed
              };
              // const colRef = db.collection('notifications');
              // colRef.add(notificationData)
              //   .then((docRefr) => {
              //     const documentId = docRefr.id;
              //     const updatedData = {
              //       id: documentId // Add the document reference ID to the data
              //     };
              
              //     // Update the document with the added reference ID
              //     docRefr.update(updatedData)
              //       .then(() => {
              //         console.log('Document added with ID and updated:', documentId);
              //       })
              //       .catch((error) => {
              //         console.error('Error updating document:', error);
              //       });

              //     console.log('Document written with ID:', docRefr.id);
              //   })
              //   .catch((error) => {
              //     console.error('Error adding document:', error);
              //   });
          }).catch(function(error){
            console.log("Error", error);    
          });
        }
          console.log('Document data:', data);
          // Perform desired actions with the updated document data
        } else {
          console.log('Document does not exist');
        }
      });
      // console.log('Document: id', d);
      // console.log('Document data:', data);
      // Perform desired actions with the document data
    });
  })
  .catch((error) => {
    console.log('Error getting documents:', error);
  });





























  
  // const docRef = db.collection('your_collection').doc('your_document');

// const unsubscribe = docRef.onSnapshot((snapshot) => {
//   if (snapshot.exists) {
//     const data = snapshot.data();
//     console.log('Document data:', data);
//     // Perform desired actions with the updated document data
//   } else {
//     console.log('Document does not exist');
//   }
// });
  // for single value
// const unsubscribe = docRef.onSnapshot((snapshot) => {
//   if (snapshot.exists) {
//     const data = snapshot.data();
//     console.log('Document data:', data);
//     // Perform desired actions with the updated data
//   } else {
//     console.log('Document does not exist');
//   }
// });
