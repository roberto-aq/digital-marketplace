'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { productSchema, State } from '../validations';
import prisma from '../prisma';
import { type CategoryTypes } from '@prisma/client';

export const sellProduct = async (
	prevState: any,
	formData: FormData
) => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) {
		throw new Error('Algo salió mal...');
	}

	const validateFields = productSchema.safeParse({
		name: formData.get('name'),
		category: formData.get('category'),
		price: Number(formData.get('price')),
		smallDescription: formData.get('smallDescription'),
		description: formData.get('description'),
		images: JSON.parse(formData.get('images') as string),
		productFile: formData.get('productFile'),
	});

	if (!validateFields.success) {
		const state: State = {
			status: 'error',
			errors: validateFields.error.flatten().fieldErrors,
			message: 'Ups, Creo que hay un error en tus inputs... ',
		};

		return state;
	}

	await prisma.product.create({
		data: {
			name: validateFields.data.name,
			category: validateFields.data.category as CategoryTypes,
			price: validateFields.data.price,
			description: JSON.parse(validateFields.data.description),
			smallDescription: validateFields.data.smallDescription,
			images: validateFields.data.images,
			productFile: validateFields.data.productFile,
			userId: user.id,
		},
	});

	const state: State = {
		status: 'success',
		message: 'Tu producto ha sido creado',
	};

	return state;
};

export const getProducts = async () => {
	try {
		const products = await prisma.product.findMany({
			select: {
				price: true,
				smallDescription: true,
				category: true,
				name: true,
				id: true,
				images: true,
			},
			take: 4,
			orderBy: {
				createdAt: 'desc',
			},
		});

		return products;
	} catch (error) {
		console.log(error);
		throw new Error('Algo salió mal, revisar los logs');
	}
};

export const getProductsByCategory = async (
	category: string | undefined,
	take?: number
) => {
	try {
		const products = await prisma.product.findMany({
			where: {
				category: category as CategoryTypes,
			},
			select: {
				price: true,
				smallDescription: true,
				name: true,
				id: true,
				images: true,
			},
			take,
			orderBy: {
				createdAt: 'desc',
			},
		});

		return products;
	} catch (error) {
		console.log(error);
		throw new Error('Algo salió mal, revisar los logs');
	}
};
