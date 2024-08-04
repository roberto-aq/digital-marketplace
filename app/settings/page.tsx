import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { SettingsForm } from './_components/SettingsForm';
import { Card } from '@/components/ui/card';
import { getDataUser } from '@/lib/actions/settings.action';
import { unstable_noStore as noStore } from 'next/cache';

export default async function SettingsPage() {
	noStore();
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error('No autorizado');

	const data = await getDataUser(user.id);

	return (
		<section className='max-w-7xl mx-auto px-4 md:px-8'>
			<Card>
				<SettingsForm
					firstName={data?.firstName as string}
					lastName={data?.lastName as string}
					email={data?.email as string}
				/>
			</Card>
		</section>
	);
}
