'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '../prisma';
import { type State, userSettingsSchema } from '../validations';

export const getDataUser = async (userId: string) => {
	try {
		const data = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				firstName: true,
				lastName: true,
				email: true,
			},
		});

		return data;
	} catch (error) {
		console.log(error);
		throw new Error('Algo salió mal, revisar los logs');
	}
};

export const updateUserSettings = async (
	prevState: any,
	formData: FormData
) => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) {
		throw new Error('Algo salió mal...');
	}

	const validateFields = userSettingsSchema.safeParse({
		firstName: formData.get('firstName'),
		lastName: formData.get('lastName'),
	});

	if (!validateFields.success) {
		const state: State = {
			status: 'error',
			errors: validateFields.error.flatten().fieldErrors,
			message: 'Ups, Creo que hay un error en tus inputs... ',
		};

		return state;
	}

	const data = await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			firstName: validateFields.data.firstName,
			lastName: validateFields.data.lastName,
		},
	});

	const state: State = {
		status: 'success',
		message: 'Tu información ha sido actualizada.',
	};

	return state;
};
