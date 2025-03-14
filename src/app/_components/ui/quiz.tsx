// Quiz.tsx
import React, { useState } from 'react';
import { quiz } from '~/app/games/question-sets';

import ScoreCard from './scorecard';
interface QuizProps {
	name: string;
}

interface Question {
    id: number;
	question: string;
	answers: string[];
	correctAnswer: string;
}

interface QuizResult {
	score: number;
	correctAnswers: number;
	wrongAnswers: number;
} 

const Quiz: React.FC<QuizProps> = ({ name }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string>('');
	const [answerChecked, setAnswerChecked] = useState<boolean>(false);
	const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
	const [showResults, setShowResults] = useState<boolean>(false);
	const [quizResult, setQuizResult] = useState<QuizResult>({
		score: 0,
		correctAnswers: 0,
		wrongAnswers: 0,
	});

	const { questions } = quiz;
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        return <div className='text-white text-center'> Loading...</div>
    }

    const { question, answers, correctAnswer } = currentQuestion;

	const onAnswerSelected = (answer: string, idx: number) => {
		setSelectedAnswerIndex(idx);
		setSelectedAnswer(answer);
		setAnswerChecked(true);
	};

	const handleNextQuestion = () => {
		if (selectedAnswer === correctAnswer) {
			setQuizResult((prev) => ({
				...prev,
				score: prev.score + 5,
				correctAnswers: prev.correctAnswers + 1,
			}));
		} else {
			setQuizResult((prev) => ({
				...prev,
				wrongAnswers: prev.wrongAnswers + 1,
			}));
		}
		if (currentQuestionIndex !== questions.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		} else {
			setShowResults(true);
		}
		setSelectedAnswer('');
		setSelectedAnswerIndex(null);
		setAnswerChecked(false);
	};

	return (
		<div className='max-w-2xl mx-auto mt-10 p-5 bg-gray-800 text-white rounded-lg shadow-lg'>
			<div>
				{!showResults ? (
					<div className='p-4'>
						<h4 className='text-xl font-semibold mb-4'>{question}</h4>
						<ul className='space-y-2'>
							{answers.map((answer, idx) => (
								<li
									key={idx}
									onClick={() => onAnswerSelected(answer, idx)}
									className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedAnswerIndex === idx ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
								>
									{answer}
								</li>
							))}
						</ul>
						<div className='flex justify-between items-center mt-4'>
							<b className='text-sm'>Question {currentQuestionIndex + 1}/{questions.length}</b>
							<button
								onClick={handleNextQuestion}
								className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-500'
								disabled={!answerChecked}
							>
								{currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next Question'}
							</button>
						</div>
					</div>
				) : (
					<ScoreCard quizResult={quizResult} questions={questions} name={name} />
				)}
			</div>
		</div>
	);
};

export default Quiz;
