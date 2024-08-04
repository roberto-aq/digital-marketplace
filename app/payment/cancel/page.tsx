import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
	return (
		<section className='w-full min-h-[80vh] flex items-center justify-center'>
			<Card className='w-[350px]'>
				<div className='p-6'>
					<div className='w-full flex justify-center'>
						<XCircle className='w-12 h-12 rounded-full bg-red-500/30 text-red-500 p-2' />
					</div>
					<div className='mt-3 text-center sm:mt-5 w-full'>
						<h3 className='text-lg leading-6 font-medium'>
							Pago Cancelado
						</h3>
						<p className='mt-2 text-sm text-muted-foreground'>
							Algo salió mal con tu pago. No se te ha cobrado. Vuelve
							a intentarlo.
						</p>

						<Button className='mt-5 sm:mt-6 w-full' asChild>
							<Link href='/'>Vuelve al inicio</Link>
						</Button>
					</div>
				</div>
			</Card>
		</section>
	);
}
