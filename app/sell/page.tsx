import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { SellForm } from './_components/SellForm';
import { Card } from '@/components/ui/card';

export default async function SellPage() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error('No autorizado');

	return (
		<div className='max-w-7xl mx-auto px-4 md:px-8 mb-14'>
			<Card>
				<SellForm />
			</Card>
		</div>
	);
}
