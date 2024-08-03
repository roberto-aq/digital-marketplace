import { ChefHat, Globe, PartyPopper } from 'lucide-react';
import { ReactNode } from 'react';

interface CategoryItem {
	name: string;
	title: string;
	image: ReactNode;
	id: number;
}

export const categoryItems: CategoryItem[] = [
	{
		id: 0,
		name: 'template',
		title: 'Plantilla',
		image: <Globe />,
	},
	{
		id: 1,
		name: 'uikit',
		title: 'Kit UI',
		image: <ChefHat />,
	},
	{
		id: 2,
		name: 'icon',
		title: 'Iconos',
		image: <PartyPopper />,
	},
];
