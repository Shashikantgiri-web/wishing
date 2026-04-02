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
