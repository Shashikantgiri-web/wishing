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
      animationVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Rickroll for magic!
      memories: [
        { url: "https://images.unsplash.com/photo-1530103862676-fa8c91bbe349?q=80&w=400&h=500&auto=format&fit=crop", caption: "Magic in the air" },
        { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=400&h=300&auto=format&fit=crop", caption: "Best laughs together" },
        { url: "https://images.unsplash.com/photo-1514525253361-b83f859b73c0?q=80&w=400&h=600&auto=format&fit=crop", caption: "Unforgettable moments" },
        { url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=400&h=400&auto=format&fit=crop", caption: "Perfect days" },
        { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=400&h=500&auto=format&fit=crop", caption: "Forever young" },
        { url: "https://images.unsplash.com/photo-1533294160622-d5fece7e3604?q=80&w=400&h=350&auto=format&fit=crop", caption: "Every heartbeat counts" }
      ]
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
