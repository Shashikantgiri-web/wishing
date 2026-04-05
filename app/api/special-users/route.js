import clientPromise from "@/lib/mongodb"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("bairday_website")
    const collection = db.collection("special_users")

    const specialUsers = await collection.find({}).toArray()

    return Response.json({ success: true, users: specialUsers })
  } catch (error) {
    console.error("API Error (Special Users GET):", error)
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, name, dob, avatar3D, animationVideo, memories } = body

    if (!email) {
      return Response.json({ success: false, message: "Email is required for identifier" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("bairday_website")
    const collection = db.collection("special_users")

    // Upsert Logic: Update if email matches, otherwise insert a new record
    const result = await collection.updateOne(
      { email },
      { 
        $set: { 
          email, 
          name, 
          dob, 
          avatar3D: avatar3D || "", 
          animationVideo: animationVideo || "",
          memories: memories || [],
          updatedAt: new Date()
        } 
      },
      { upsert: true }
    )


    return Response.json({ 
      success: true, 
      message: result.upsertedCount > 0 ? "New VIP user registered successfully" : "VIP user details updated successfully",
      id: email
    })
  } catch (error) {
    console.error("API Error (Special Users POST):", error)
    return Response.json({ success: false, message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}
