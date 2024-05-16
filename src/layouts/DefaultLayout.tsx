import { Navbar } from '@/components/global/Navbar';
import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => {
	return (
		<div className='h-screen flex flex-col'>
			<Navbar />
			<div className='flex flex-col flex-1 h-full overflow-auto bg-gray-50 '>
				<div className='flex-1 p-3 overflow-auto '>
					<div className=' bg-white overflow-auto h-full rounded-lg'>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};
