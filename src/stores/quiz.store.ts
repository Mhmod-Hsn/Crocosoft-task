import { Quiz } from '@/features/quiz/types';
import { getCurrentDateTime } from '@/lib/utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const START_ID = 1000;

export type State = {
	quizzes: Quiz[];
};

export type Store = {
	// extra types here
} & State &
	ReturnType<typeof reducers>;

const initialState = {
	quizzes: [],
};

const reducers = (set: any, get: any) => ({
	setQuizzes: (data: Quiz[]) => set({ quizzes: data }),

	createQuiz: (data: Quiz) => {
		const newId = get().quizzes.length
			? get().quizzes[get().quizzes.length - 1].id + 1
			: START_ID;

		const newData = {
			...data,
			id: newId,
			created: getCurrentDateTime(),
			modified: getCurrentDateTime(),
		};

		set({
			quizzes: [...get().quizzes, newData],
		});
	},

	updateQuiz: (data: Quiz) => {
		set({
			quizzes: get().quizzes.map((quiz: Quiz) => {
				if (quiz.id === data.id) {
					return {
						...data,
						modified: getCurrentDateTime(),
					};
				}
				return quiz;
			}),
		});
	},

	getQuiz: (id: number) => {
		return get().quizzes.find((quiz: Quiz) => quiz.id === id) || null;
	},
	deleteQuiz: (id: number) => {
		set({
			quizzes: get().quizzes.filter((quiz: Quiz) => quiz.id !== id),
		});
	},
});
export const createQuizStore = (initState: State = initialState) =>
	create(
		persist(
			(set, get) => ({
				...initState,
				...reducers(set, get),
			}),
			{
				name: 'quiz-store',
				getStorage: () => localStorage,
			}
		)
	);
