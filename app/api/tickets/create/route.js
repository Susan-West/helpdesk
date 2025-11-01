import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/auth";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    const user = verifyToken(token);
    if (!user || user.role !== "STAFF") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await req.json();
    const { title, description, category, priority, location, phone_contact } = body;

    if (!title || !description || !category || !priority) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // ✅ Log payload for debugging
    console.log("Creating ticket with:", {
      title,
      description,
      category,
      priority,
      status: "OPEN",
      location,
      createdById: user.id,
    });

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        category,
        priority: priority.toUpperCase(), 
        status: "OPEN",                   
        location: location || null,       
        createdById: user.id,
      },
    });

    return new Response(JSON.stringify({ ticket }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🔥 Ticket creation error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}