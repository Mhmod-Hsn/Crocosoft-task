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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Quiz, QuizSchema } from '@/features/quiz/types';
import { generateId } from '@/lib/utils';
import { ROUTES } from '@/routes';
import { useQuizStore } from '@/stores/quiz.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const newAnswer = (isTrue: boolean = false) => {
	return {
		id: generateId(),
		text: '',
		is_true: isTrue,
	};
};
const newQuestion = () => {
	return {
		id: generateId(),
		text: '',
		answer_id: null,
		feedback_false: '',
		feedback_true: '',
		answers: [newAnswer(true)],
	};
};

export const QuizForm = ({ data }: { data?: Quiz }) => {
	const isEdit = !!data;
	const { createQuiz, updateQuiz } = useQuizStore((store) => store);
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof QuizSchema>>({
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

	const handleAddingNewQuestion = () => {
		form.setValue('questions_answers', [
			...(form.getValues('questions_answers') || []),
			newQuestion(),
		]);
	};

	const handleAddingNewAnswerOption = (id: number) => {
		form.setValue(`questions_answers.${id}.answers`, [
			...(form.getValues(`questions_answers.${id}.answers`) || []),
			newAnswer(),
		]);
	};

	const handleDeleteQuestion = (questionIdx: number) => {
		form.setValue(
			'questions_answers',
			form
				.getValues('questions_answers')
				?.filter((_, index) => index !== questionIdx)
		);
	};

	const handleDeleteOption = (questionIdx: number, answerIdx: number) => {
		form.setValue(
			`questions_answers.${questionIdx}.answers`,
			form
				.getValues(`questions_answers.${questionIdx}.answers`)
				?.filter((_, index) => index !== answerIdx)
		);
	};

	const markAnswerAsTrue = (questionIdx: number, answerIdx: number) => {
		// disable other answers
		const answers =
			form.getValues(`questions_answers.${questionIdx}.answers`) || [];
		answers.forEach((_, index) => {
			form.setValue(
				`questions_answers.${questionIdx}.answers.${index}.is_true`,
				false
			);
		});

		// set correct value
		form.setValue(
			`questions_answers.${questionIdx}.answers.${answerIdx}.is_true`,
			true
		);
	};

	const questionsWatch = form.watch('questions_answers');

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
								{(question.answers || []).map((answer, answerIdx) => (
									<div key={`qestion-${questionIdx}-answer-${answerIdx}`}>
										<FormField
											control={form.control}
											name={`questions_answers.${questionIdx}.answers.${answerIdx}.text`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Answer #{answerIdx + 1}</FormLabel>
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
										<div className='flex space-x-4 items-center mt-2'>
											<div className='flex items-center space-x-2 h-8'>
												<Switch
													id={`questions_answers.${questionIdx}.answers.${answerIdx}`}
													checked={answer.is_true}
													onCheckedChange={() =>
														markAnswerAsTrue(questionIdx, answerIdx)
													}
												/>
												<Label
													className='text-sm'
													htmlFor={`questions_answers.${questionIdx}.answers.${answerIdx}`}
												>
													Correct answer
												</Label>
											</div>
											{/* dont delete the correct answer */}
											{question.answers.length !== 1 &&
												!form.getValues(
													`questions_answers.${questionIdx}.answers.${answerIdx}.is_true`
												) && (
													<Button
														className='text-red-700'
														size='sm'
														variant='ghost'
														type='button'
														onClick={() =>
															handleDeleteOption(questionIdx, answerIdx)
														}
													>
														<X size={16} className='mr-2' />
														Remove Answer
													</Button>
												)}
										</div>
									</div>
								))}
							</div>

							{/* //* Answer Actions */}
							<div className='mt-4 flex gap-2'>
								<Button
									size='sm'
									type='button'
									variant='ghost'
									onClick={() => handleAddingNewAnswerOption(questionIdx)}
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
									onClick={() => handleDeleteQuestion(questionIdx)}
								>
									<X size={16} className='mr-2' />
									Remove Question
								</Button>
							)}
						</div>
					))}
				</div>
				<div>
					<Button
						size='sm'
						variant='ghost'
						type='button'
						onClick={handleAddingNewQuestion}
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
