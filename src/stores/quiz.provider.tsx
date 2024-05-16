import { createContext, useContext, useRef, type ReactNode } from 'react';
import { useStore, type StoreApi } from 'zustand';

import { createQuizStore, type Store } from './quiz.store';

export const QuizStoreContext = createContext<StoreApi<Store> | null>(null);

export interface QuizStoreProviderProps {
	children: ReactNode;
}

export const QuizStoreProvider = ({ children }: QuizStoreProviderProps) => {
	const storeRef = useRef<StoreApi<Store>>();
	if (!storeRef.current) {
		// @ts-expect-error because of using persist
		storeRef.current = createQuizStore();
	}

	return (
		<QuizStoreContext.Provider
			// @ts-expect-error because of using persist
			value={storeRef.current}
		>
			{children}
		</QuizStoreContext.Provider>
	);
};

export const useQuizStore = <T,>(selector: (store: Store) => T): T => {
	const storeContext = useContext(QuizStoreContext);

	if (!storeContext) {
		throw new Error(`useQuizStore must be use within QuizStoreProvider`);
	}

	return useStore(storeContext, selector);
};
