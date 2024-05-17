import { Navbar } from '@/components/global/Navbar';
import { QuizStoreProvider } from '@/stores/quiz.provider';
import { Analytics } from '@vercel/analytics/react';
import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => {
	return (
		<>
			<Analytics />
			<div className='h-screen flex flex-col'>
				<Navbar />
				<div className='flex flex-col flex-1 h-full overflow-auto bg-gray-50 '>
					<div className='flex-1 p-3 overflow-auto '>
						<div className=' bg-white overflow-auto h-full rounded-lg'>
							<QuizStoreProvider>
								<Outlet />
							</QuizStoreProvider>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
