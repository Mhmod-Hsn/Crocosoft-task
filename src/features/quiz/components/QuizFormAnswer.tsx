import { UseFormReturn } from 'react-hook-form';
import { QuizAnswer, QuizFormSchemaType } from '../types';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { handleDeleteOption, markAnswerAsTrue } from '../utils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type Props = {
	form: UseFormReturn<QuizFormSchemaType>;
	questionIdx: number;
	index: number;
	answer: QuizAnswer;
};

export const QuizFormAnswer = ({ form, questionIdx, index: answerIdx, answer }: Props) => {
	
  const question = form.watch(`questions_answers.${questionIdx}`);

  return (
		<div key={`qestion-${questionIdx}-answer-${answerIdx}`}>
			<FormField
				control={form.control}
				name={`questions_answers.${questionIdx}.answers.${answerIdx}.text`}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Answer #{answerIdx + 1}</FormLabel>
						<FormControl>
							<Input placeholder='Answer' {...field} className='bg-white' />
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
							markAnswerAsTrue(form, questionIdx, answerIdx)
						}
					/>
					<Label
						className='text-sm cursor-pointer'
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
							onClick={() => handleDeleteOption(form, questionIdx, answerIdx)}
						>
							<X size={16} className='mr-2' />
							Remove Answer
						</Button>
					)}
			</div>
		</div>
	);
};
