import clientPromise from "@/lib/mongodb"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return Response.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("bairday_website")
    const collection = db.collection("users")

    const user = await collection.findOne({ email })

    if (user) {
      return Response.json({ success: true, exists: true, user })
    } else {
      return Response.json({ success: true, exists: false })
    }
  } catch (error) {
    console.error("API Error (Check User):", error)
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}
