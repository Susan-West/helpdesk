// /app/api/tickets/my/route.js
import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/auth";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  const user = verifyToken(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const tickets = await prisma.ticket.findMany({
    where: { createdById: user.id },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify({ tickets }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}