import clientPromise from "@/lib/mongodb"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("bairday_website")
    const collection = db.collection("users")

    // In a real app, you might filter by dob === today
    // For this build, we'll fetch all users who have registered to show in Explore
    const users = await collection.find({}).sort({ createdAt: -1 }).limit(20).toArray()

    return Response.json({ success: true, users })
  } catch (error) {
    console.error("API Error (Users GET):", error)
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}
