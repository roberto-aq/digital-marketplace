import { NewestProducts } from '@/components/home/NewestProducts';
import { ProductRow } from '@/components/home/ProductRow';

export default function Home() {
	return (
		<section className='max-w-7xl mx-auto px-4 md:px-8 mb-24'>
			<div className='max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center'>
				<h1 className=''>
					Encuentra las mejores{' '}
					<span className='text-primary'>Plantillas e Iconos</span>{' '}
					con Tailwind
				</h1>
				<p className='lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base'>
					MarshalUi se destaca como el principal mercado para todo lo
					relacionado con tailwindcss, ofreciendo una plataforma
					incomparable tanto para vendedores como para compradores.
				</p>
			</div>
			{/* <NewestProducts /> */}
			<ProductRow category='newest' />
			<ProductRow category='template' />
			<ProductRow category='icon' />
			<ProductRow category='uikit' />
		</section>
	);
}
