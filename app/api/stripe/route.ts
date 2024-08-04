import { headers } from 'next/headers';
import { Resend } from 'resend';

import { stripe } from '@/lib/stripe';
import ProductEmail from '@/components/ProductEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
	const body = await req.text();

	const signature = headers().get('Stripe-Signature') as string;

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET as string
		);
	} catch (error: unknown) {
		return new Response('webhook error', { status: 400 });
	}

	switch (event.type) {
		case 'checkout.session.completed': {
			const session = event.data.object;
			const link = session.metadata?.link;

			const { data, error } = await resend.emails.send({
				from: 'MarshalUI <onboarding@resend.dev>',
				to: ["xabier.6582@gmail.com"],
				subject: 'Tu producto de MarshalUI',
				react: ProductEmail({
					link: link as string,
				}),
			});

			console.log({ data, error });
			break;
		}
		default:
			console.log(`Evento no manejado: ${event.type}`);
	}

	return new Response(null, { status: 200 });
}
