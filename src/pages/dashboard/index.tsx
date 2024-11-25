import PatientExamCard from "./quiz/patientExamCard";
import { useQuizContext } from "src/context/use-quiz-context";
import Quiz from "./quiz/quiz";

export default function QuizView() {
    const { patient, startQuiz } = useQuizContext();

    return (
        <>
            {
                !startQuiz ?
                    <PatientExamCard /> :
                    <Quiz
                        {
                        ...(patient ? { patient } : {})
                        }
                    />
            }
        </>
    )
}
