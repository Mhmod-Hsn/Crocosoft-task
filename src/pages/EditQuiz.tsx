import { QuizForm } from '@/features/quiz/QuizForm';
import { useQuizStore } from '@/stores/quiz.provider';
import { useParams } from 'react-router-dom';

export const EditQuiz = () => {
	const { id } = useParams();
	const { getQuiz } = useQuizStore((store) => store);

	const quiz = getQuiz(Number(id));

	return (
		<div className='flex flex-col gap-3 p-4'>
			<QuizForm data={quiz} />
		</div>
	);
};
