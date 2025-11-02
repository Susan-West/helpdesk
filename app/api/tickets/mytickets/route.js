import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/auth";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    const user = verifyToken(token);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tickets = await prisma.ticket.findMany({
      where: { createdById: user.id },
      orderBy: { createdAt: "desc" },
    });

    // ✅ Ensure created_at is ISO formatted
    const formattedTickets = tickets.map((ticket) => ({
      ...ticket,
      created_at: ticket.createdAt.toISOString(),
    }));

    return new Response(JSON.stringify({ tickets: formattedTickets }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}