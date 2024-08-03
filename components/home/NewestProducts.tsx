import Link from 'next/link';

import { getProduct } from '@/lib/actions/products.action';
import { ProductCard } from './ProductCard';

export async function NewestProducts() {
	const data = await getProduct();

	return (
		<section className='mt-12'>
			<div className='md:flex md:items-center md:justify-between'>
				<h2 className='text-2xl font-extrabold tracking-tighter '>
					Productos recién salidos
				</h2>
				<Link
					href='#'
					className='text-sm hidden font-medium text-primary hover:text-primary/90 md:block'
				>
					Todos los Productos <span>&rarr;</span>
				</Link>
			</div>

			<div className='grid gird-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10'>
				{data.map(product => (
					<ProductCard
						images={product.images}
						key={product.id}
						id={product.id}
						name={product.name}
						price={product.price}
						smallDescription={product.smallDescription}
					/>
				))}
			</div>
		</section>
	);
}