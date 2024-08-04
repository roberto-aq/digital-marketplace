import {
	Body,
	Button,
	Container,
	Head,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';

export default function ProductEmail({ link }: { link: string }) {
	return (
		<Html>
			<Head />
			<Preview>Tu producto está aquí</Preview>
			<Tailwind>
				<Body className='bg-white font-sans'>
					<Container style={container}>
						<Text className='text-2xl font-semibold'>
							Hola amigo,
						</Text>
						<Text className='text-lg text-gray-600'>
							Gracias por comprar tu producto en MarshalUI
						</Text>
						<Section className='w-full flex justify-center mt-7'>
							<Button
								href={link}
								className='text-white bg-blue-500 rounded-lg px-10 py-4'
							>
								Puedes descargar aquí
							</Button>
						</Section>
						<Text className='text-lg'>
							Saludos, <br /> El equipo de MarshalUI
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

const container = {
	margin: '0 auto',
	padding: '20px 0 48px',
};
