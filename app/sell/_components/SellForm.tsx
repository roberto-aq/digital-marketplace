'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TipTapEditor } from '@/components/Editor';
import { UploadDropzone } from '@/lib/uploadthing';
import { SelectCategory } from './SelectCategory';
import { SubmitButton } from './SubmitButton';

export const SellForm = () => {
	return (
		<Card>
			<form>
				<CardHeader>
					<CardTitle>Vende tu producto con facilidad</CardTitle>
					<CardDescription>
						Por favor, describa aquí su producto en detalle para que
						podamos venderlo.
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-y-10'>
					<div className='flex flex-col gap-y-2'>
						<Label>Nombre</Label>
						<Input
							name='name'
							type='text'
							placeholder='Nombre de tu producto'
							required
							minLength={3}
						/>
						{/* {state?.errors?.['name']?.[0] && (
                <p className='text-destructive'>
                    {state?.errors?.['name']?.[0]}
                </p>
            )} */}
					</div>
					<div className='flex flex-col gap-y-2'>
						<Label>Categoría</Label>
						<SelectCategory />
						{/* {state?.errors?.['category']?.[0] && (
                <p className='text-destructive'>
                    {state?.errors?.['category']?.[0]}
                </p>
            )} */}
					</div>

					<div className='flex flex-col gap-y-2'>
						<Label>Precio</Label>
						<Input
							placeholder='29$'
							type='number'
							name='price'
							required
							min={1}
						/>
						{/* {state?.errors?.['price']?.[0] && (
                <p className='text-destructive'>
                    {state?.errors?.['price']?.[0]}
                </p>
            )} */}
					</div>

					<div className='flex flex-col gap-y-2'>
						<Label>Breve Resumen</Label>
						<Textarea
							name='smallDescription'
							placeholder='Por favor describa brevemente su producto aquí...'
							required
							minLength={10}
						/>
						{/* {state?.errors?.['smallDescription']?.[0] && (
                <p className='text-destructive'>
                    {state?.errors?.['smallDescription']?.[0]}
                </p>
            )} */}
					</div>

					<div className='flex flex-col gap-y-2'>
						<input
							type='hidden'
							name='description'
							// value={JSON.stringify(json)}
						/>
						<Label>Descripción</Label>
						<TipTapEditor />
						{/* {state?.errors?.['description']?.[0] && (
                    <p className='text-destructive'>
                        {state?.errors?.['description']?.[0]}
                    </p>
                )} */}
					</div>

					<div className='flex flex-col gap-y-2'>
						<Label>Imagenes del Producto</Label>

						<UploadDropzone endpoint='imageUploader' />
					</div>

					<div className='flex flex-col gap-y-2'>
						<input
							type='hidden'
							name='productFile'
							// value={productFile ?? ''}
						/>
						<Label>Archivo del producto</Label>
						<UploadDropzone
							onClientUploadComplete={res => {
								// SetProductFile(res[0].url);
								// toast.success(
								// 	'Your Product file has been uplaoded!'
								// );
							}}
							endpoint='productFileUpload'
							onUploadError={(error: Error) => {
								// toast.error('Something went wrong, try again');
							}}
						/>
						{/* {state?.errors?.['productFile']?.[0] && (
                    <p className='text-destructive'>
                        {state?.errors?.['productFile']?.[0]}
                    </p>
                )} */}
					</div>
				</CardContent>
				<CardFooter className='mt-5'>
					<SubmitButton title='Crear tu producto' />
				</CardFooter>
			</form>
		</Card>
	);
};
