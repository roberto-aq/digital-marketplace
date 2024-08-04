import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { SubmitButton } from '../sell/_components/SubmitButton';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/lib/prisma';
import {
	CreateStripeAccoutnLink,
	GetStripeDashboardLink,
} from '@/lib/actions/stripe.action';
import { unstable_noStore as noStore } from 'next/cache';

async function getData(userId: string) {
	const data = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			stripeConnectedLinked: true,
		},
	});

	return data;
}

export default async function BillingPage() {
	noStore();
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) {
		throw new Error('No autorizado');
	}

	const data = await getData(user.id);

	return (
		<section className='max-w-7xl mx-auto px-4 md:px-8'>
			<Card>
				<CardHeader>
					<CardTitle>Facturación</CardTitle>
					<CardDescription>
						Encuentra todos los detalles de tus pagos
					</CardDescription>
				</CardHeader>
				<CardContent>
					{data?.stripeConnectedLinked === false && (
						<form action={CreateStripeAccoutnLink}>
							<SubmitButton title='Conecte su cuenta de Stripe' />
						</form>
					)}

					{data?.stripeConnectedLinked === true && (
						<form action={GetStripeDashboardLink}>
							<SubmitButton title='Ver Dashboard' />
						</form>
					)}
				</CardContent>
			</Card>
		</section>
	);
}
