import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { DefaultLayout } from './layouts/DefaultLayout';
import { CreateQuiz } from './pages/CreateQuiz';
import { ListQuizzes } from './pages/ListQuizzes';
import { ROUTES } from './routes';
import { EditQuiz } from './pages/EditQuiz';

const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: `${ROUTES.HOME}`,
				element: <ListQuizzes />,
			},
			{
				path: `${ROUTES.CREATE}`,
				element: <CreateQuiz />,
			},
			{
				path: `${ROUTES.QUIZ}/:id`,
				element: <EditQuiz />,
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
