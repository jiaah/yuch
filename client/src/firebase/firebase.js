import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB7fhXy5536xHsYgGRrL_PLC83Cu3LBpEw',
  authDomain: 'yuch-ad60d.firebaseapp.com',
  databaseURL: 'https://yuch-ad60d.firebaseio.com',
  projectId: 'yuch-ad60d',
  storageBucket: 'yuch-ad60d.appspot.com',
  messagingSenderId: '761487114850',
};
console.log(process.env.FIREBASE_API_KEY);

firebase.initializeApp(config);
const database = firebase.database();

database.ref().set({
  name: 'YUCH',
  location: {
    country: 'South Korea',
    city: 'Gyeongju',
  },
  developer: 'Jiah Lee',
});
database.ref('developer').set('pretty');
database.ref('location/city').set('beautiful');
database.ref('attribute').set({
  height: 73,
  weight: 200,
});
export default firebase;
