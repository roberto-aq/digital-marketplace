'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { type State } from '@/lib/validations';
import { SubmitButton } from '@/app/sell/_components/SubmitButton';
import { updateUserSettings } from '@/lib/actions/settings.action';

interface Props {
	firstName: string;
	lastName: string;
	email: string;
}

export const SettingsForm = ({
	firstName,
	lastName,
	email,
}: Props) => {
	const initalState: State = { message: '', status: undefined };
	const [state, formAction] = useFormState(
		updateUserSettings,
		initalState
	);

	useEffect(() => {
		if (state?.status === 'error') {
			toast.error(state.message);
		} else if (state?.status === 'success') {
			toast.success(state.message);
		}
	}, [state]);

	return (
		<form action={formAction}>
			<CardHeader>
				<CardTitle>Configuración</CardTitle>
				<CardDescription>
					Aquí encontrará la configuración respectiva a su cuenta.
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-y-5'>
				<div className='flex flex-col gap-y-2'>
					<Label>Nombre:</Label>
					<Input
						name='firstName'
						type='text'
						defaultValue={firstName}
					/>
				</div>

				<div className='flex flex-col gap-y-2'>
					<Label>Apellido:</Label>
					<Input
						name='lastName'
						type='text'
						defaultValue={lastName}
					/>
				</div>

				<div className='flex flex-col gap-y-2'>
					<Label>Correo electrónico</Label>
					<Input
						name='email'
						type='email'
						disabled
						defaultValue={'jan@alenix.de'}
					/>
				</div>
			</CardContent>
			<CardFooter>
				<SubmitButton title='Actualizar tus datos' />
			</CardFooter>
		</form>
	);
};
