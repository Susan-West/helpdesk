import { verifyToken } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

export async function GET(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = verifyToken(token);
  console.log('Decoded user:', user);

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, email: true, role: true },
  });

  return Response.json({ user: profile });
}