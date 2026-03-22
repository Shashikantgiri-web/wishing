import clientPromise from "@/lib/mongodb"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request) {
  try {
    const body = await request.json()
    const { fromEmail, fromName, toEmail, message } = body

    if (!fromEmail || !toEmail || !message) {
      return Response.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("bairday_website")
    const collection = db.collection("messages")

    await collection.insertOne({
      fromEmail,
      fromName: fromName || "Anonymous",
      toEmail,
      text: message,
      createdAt: new Date()
    })

    return Response.json({ success: true, message: "Message sent successfully" })
  } catch (error) {
    console.error("API Error (Messages POST):", error)
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const toEmail = searchParams.get("toEmail")

    if (!toEmail) {
      return Response.json({ success: false, message: "Recipient email required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("bairday_website")
    const collection = db.collection("messages")

    const messages = await collection.find({ toEmail }).sort({ createdAt: -1 }).toArray()

    return Response.json({ success: true, messages })
  } catch (error) {
    console.error("API Error (Messages GET):", error)
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}
