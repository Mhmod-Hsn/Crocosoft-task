import { Button } from '@/components/ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { QuizFormSchemaType, QuizQuestion } from '../types';
import { handleAddingNewAnswerOption, handleDeleteQuestion } from '../utils';
import { QuizFormAnswer } from './QuizFormAnswer';

type Props = {
	form: UseFormReturn<QuizFormSchemaType>;
	question: QuizQuestion;
	index: number;
};

export const QuizFormQuestion = ({
	form,
	question,
	index: questionIdx,
}: Props) => {
	const questionsWatch = form.watch('questions_answers');

	return (
		<>
			<div
				key={`question-${questionIdx}`}
				className='mb-8 mt-2 border rounded p-2 bg-slate-50'
			>
				<FormField
					control={form.control}
					name={`questions_answers.${questionIdx}.text`}
					render={({ field }) => (
						<FormItem className='mb-4'>
							<FormLabel>Question #{questionIdx + 1}</FormLabel>
							<FormControl>
								<Input placeholder='Question' {...field} className='bg-white' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* //*Answers */}
				<div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-2'>
					{(question.answers || []).map((answer, answerIdx) => (
						<QuizFormAnswer
							key={`answer-${answerIdx}`}
							form={form}
							questionIdx={questionIdx}
							index={answerIdx}
							answer={answer}
						/>
					))}
				</div>

				{/* //* Answer Actions */}
				<div className='mt-4 flex gap-2'>
					<Button
						size='sm'
						type='button'
						variant='ghost'
						onClick={() => handleAddingNewAnswerOption(form, questionIdx)}
					>
						<Plus size={16} className='mr-2' />
						Add new Answer
					</Button>
				</div>
				<FormField
					control={form.control}
					name={`questions_answers.${questionIdx}.feedback_true`}
					render={({ field }) => (
						<FormItem className='mt-4'>
							<FormLabel>Feedback true</FormLabel>
							<FormControl>
								<Input
									placeholder='Feedback true'
									{...field}
									className='bg-white'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`questions_answers.${questionIdx}.feedback_false`}
					render={({ field }) => (
						<FormItem className='mt-4'>
							<FormLabel>Feedback false</FormLabel>
							<FormControl>
								<Input
									placeholder='Feedback false'
									{...field}
									className='bg-white'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{questionsWatch.length !== 1 && (
					<Button
						className='mt-2 mr-2 text-red-700'
						size='sm'
						variant='ghost'
						type='button'
						onClick={() => handleDeleteQuestion(form, questionIdx)}
					>
						<X size={16} className='mr-2' />
						Remove Question
					</Button>
				)}
			</div>
		</>
	);
};
