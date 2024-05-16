import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { DefaultLayout } from './layouts/DefaultLayout';
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
				element: 'create',
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
