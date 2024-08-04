'use server';

import { redirect } from 'next/navigation';

import prisma from '../prisma';
import { stripe } from '../stripe';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function CreateStripeAccoutnLink() {
	const { getUser } = getKindeServerSession();

	const user = await getUser();

	if (!user) {
		throw new Error();
	}

	const data = await prisma.user.findUnique({
		where: {
			id: user.id,
		},
		select: {
			connectedAccountId: true,
		},
	});

	const accountLink = await stripe.accountLinks.create({
		account: data?.connectedAccountId as string,
		refresh_url:
			process.env.NODE_ENV === 'development'
				? `http://localhost:3000/billing`
				: `${process.env.PUBLIC_URL}/billing`,
		return_url:
			process.env.NODE_ENV === 'development'
				? `http://localhost:3000/return/${data?.connectedAccountId}`
				: `${process.env.PUBLIC_URL}/return/${data?.connectedAccountId}`,
		type: 'account_onboarding',
	});

	return redirect(accountLink.url);
}

export async function GetStripeDashboardLink() {
	const { getUser } = getKindeServerSession();

	const user = await getUser();

	if (!user) {
		throw new Error();
	}

	const data = await prisma.user.findUnique({
		where: {
			id: user.id,
		},
		select: {
			connectedAccountId: true,
		},
	});

	const loginLink = await stripe.accounts.createLoginLink(
		data?.connectedAccountId as string
	);

	return redirect(loginLink.url);
}
