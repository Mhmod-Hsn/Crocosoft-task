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

	if (!quizzes.length) {
		return (
			<div className='flex flex-col text-center gap-3 p-4'>
				<h1 className='text-3xl font-bold'>No Quizzes Found</h1>
				<p className='text-lg'>Please create a new quiz</p>
			</div>
		);
	}

	return (
		<div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 p-3'>
			{orderedQuizzes.map((quiz) => (
				<Link key={quiz.id} to={`/${ROUTES.QUIZ}/${quiz.id}`}>
					<SingleQuizCard data={quiz} />
				</Link>
			))}
		</div>
	);
};
