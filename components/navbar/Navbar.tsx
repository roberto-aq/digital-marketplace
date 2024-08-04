import Link from 'next/link';
import {
	RegisterLink,
	LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import NavbarLinks from './NavbarLinks';
import { Button } from '../ui/button';
import { MobileNavbar } from './MobileNavbar';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { UserNavbar } from './UserNavbar';

const Navbar = async () => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	return (
		<nav className='relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7'>
			<div className='md:col-span-3'>
				<Link href='/'>
					<h1 className='text-2xl font-semibold'>
						Marshal <span className='text-primary'>UI</span>
					</h1>
				</Link>
			</div>

			<NavbarLinks />

			<div className='flex items-center gap-x-2 ms-auto md:col-span-3  '>
				{user ? (
					<UserNavbar
						name={user.given_name as string}
						email={user.email as string}
						userImage={
							user.picture || 'https://github.com/shadcn.png'
						}
					/>
				) : (
					<div className='flex items-center gap-x-2'>
						<Button>
							<LoginLink
								postLoginRedirectURL={
									process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL
								}
							>
								Iniciar Sesión
							</LoginLink>
						</Button>
						<Button variant='secondary'>
							<RegisterLink
								postLoginRedirectURL={
									process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL
								}
							>
								Registrarse
							</RegisterLink>
						</Button>
					</div>
				)}

				<div className='md:hidden'>
					<MobileNavbar />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
