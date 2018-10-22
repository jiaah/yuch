import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB7fhXy5536xHsYgGRrL_PLC83Cu3LBpEw',
  authDomain: 'yuch-ad60d.firebaseapp.com',
  databaseURL: 'https://yuch-ad60d.firebaseio.com',
  projectId: 'yuch-ad60d',
  storageBucket: 'yuch-ad60d.appspot.com',
  messagingSenderId: '761487114850',
};
// console.log(process.env.FIREBASE_API_KEY);

firebase.initializeApp(config);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
// database
//   .ref()
//   .set({
//     name: 'YUCH',
//     location: {
//       country: 'South Korea',
//       city: 'Gyeongju',
//     },
//   })
//   .then(() => {
//     console.log('Data is saved!');
//   })
//   .catch(err => {
//     console.log('This failed', err);
//   });

// database.ref('developer').set('pretty');
// database.ref('location/city').set('beautiful');
// database.ref('attribute').set({
//   height: 73,
//   weight: 200,
// });

// database
//   .ref('location/country')
//   .remove()
//   .then(() => console.log('Data is removed'))
//   .catch(err => console.log(err));

// database.ref('location/city').set(null);

// database.ref().set({
//   name: 'Jiah Lee',
//   age: 29,
//   stressLevel: 6,
//   job: {
//     title: 'Web Developer',
//     company: 'Google',
//   },
//   location: {
//     city: 'Montreal',
//     country: 'Canada',
//   },
// });

// database.ref().update({
//   stressLevel: 3,
//   'job/company': 'Ikea',
//   'location/city': 'Vancouver',
// });

// database
//   .ref('location/city')
//   .once('value')
//   .then(snapshot => {
//     const val = snapshot.val();
//     console.log('val: ', val);
//   })
//   .catch(err => {
//     console.log('ERROR fetching data', err);
//   });

// to have the server notify us of changes (realtime update)
// allow us to listen for something over and over again
// promise resolve or reject a single time with a single value

// database.ref().on(
//   'value',
//   snapshot => {
//     console.log(snapshot.val());
//   },
//   err => {
//     console.log('Error with data fetching', err);
//   },
// );

// setTimeout(() => {
//   database.ref('age').set(25);
// }, 3500);

// setTimeout(() => {
//   database.ref().off();
// }, 7000);

// setTimeout(() => {
//   database.ref('age').set(29);
// }, 10500);

// database.ref().on(
//   'value',
//   snapshot => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`);
//   },
//   err => console.log(err),
// );

// database.ref('notes').push({
//   title: 'hello',
//   body: 'first',
// });

// database.ref('notes/-LNPWynQ0T7kdhNHg3Rq').update({
//   body: 'update !!',
// });

// database.ref('expenses').push({
//   description: 'Rent',
//   note: '',
//   amount: 1100,
//   createdAt: 12937129371,
// });

// database.ref('expenses').on(
//   'value',
//   snapshot => {
//     const expenses = [];
//     snapshot.forEach(childsnapshot => {
//       expenses.push({
//         id: childsnapshot.key,
//         ...childsnapshot.val(),
//       });
//     });
//     console.log(expenses);
//   },
//   err => {
//     console.log(err);
//   },
// );

// database.ref('expenses').on('child_removed', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', snapshot => {
//   console.log('child added: ', snapshot.key, snapshot.val());
// });
