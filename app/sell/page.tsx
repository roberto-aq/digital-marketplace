import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { SellForm } from './_components/SellForm';
import { Card } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
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

	if (data?.stripeConnectedLinked === false) {
		return redirect('/billing');
	}

	return null;
}

export default async function SellPage() {
	noStore();
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error('No autorizado');

	const data = await getData(user.id);

	return (
		<div className='max-w-7xl mx-auto px-4 md:px-8 mb-14'>
			<Card>
				<SellForm />
			</Card>
		</div>
	);
}
