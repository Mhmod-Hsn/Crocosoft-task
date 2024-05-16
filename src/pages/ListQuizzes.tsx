import { SingleQuizCard } from '@/features/quiz/SingleQuizCard';
import { ROUTES } from '@/routes';
import { useQuizStore } from '@/stores/quiz.provider';
import { Link } from 'react-router-dom';

export const ListQuizzes = () => {
	const { quizzes } = useQuizStore((store) => store);

	return (
		<div className='flex flex-col gap-3 p-3'>
			{quizzes.map((quiz) => (
				<Link key={quiz.id} to={`/${ROUTES.QUIZ}/${quiz.id}`}>
					<SingleQuizCard data={quiz} />
				</Link>
			))}
		</div>
	);
};
