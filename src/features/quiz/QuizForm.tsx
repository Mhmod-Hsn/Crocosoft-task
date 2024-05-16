'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ROUTES } from '@/routes';
import { useQuizStore } from '@/stores/quiz.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Quiz, QuizSchema } from './types';

const newAnswer = () => {
	return {
		id: 0,
		text: '',
		is_true: false,
	};
};
const newQuestion = () => {
	return {
		id: 0,
		text: '',
		answer_id: null,
		feedback_false: '',
		feedback_true: '',
		answers: [newAnswer()],
	};
};

export const QuizForm = ({ data }: { data?: Quiz }) => {
	const isEdit = !!data;
	const { createQuiz, updateQuiz } = useQuizStore((store) => store);
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof QuizSchema>>({
		resolver: zodResolver(QuizSchema),
		defaultValues: {
			id: data?.id ?? undefined,
			title: data?.title ?? '',
			description: data?.description ?? '',
			url: data?.url ?? '',
			questions_answers: data?.questions_answers ?? [newQuestion()],
		},
	});

	const handleAddingNewQuestion = () => {
		form.setValue('questions_answers', [
			...(form.getValues('questions_answers') || []),
			newQuestion(),
		]);
	};

	const handleAddingNewAnswerOption = (id: number) => {
		form.setValue(`questions_answers.${id}.answers`, [
			...(form.getValues(`questions_answers.${id}.answers`) || []),
			{ id: 0, text: '', is_true: false },
		]);
	};

	const handleDeleteQuestion = (id: number) => {
		form.setValue(
			'questions_answers',
			form.getValues('questions_answers')?.filter((q) => q.id !== id)
		);
	};

	const handleDeleteOption = (questionId: number, answerId: number) => {
		form.setValue(
			`questions_answers.${questionId}.answers`,
			form
				.getValues(`questions_answers.${questionId}.answers`)
				.filter((a) => a.id !== answerId)
		);
	};

	const markAnswerAsTrue = (questionId: number, answerId: number) => {
		// disable other answers
		const answers =
			form.getValues(`questions_answers.${questionId}.answers`) || [];
		answers.forEach((element, index) => {
			form.setValue(
				`questions_answers.${questionId}.answers.${index}.is_true`,
				false
			);
		});

		form.setValue(
			`questions_answers.${questionId}.answers.${answerId}.is_true`,
			true
		);
	};

	const questionsWatch = form.watch('questions_answers');

	console.log('Errors: ', form.formState.errors);
	async function onSubmit(values: z.infer<typeof QuizSchema>) {
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
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* //*Questions */}
				<div className=''>
					<p className='text-sm font-semibold'>Questions & Answers</p>
					{(questionsWatch || []).map((question, index) => (
						<div
							key={`question-${index}`}
							className='mb-8 mt-2 border rounded p-2 bg-slate-50'
						>
							<FormField
								control={form.control}
								name={`questions_answers.${index}.text`}
								render={({ field }) => (
									<FormItem className='mb-4'>
										<FormLabel>Question #{index + 1}</FormLabel>
										<FormControl>
											<Input
												placeholder='Question'
												{...field}
												className='bg-white'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* //*Answers */}
							<div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-2'>
								{/* Render Answers */}
								{(question.answers || []).map((answer, answerIndex) => (
									<div key={`qestion-${index}-answer-${answerIndex}`}>
										<FormField
											control={form.control}
											name={`questions_answers.${index}.answers.${answerIndex}.text`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Answer #{answerIndex + 1}</FormLabel>
													<FormControl>
														<Input
															placeholder='Answer'
															{...field}
															className='bg-white'
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className='flex justify-between mt-2'>
											<div className='flex items-center justify-between space-x-2'>
												<Switch
													id={`questions_answers.${index}.answers.${answerIndex}`}
													checked={answer.is_true}
													onCheckedChange={() =>
														markAnswerAsTrue(index, answerIndex)
													}
												/>
												<Label
													htmlFor={`questions_answers.${index}.answers.${answerIndex}`}
												>
													Correct answer
												</Label>
											</div>
											{index !== 0 && (
												<Button
													className='mt-2 mr-2 bg-red-500 hover:bg-red-700'
													size='sm'
													type='button'
													onClick={() => handleDeleteQuestion(index)}
												>
													Remove Answer
												</Button>
											)}
										</div>
									</div>
								))}
							</div>

							{/* //* Answer Actions */}
							<div className='mt-4 flex gap2'>
								<Button
									className='mt-2 mr-2'
									size='sm'
									type='button'
									onClick={() => handleAddingNewAnswerOption(index)}
								>
									Add new Answer
								</Button>

								{index !== 0 && (
									<Button
										className='mt-2 mr-2 bg-red-500 hover:bg-red-700'
										size='sm'
										type='button'
										onClick={() => handleDeleteQuestion(index)}
									>
										Remove Question
									</Button>
								)}
							</div>
						</div>
					))}
				</div>
				<Button size='sm' type='button' onClick={handleAddingNewQuestion}>
					Add new question
				</Button>

				<div className='flex justify-end mt-6 pt-4 border-t '>
					<Button type='submit' disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting
							? 'Loading...'
							: isEdit
							? 'Update'
							: 'Create'}
					</Button>
				</div>
			</form>
		</Form>
	);
};
