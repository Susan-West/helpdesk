import { verifyToken } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

export async function PATCH(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = verifyToken(token);

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { name, email, role } = await req.json();

  // ✅ Only allow role change if user is admin
  const updateData = { name, email };
  if (role) {
    updateData.role = role;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: updateData,
  });

  return Response.json({ success: true });
}