import { z } from 'zod';

export type State = {
	status: 'error' | 'success' | undefined;
	errors?: {
		[key: string]: string[];
	};
	message?: string | null;
};

export const productSchema = z.object({
	name: z.string().min(3, {
		message:
			'El nombre debe tener una longitud mínima de 5 caracteres.',
	}),
	category: z.string().min(1, { message: 'Categoría es requerida' }),
	price: z
		.number()
		.min(1, { message: 'El precio tiene que ser mayor a 1' }),
	smallDescription: z
		.string()
		.min(10, { message: 'Por favor, resuma más su producto.' }),
	description: z
		.string()
		.min(10, { message: 'Descripción es requerida' }),
	images: z.array(z.string(), { message: 'Imágenes son requeridas' }),
	productFile: z.string().min(1, {
		message: 'Por favor, cargue un archivo zip de su producto',
	}),
});

export const userSettingsSchema = z.object({
	firstName: z
		.string()
		.min(3, { message: 'Se requiere una longitud mínima de 3' })
		.or(z.literal(''))
		.optional(),

	lastName: z
		.string()
		.min(3, { message: 'Se requiere una longitud mínima de 3' })
		.or(z.literal(''))
		.optional(),
});
