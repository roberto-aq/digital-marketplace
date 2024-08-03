import { ProductCard } from '@/components/home/ProductCard';
import { getProductsByUser } from '@/lib/actions/products.action';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import { unstable_noStore as noStore } from 'next/cache';

export default async function MyProductsRoute() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) {
		throw new Error('No autorizado');
	}

	const data = await getProductsByUser(user.id);

	return (
		<section className='max-w-7xl mx-auto px-4 md:px-8'>
			<h1 className='text-2xl font-bold'>Mis Productos</h1>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-cols-2 mt-4'>
				{data.map(item => (
					<ProductCard
						key={item.id}
						id={item.id}
						images={item.images}
						name={item.name}
						price={item.price}
						smallDescription={item.smallDescription}
					/>
				))}
			</div>
		</section>
	);
}
