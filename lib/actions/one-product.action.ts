import prisma from '../prisma';

export const getProductById = async (id: string) => {
	try {
		const product = await prisma.product.findUnique({
			where: { id },
			select: {
				category: true,
				description: true,
				smallDescription: true,
				price: true,
				name: true,
				images: true,
				createdAt: true,
				id: true,
				User: {
					select: {
						profileImage: true,
						firstName: true,
					},
				},
			},
		});

		return product;
	} catch (error) {
		console.log(error);
		throw new Error('Algo salió mal');
	}
};
