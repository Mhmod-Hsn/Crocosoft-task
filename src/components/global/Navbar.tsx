import { cn } from '@/lib/utils';
import { ROUTES } from '@/routes';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.webp';
import { Button } from '../ui/button';

export const Navbar = () => {
	return (
		<>
			<nav className='bg-white w-full z-20 border-b border-gray-200'>
				<div className='flex flex-wrap items-center justify-between mx-auto p-2'>
					<div className='flex items-center'>
						<img src={logo} className='h-12 invert' alt='Logo' />
						<div
							className='items-center justify-start flex w-auto order-0 order-1'
							id='navbar-sticky'
						>
							<ul className='flex p-0 font-medium  border-gray-100 rounded-lg  space-x-8 flex-row mt-0  '>
								<li>
									<NavLink
										to={ROUTES.HOME}
										className={({ isActive }) =>
											cn(
												'block py-2 px-3 rounded text-primary border',
												isActive ? 'bg-gray-100 ' : 'border-transparent'
											)
										}
									>
										Quizzes
									</NavLink>
								</li>
							</ul>
						</div>
					</div>

					<div className='flex order-2 space-x-0 rtl:space-x-reverse'>
						<NavLink
							to={ROUTES.CREATE}
							className={({ isActive }) => cn(isActive ? 'hidden' : '')}
						>
							<Button type='button'>Create</Button>
						</NavLink>
					</div>
				</div>
			</nav>
		</>
	);
};
