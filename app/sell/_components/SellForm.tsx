'use client';

import { useEffect, useState } from 'react';

import { JSONContent } from '@tiptap/react';
import { TipTapEditor } from '@/components/Editor';
import { UploadButton, UploadDropzone } from '@/lib/uploadthing';
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { SelectCategory } from './SelectCategory';
import { SubmitButton } from './SubmitButton';
import { useFormState } from 'react-dom';
import { sellProduct } from '@/lib/actions/products.action';
import { State } from '@/lib/validations';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

export const SellForm = () => {
	const initialState: State = { message: '', status: undefined };
	const [state, formAction] = useFormState(sellProduct, initialState);

	const [json, setJson] = useState<JSONContent | null>(null);
	const [images, setImages] = useState<null | string[]>(null);
	const [productFile, SetProductFile] = useState<null | string>(null);

	useEffect(() => {
		if (state.status === 'success') {
			toast.success(state.message);
			redirect('/');
		} else if (state.status === 'error') {
			toast.error(state.message);
		}
	}, [state]);

	return (
		<form action={formAction}>
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
					{state?.errors?.['name']?.[0] && (
						<p className='text-destructive'>
							{state?.errors?.['name']?.[0]}
						</p>
					)}
				</div>
				<div className='flex flex-col gap-y-2'>
					<Label>Categoría</Label>
					<SelectCategory />
					{state?.errors?.['category']?.[0] && (
						<p className='text-destructive'>
							{state?.errors?.['category']?.[0]}
						</p>
					)}
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
					{state?.errors?.['price']?.[0] && (
						<p className='text-destructive'>
							{state?.errors?.['price']?.[0]}
						</p>
					)}
				</div>

				<div className='flex flex-col gap-y-2'>
					<Label>Breve Resumen</Label>
					<Textarea
						name='smallDescription'
						placeholder='Por favor describa brevemente su producto aquí...'
						required
						minLength={10}
					/>
					{state?.errors?.['smallDescription']?.[0] && (
						<p className='text-destructive'>
							{state?.errors?.['smallDescription']?.[0]}
						</p>
					)}
				</div>

				<div className='flex flex-col gap-y-2'>
					<input
						type='hidden'
						name='description'
						value={JSON.stringify(json)}
					/>
					<Label>Descripción</Label>
					<TipTapEditor json={json} setJson={setJson} />
					{state?.errors?.['description']?.[0] && (
						<p className='text-destructive'>
							{state?.errors?.['description']?.[0]}
						</p>
					)}
				</div>

				<div className='flex flex-col gap-y-2'>
					<input
						type='hidden'
						name='images'
						value={JSON.stringify(images)}
					/>
					<Label>Imágenes del producto</Label>
					<UploadDropzone
						endpoint='imageUploader'
						onClientUploadComplete={res => {
							setImages(res.map(item => item.url));
							toast.success('Sus imágenes han sido subidas');
						}}
						onUploadError={(error: Error) => {
							toast.error('Algo salió mal, intentelo de nuevo');
						}}
					/>
					{state?.errors?.['images']?.[0] && (
						<p className='text-destructive'>
							{state?.errors?.['images']?.[0]}
						</p>
					)}
				</div>

				<div className='flex flex-col gap-y-2'>
					<input
						type='hidden'
						name='productFile'
						value={productFile ?? ''}
					/>
					<Label>Archivo del producto</Label>
					<UploadButton
						onClientUploadComplete={res => {
							SetProductFile(res[0].url);
							toast.success('Su archivo del producto ha sido subido');
						}}
						endpoint='productFileUpload'
						onUploadError={(error: Error) => {
							toast.error('Algo salió mal, intentelo de nuevo');
						}}
					/>
					{state?.errors?.['productFile']?.[0] && (
						<p className='text-destructive'>
							{state?.errors?.['productFile']?.[0]}
						</p>
					)}
				</div>
			</CardContent>
			<CardFooter className='mt-5'>
				<SubmitButton title='Crear tu producto' />
			</CardFooter>
		</form>
	);
};
