'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Quiz, QuizFormSchemaType, QuizSchema } from '@/features/quiz/types';
import { generateId } from '@/lib/utils';
import { ROUTES } from '@/routes';
import { useQuizStore } from '@/stores/quiz.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { QuizFormQuestion } from './components/QuizFormQuestion';
import { handleAddingNewQuestion, newQuestion } from './utils';

export const QuizForm = ({ data }: { data?: Quiz }) => {
	const isEdit = !!data;
	const { createQuiz, updateQuiz } = useQuizStore((store) => store);
	const navigate = useNavigate();

	const form = useForm<QuizFormSchemaType>({
		resolver: zodResolver(QuizSchema),
		defaultValues: {
			id: data?.id ?? generateId(),
			title: data?.title ?? '',
			description: data?.description ?? '',
			score: data?.score ?? 0,
			url: data?.url ?? '',
			questions_answers: data?.questions_answers ?? [newQuestion()],
			modified: data?.modified ?? '',
			created: data?.created ?? '',
		},
	});

	const questionsWatch = form.watch('questions_answers');

	async function onSubmit(values: QuizFormSchemaType) {
		// ✅ This will be type-safe and validated.
		console.log(values);
		// fake waiting
		await new Promise((resolve) =>
			setTimeout(() => {
				if (isEdit) {
					updateQuiz(values);
				} else {
					createQuiz(values);
				}

				navigate(ROUTES.HOME);
				resolve(null);
			}, 1000)
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='Title' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder='Description' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='url'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Url</FormLabel>
							<FormControl>
								<Input placeholder='Url' {...field} />
							</FormControl>
							<FormDescription>
								{field.value && (
									<a
										href={field.value}
										rel='noreferrer'
										target='_blank'
										className='underline underline-offset-2'
									>
										Explore URL
									</a>
								)}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* //*Questions */}
				<div className=''>
					<p className='text-sm font-semibold'>Questions & Answers</p>
					{(questionsWatch || []).map((question, questionIdx) => (
						<QuizFormQuestion
							key={`question-${questionIdx}`}
							form={form}
							question={question}
							index={questionIdx}
						/>
					))}
				</div>
				<div>
					<Button
						size='sm'
						variant='ghost'
						type='button'
						onClick={() => handleAddingNewQuestion(form)}
					>
						<Plus size={16} className='mr-2' />
						Add new question
					</Button>
				</div>

				<div className='flex justify-end mt-6 pt-4 border-t '>
					<Button type='submit' disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Loading...
							</>
						) : isEdit ? (
							'Update'
						) : (
							'Create'
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};
