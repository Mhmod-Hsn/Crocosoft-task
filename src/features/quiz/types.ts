import { z } from 'zod';

const QuizAnswerSchema = z.object({
	id: z.number(),
	is_true: z.boolean(),
	text: z.string(),
});

const QuizQuestionSchema = z.object({
	answer_id: z.null(),
	answers: z.array(QuizAnswerSchema),
	feedback_false: z.string(),
	feedback_true: z.string(),
	id: z.number(),
	text: z.string(),
});

export const QuizSchema = z.object({
	created: z.string(),
	description: z.string(),
	id: z.number(),
	modified: z.string(),
	questions_answers: z.array(QuizQuestionSchema),
	score: z.null(),
	title: z.string(),
	url: z.string().url(),
});


export type QuizAnswer = {
	id: number;
	is_true: boolean;
	text: string;
};

export type QuizQuestion = {
	answer_id: null;
	answers: QuizAnswer[];
	feedback_false: string;
	feedback_true: string;
	id: number;
	text: string;
};

export type Quiz = {
	created: string;
	description: string;
	id: number;
	modified: string;
	questions_answers: QuizQuestion[];
	score: null;
	title: string;
	url: string;
};