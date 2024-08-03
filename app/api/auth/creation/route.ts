import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user || user === null || !user.id) {
		throw new Error('Algo salió mal...');
	}

	let dbUser = await prisma.user.findUnique({
		where: { id: user.id },
	});

	if (!dbUser) {
		dbUser = await prisma.user.create({
			data: {
				id: user.id,
				firstName: user.given_name ?? '',
				lastName: user.family_name ?? '',
				email: user.email ?? '',
				profileImage: user.picture ?? 'https://github.com/shadcn.png',
			},
		});
	}

	return NextResponse.redirect('http://localhost:3000');
}
