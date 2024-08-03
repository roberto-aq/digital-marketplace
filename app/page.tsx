import Image from 'next/image';

export default function Home() {
	console.log(process.env.KINDE_POST_LOGIN_REDIRECT_URL);
	return <h1>Hola Mundo</h1>;
}
