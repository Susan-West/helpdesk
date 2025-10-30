import { prisma } from "../../../../lib/prisma"; // ✅ default import
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received body:", body); // ✅ log incoming data

    const { name, password, role } = body;

    if (!name || !password || !role) {
      console.log("Missing fields:", { name, password, role });
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({ where: { name } });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      return new Response(JSON.stringify({ error: "Unable to create account" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const newUser = await prisma.user.create({
      data: { name, password: hashedPassword, role },
    });

    console.log("New user created:", newUser);

    return new Response(JSON.stringify({
      message: "Signup successful",
      user: { id: newUser.id, role: newUser.role }
    }), { status: 201 });
  } catch (error) {
    console.error("Signup error:", error); // ✅ this is what I need to see
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}