import clientPromise from "@/lib/mongodb"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request) {
  try {
    const body = await request.json()

    const client = await clientPromise
    if (!client) {
      return Response.json({ success: false, error: "Database not connected" }, { status: 500 })
    }
    const db = client.db("bairday_website")
    const collection = db.collection("users")

    // Check if the user already exists by email
    const existingUser = await collection.findOne({ email: body.email })
    if (existingUser) {
      return Response.json({ success: false, message: 'User already exists with this email' }, { status: 400 })
    }

    const result = await collection.insertOne({
      _id: body.email,
      firstname: body.firstname,
      lastname: body.lastname,
      username: body.username,
      email: body.email,
      dob: body.dob,
      gender: body.gender,
      profil_picture: body.profil_picture,
      video_url: body.video_url,
      avatar_3d_url: body.avatar_3d_url,
      for_message: body.for_message || "Birthday",
      to_message: body.to_message || "Friend",
      createdAt: new Date()
    })

    return Response.json({ success: true, message: 'Data stored successfully' })
  } catch (error) {
    console.error('API Error:', error)
    return Response.json({ success: false, message: 'Internal Server Error', error: error.message }, { status: 500 })
  }
}

export async function GET() {
  return Response.json({ message: "POST method Successfully" })
}