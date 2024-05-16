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
import { ROUTES } from '@/routes';
import { useQuizStore } from '@/stores/quiz.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Quiz, QuizSchema } from './types';

export const QuizForm = ({ data }: { data?: Quiz }) => {
	const { createQuiz, updateQuiz } = useQuizStore((store) => store);
	const navigate = useNavigate();

	const isEdit = !!data;

	const form = useForm<z.infer<typeof QuizSchema>>({
		resolver: zodResolver(QuizSchema),
		defaultValues: {
			id: data?.id ?? undefined,
			title: data?.title ?? '',
			description: data?.description ?? '',
			url: data?.url ?? '',
			questions_answers: data?.questions_answers ?? [],
		},
	});

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
				<Button type='submit' disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting
						? 'Loading...'
						: isEdit
						? 'Update'
						: 'Create'}
				</Button>
			</form>
		</Form>
	);
};
