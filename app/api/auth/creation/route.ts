import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
	noStore();
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user || user === null || !user.id) {
		throw new Error('Algo salió mal...');
	}

	let dbUser = await prisma.user.findUnique({
		where: { id: user.id },
	});

	if (!dbUser) {
		const account = await stripe.accounts.create({
			email: user.email as string,
			controller: {
				losses: {
					payments: 'application',
				},
				fees: {
					payer: 'application',
				},
				stripe_dashboard: {
					type: 'express',
				},
			},
		});

		dbUser = await prisma.user.create({
			data: {
				id: user.id,
				firstName: user.given_name ?? '',
				lastName: user.family_name ?? '',
				email: user.email ?? '',
				profileImage: user.picture ?? 'https://github.com/shadcn.png',
				connectedAccountId: account.id,
			},
		});
	}

	return NextResponse.redirect(
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000'
			: (process.env.PUBLIC_URL as string) ?? ''
	);
}
