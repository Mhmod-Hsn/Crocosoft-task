import { Button } from '@/components/ui/button';
import { useQuizStore } from '@/stores/quiz.provider';
import { Quiz } from './types';
import { useNavigate } from 'react-router-dom';

type Props = {
	data: Quiz;
};

export const SingleQuizCard = ({
	data: { id, title, created, description },
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
    navigate(0)
	};
	return (
		<div className='border mb-2 p-4 rounded hover:bg-slate-300/5'>
			<div className='flex justify-between items-center'>
				<h6 className='font-semibold'>{title}</h6>
				<p className='text-xs'>{created}</p>
			</div>
			<p className='text-sm'>{description}</p>
			<div className='flex justify-end'>
				<Button className='bg-red-500 hover:bg-red-700' size={'sm'} onClick={handleDelete}>
					Delete
				</Button>
			</div>
		</div>
	);
};
