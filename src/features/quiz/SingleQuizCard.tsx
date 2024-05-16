import { Button } from '@/components/ui/button';
import { Quiz } from '@/features/quiz/types';
import { useQuizStore } from '@/stores/quiz.provider';
import { useNavigate } from 'react-router-dom';
type Props = {
	data: Quiz;
};

export const SingleQuizCard = ({
	data: { id, title, modified, description, score },
}: Props) => {
	const navigate = useNavigate();
	const { deleteQuiz } = useQuizStore((store) => store);

	const handleDelete = (e) => {
		e.stopPropagation();
		e.preventDefault();

		const c = confirm('Do you want to delete this quiz?');
		if (!c) return;
		if (!id) return;

		deleteQuiz(id);
		navigate(0);
	};
	return (
		<div className='relative group border mb-2 p-4 rounded hover:bg-slate-300/10 hover:shadow-md'>
			<div className='flex justify-between items-center'>
				<h6 className='font-semibold'>{title}</h6>
				<p className='text-xs'>{modified}</p>
			</div>
			<p className='text-sm'>{description}</p>{' '}
			<p className='font-bold mt-2'>{score || 0}/100</p>
			<Button
				className='bg-red-500 hover:bg-red-700 
        absolute bottom-2 right-2 opacity-0 group-hover:opacity-100'
				size={'sm'}
				onClick={handleDelete}
			>
				Delete
			</Button>
		</div>
	);
};
