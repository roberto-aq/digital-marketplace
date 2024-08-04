'use server';

import { redirect } from 'next/navigation';
import prisma from '../prisma';
import { stripe } from '../stripe';

export const getProductById = async (id: string) => {
	try {
		const product = await prisma.product.findUnique({
			where: { id },
			select: {
				category: true,
				description: true,
				smallDescription: true,
				price: true,
				name: true,
				images: true,
				createdAt: true,
				id: true,
				User: {
					select: {
						profileImage: true,
						firstName: true,
					},
				},
			},
		});

		return product;
	} catch (error) {
		console.log(error);
		throw new Error('Algo salió mal');
	}
};

export const buyProduct = async (formData: FormData) => {
	const id = formData.get('id') as string;

	const data = await prisma.product.findUnique({
		where: {
			id,
		},
		select: {
			name: true,
			smallDescription: true,
			price: true,
			images: true,
			User: {
				select: {
					connectedAccountId: true,
				},
			},
		},
	});

	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		line_items: [
			{
				price_data: {
					currency: 'usd',
					unit_amount: Math.round((data?.price as number) * 100),
					product_data: {
						name: data?.name as string,
						description: data?.smallDescription,
						images: data?.images,
					},
				},
				quantity: 1,
			},
		],
		payment_intent_data: {
			application_fee_amount:
				Math.round((data?.price as number) * 100) * 0.1,
			transfer_data: {
				destination: data?.User?.connectedAccountId as string,
			},
		},
		success_url: 'http://localhost:3000/payment/success',
		cancel_url: 'http://localhost:3000/payment/cancel',
	});

	return redirect(session.url as string);
};
