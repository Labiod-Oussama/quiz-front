import { useContext } from 'react';
import { QuizContext } from './quiz-context';




export const useQuizContext = () => {
    const context = useContext(QuizContext);

    if (!context) throw new Error('useQuizContext context must be use inside AuthProvider');

    return context;
};
