import { z } from 'zod';

const QuizAnswerSchema = z.object({
	id: z.number(),
	is_true: z.boolean(),
	text: z.string().min(1),
});

const QuizQuestionSchema = z.object({
	answer_id: z.null(),
	answers: z.array(QuizAnswerSchema),
	feedback_false: z.string().min(1),
	feedback_true: z.string().min(1),
	id: z.number(),
	text: z.string().min(1),
});

export const QuizSchema = z.object({
	id: z.number(),
	title: z.string().min(1),
	description: z.string().min(1),
	score: z.number().min(0).max(100).optional(),
	// make sure url is youtube url
	url: z
		.string()
		.url()
		.regex(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/),

	questions_answers: z.array(QuizQuestionSchema),
	created: z.string().optional(),
	modified: z.string().optional(),
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
	created?: string;
	description: string;
	id?: number;
	modified?: string;
	questions_answers?: QuizQuestion[];
	score?: number | null;
	title: string;
	url: string;
};
