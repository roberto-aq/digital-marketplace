'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

export function BuyButton({ price }: { price: number }) {
	const { pending } = useFormStatus();

	return (
		<>
			{pending ? (
				<Button disabled size='lg' className='w-full mt-10'>
					<Loader2 className='mr-2 h-4 w-4 animate-spin' />
					Cargando...
				</Button>
			) : (
				<Button type='submit' size='lg' className='w-full mt-10'>
					Comprar por ${price}
				</Button>
			)}
		</>
	);
}
