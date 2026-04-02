const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('bairday_website');
    const collection = database.collection('special_users');

    // Sample Special User
    const specialUser = {
      email: "vip@example.com", // Change this to your test email
      name: "VIP User",
      dob: "2026-04-02", // Today's date for testing
      avatar3D: "https://example.com/avatar.glb",
      animationVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Rickroll for magic!
    };

    // Use upsert to avoid duplicates
    const result = await collection.updateOne(
      { email: specialUser.email },
      { $set: specialUser },
      { upsert: true }
    );

    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    if (result.upsertedCount > 0) {
      console.log(`One new document was inserted with the id ${result.upsertedId}`);
    }

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
