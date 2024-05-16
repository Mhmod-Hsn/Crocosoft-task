import { cn } from '@/lib/utils';
import { ROUTES } from '@/routes';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.webp';
import { Button } from '../ui/button';

export const Navbar = () => {
	return (
		<>
			<nav className='bg-white w-full z-20 border-b border-gray-200'>
				<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
					<a
						href='#'
						className='flex items-center space-x-3 rtl:space-x-reverse'
					>
						<img src={logo} className='h-10 invert' alt='Logo' />
						{/* QuizApp */}
					</a>
					<div className='flex order-2 space-x-0 rtl:space-x-reverse'>
						<Link to={ROUTES.CREATE}>
							<Button type='button'>Create</Button>
						</Link>
					</div>
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
			</nav>
		</>
	);
};
