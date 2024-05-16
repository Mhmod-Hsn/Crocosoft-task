import { generateId } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { QuizFormSchemaType } from './types';

export const newAnswer = (isTrue: boolean = false) => {
	return {
		id: generateId(),
		text: '',
		is_true: isTrue,
	};
};
export const newQuestion = () => {
	return {
		id: generateId(),
		text: '',
		answer_id: null,
		feedback_false: '',
		feedback_true: '',
		answers: [newAnswer(true)],
	};
};

export const handleAddingNewQuestion = (
	form: UseFormReturn<QuizFormSchemaType>
) => {
	form.setValue('questions_answers', [
		...(form.getValues('questions_answers') || []),
		newQuestion(),
	]);
};

export const handleAddingNewAnswerOption = (
	form: UseFormReturn<QuizFormSchemaType>,
	id: number
) => {
	form.setValue(`questions_answers.${id}.answers`, [
		...(form.getValues(`questions_answers.${id}.answers`) || []),
		newAnswer(),
	]);
};

export const handleDeleteQuestion = (
	form: UseFormReturn<QuizFormSchemaType>,
	questionIdx: number
) => {
	form.setValue(
		'questions_answers',
		form
			.getValues('questions_answers')
			?.filter((_, index) => index !== questionIdx)
	);
};

export const handleDeleteOption = (
	form: UseFormReturn<QuizFormSchemaType>,
	questionIdx: number,
	answerIdx: number
) => {
	form.setValue(
		`questions_answers.${questionIdx}.answers`,
		form
			.getValues(`questions_answers.${questionIdx}.answers`)
			?.filter((_, index) => index !== answerIdx)
	);
};

export const markAnswerAsTrue = (
	form: UseFormReturn<QuizFormSchemaType>,
	questionIdx: number,
	answerIdx: number
) => {
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
