import { SingleQuizCard } from '@/features/quiz/SingleQuizCard';
import { Quiz } from '@/features/quiz/types';
import { compareDates } from '@/lib/utils';
import { ROUTES } from '@/routes';
import { useQuizStore } from '@/stores/quiz.provider';
import { Link } from 'react-router-dom';

export const ListQuizzes = () => {
	const { quizzes } = useQuizStore((store) => store);

	const orderedQuizzes = [...quizzes].sort((a: Quiz, b: Quiz) =>
		compareDates(a.modified, b.modified)
	);

	return (
		<div className='flex flex-col gap-3 p-3'>
			{orderedQuizzes.map((quiz) => (
				<Link key={quiz.id} to={`/${ROUTES.QUIZ}/${quiz.id}`}>
					{quiz.id}
					<SingleQuizCard data={quiz} />
				</Link>
			))}
		</div>
	);
};
