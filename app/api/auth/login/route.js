import { prisma } from "../../../../lib/prisma"; // ✅ named import
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, password } = body;

    if (!name || !password) {
      return new Response(JSON.stringify({ error: "Missing credentials" }), { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { name } });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid name or password" }), { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid name or password" }), { status: 401 });
    }

    return new Response(JSON.stringify({
      message: "Login successful",
      user: { id: user.id, role: user.role }
    }), { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}