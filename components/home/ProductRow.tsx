import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { getProductsByCategory } from '@/lib/actions/products.action';
import { notFound } from 'next/navigation';
import { LoadingProductCard } from '../product/LoadingProductCard';
import { Skeleton } from '../ui/skeleton';
import { Suspense } from 'react';

interface Props {
	category: 'newest' | 'template' | 'uikit' | 'icon';
}

async function getData({ category }: Props) {
	switch (category) {
		case 'newest': {
			const data = await getProductsByCategory(undefined, 3);

			return {
				data,
				title: 'Productos Recientes',
				link: '/products/all',
			};
		}
		case 'template': {
			const data = await getProductsByCategory('template', 3);

			return {
				data,
				title: 'Plantillas',
				link: '/products/template',
			};
		}

		case 'icon': {
			const data = await getProductsByCategory('icon', 3);

			return {
				data,
				title: 'Iconos',
				link: '/products/icon',
			};
		}

		case 'uikit': {
			const data = await getProductsByCategory('uikit', 3);

			return {
				data,
				title: 'Kits UI',
				link: '/products/uikit',
			};
		}

		default:
			return notFound();
	}
}

export const ProductRow = async ({ category }: Props) => {
	return (
		<section className='mt-12'>
			<Suspense fallback={<LoadingState />}>
				<LoadRows category={category} />
			</Suspense>
		</section>
	);
};

export const LoadRows = async ({ category }: Props) => {
	const { data, title } = await getData({ category });

	return (
		<section className='mt-12'>
			<div className='md:flex md:items-center md:justify-between'>
				<h2 className='text-2xl font-extrabold tracking-tighter '>
					{title}
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
};

function LoadingState() {
	return (
		<div>
			<Skeleton className='h-8 w-56' />
			<div className='grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3'>
				<LoadingProductCard />
				<LoadingProductCard />
				<LoadingProductCard />
			</div>
		</div>
	);
}
