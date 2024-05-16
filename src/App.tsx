import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { DefaultLayout } from './layouts/DefaultLayout';
import { CreateQuiz } from './pages/CreateQuiz';
import { ROUTES } from './routes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: `${ROUTES.HOME}`,
				element: 'home',
			},
			{
				path: `${ROUTES.CREATE}`,
				element: <CreateQuiz />,
			},
		],
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
