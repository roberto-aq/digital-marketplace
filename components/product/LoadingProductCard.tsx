import { Skeleton } from '../ui/skeleton';

export function LoadingProductCard() {
	return (
		<div className='flex flex-col'>
			<Skeleton className='w-full h-[230px]' />
			<div className='flex flex-col mt-2 gap-y-2'>
				<Skeleton className='h-4 w-full' />
				<Skeleton className='w-full h-6' />
			</div>

			<Skeleton className='w-full h-10 mt-5' />
		</div>
	);
}
