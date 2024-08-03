'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface Props {
	title: string;
}

export const SubmitButton = ({ title }: Props) => {
	const { pending } = useFormStatus();

	return (
		<>
			{pending ? (
				<Button disabled>
					<Loader2 className='mr-2 h-4 w-4 animate-spin' />
					Cargando...
				</Button>
			) : (
				<Button type='submit'>{title}</Button>
			)}
		</>
	);
};
