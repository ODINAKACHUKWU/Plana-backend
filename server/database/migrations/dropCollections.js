/* eslint-disable no-console */
import db from '../../configs/db';

const collections = ['users'];
db.on(
  'error',
  console.error.bind(console, 'Database connection error:'),
);

const dropCollections = async () => {
  await db.once('open', () => {
    collections.map((collection) => {
      db.dropCollection(collection, (err, result) => {
        if (err) {
          console.log('An error occured!', err);
        } else {
          console.log(
            `${collection} collection successfully deleted!`,
            result,
          );
        }
      });
    });
  });

//   db.close();
};

dropCollections();
