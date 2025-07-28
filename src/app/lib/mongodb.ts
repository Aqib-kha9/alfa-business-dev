import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect()
      .then((connectedClient) => {
        console.log('[MongoDB] Connected successfully (dev)');
        return connectedClient;
      })
      .catch((err) => {
        console.error('[MongoDB] Connection failed (dev):', err);
        throw err;
      });
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then((connectedClient) => {
      console.log('[MongoDB] Connected successfully (prod)');
      return connectedClient;
    })
    .catch((err) => {
      console.error('[MongoDB] Connection failed (prod):', err);
      throw err;
    });
}

export default clientPromise;
