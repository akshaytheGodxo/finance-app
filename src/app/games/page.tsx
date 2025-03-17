// Home.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Quiz from '../_components/ui/quiz';
import { Input } from '~/components/ui/input';
import { Button } from '../_components/globals/btn';
export default function QuizGame() {
	const [quizStarted, setQuizStarted] = useState(false);
	const [name, setName] = useState('');

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-[#2b2b2b] text-white p-6">
			<motion.div 
				initial={{ opacity: 0, y: -50 }} 
				animate={{ opacity: 1, y: 0 }} 
				transition={{ duration: 0.5 }}
				className="text-center mb-6"
			>
				<h1 className='text-4xl font-bold text-white font-poppins'>
				Pookie  Quiz
                </h1>
				<h3 className='text-lg text-gray-300'>Quiz App</h3>
			</motion.div>

			{quizStarted ? (
				<motion.div 
					initial={{ opacity: 0, scale: 0.9 }} 
					animate={{ opacity: 1, scale: 1 }} 
					transition={{ duration: 0.5 }}
				>
					<Quiz name={name} />
				</motion.div>
			) : (
				<motion.div 
					initial={{ opacity: 0, y: 50 }} 
					animate={{ opacity: 1, y: 0 }} 
					transition={{ duration: 0.5 }}
					className="w-full max-w-md bg-[#33333] p-6 rounded-lg shadow-lg"
				>
					<div className="mb-4">
						<label htmlFor="nameInput" className="block text-sm font-medium text-gray-300 mb-2">
							Enter Your Name:
						</label>
						<Input
							type="text"
							id="nameInput"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full bg-gray-700 text-white border-none focus:ring-2 focus:ring-green-400"
						/>
					</div>
					<Button
						onClick={() => setQuizStarted(true)}
						className="w-full bg-[#BFAFF2] hover:bg-[#8b74d7] text-white font-semibold py-2 px-4 rounded-lg transition-all"
						disabled={!name.trim()}
					>
						Start Quiz
					</Button>
				</motion.div>
			)}
		</div>
	);
}
