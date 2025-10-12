import React, { useEffect, useState } from 'react'
import { getQuizDataClient, type QuizDataRow } from '../auth/getQuizData'



const QuizSection: React.FC = () => {
	const modules = Array.from({ length: 11 }, (_, i) => `Module ${i + 1}`)

	const [quizByModule, setQuizByModule] = useState<Record<number, QuizDataRow[]>>({})
 	const [loading, setLoading] = useState<boolean>(true)

	// activeModule is an index (0 => Module 1)
	const [activeModule, setActiveModule] = useState<number>(0)
	const [currentQ, setCurrentQ] = useState<number>(0)
	const [selectedOptions, setSelectedOptions] = useState<Record<number, number | null>>({})
	const [submitted, setSubmitted] = useState<Record<number, boolean>>({})
	const [finished, setFinished] = useState<boolean>(false)

	useEffect(() => {
		let mounted = true
		setLoading(true)
		getQuizDataClient()
			.then(rows => {
				if (!mounted) return
				
				const grouped: Record<number, QuizDataRow[]> = {}
				rows.forEach(r => {
					const m = Number(r.module) || 0
					if (!grouped[m]) grouped[m] = []
					grouped[m].push(r)
				})
				// sort each module by id to preserve order
				Object.values(grouped).forEach(arr => arr.sort((a, b) => a.id - b.id))
				setQuizByModule(grouped)
			})
			.catch(err => {
				console.error('Error loading quiz data', err)
			})
			.finally(() => setLoading(false))

		return () => {
			mounted = false
		}
	}, [])

	const resetStateForModule = () => {
		setCurrentQ(0)
		setSelectedOptions({})
		setSubmitted({})
		setFinished(false)
	}

	const handleSelectModule = (idx: number) => {
		setActiveModule(idx)
		resetStateForModule()
	}

	const handleSelectOption = (optionIdx: number) => {
		if (submitted[currentQ] || finished) return
		setSelectedOptions(prev => ({ ...prev, [currentQ]: optionIdx }))
	}

	const handleDone = () => {
		if (selectedOptions[currentQ] == null) return
		setSubmitted(prev => ({ ...prev, [currentQ]: true }))
	}

	const handleNext = () => {
		const moduleNumber = activeModule + 1
		const qs = quizByModule[moduleNumber] ?? []
		setCurrentQ(prev => Math.min(prev + 1, Math.max(0, qs.length - 1)))
	}

	const handleFinish = () => {
		// ensure current question is submitted if an option was chosen
		const qs = questions
		if (qs.length === 0) return
		// only finish if we are on the last question
		if (currentQ >= qs.length - 1) {
			if (selectedOptions[currentQ] != null) {
				setSubmitted(prev => ({ ...prev, [currentQ]: true }))
			}
			setFinished(true)
		}
	}

	// helpers to access current module's questions
	const moduleNumber = activeModule + 1
	const currentModuleQuestions = quizByModule[moduleNumber] ?? []
	const questions = currentModuleQuestions.map(r => ({
		id: r.id,
		text: r.question,
		options: [r.option_1, r.option_2, r.option_3, r.option_4].filter(o => o != null) as string[],
		answerText: r.answer,
	}))

	const correctCount = questions.reduce((acc, q, i) => {
		const sel = selectedOptions[i]
		if (sel == null) return acc
		return q.options[sel] === q.answerText ? acc + 1 : acc
	}, 0)
	const scorePercent = questions.length ? Math.round((correctCount / questions.length) * 100) : 0
	const passed = scorePercent >= 50

	return (
		<div className="flex flex-col md:flex-row gap-6 p-4">
			{/* Left Side - Modules List (hidden on mobile) */}
			<div className="hidden md:block md:w-1/4 bg-gray-100 rounded-md p-4">
				<h3 className="font-bold mb-4">Modules</h3>
				{/* allow long lists to scroll on medium+ screens */}
				<ul className="list-disc list-inside space-y-2 text-gray-700 max-h-72 md:max-h-[60vh] overflow-auto">
					{modules.map((m, idx) => (
						<li
							key={m}
							onClick={() => handleSelectModule(idx)}
							className={
								'px-4 py-2 m-2 font-bold rounded-lg hover:shadow-lg cursor-pointer transition ' +
								(idx === activeModule
									? 'bg-green-400 hover:bg-green-500'
									: 'hover:bg-gray-50')
							}
						>
							{m}
						</li>
					))}
				</ul>
			</div>

			{/* Right Side - Questions and Options */}
			<div className="w-full md:w-3/4 bg-gray-100 rounded-md p-4 md:p-6">
				{/* Mobile: compact modules dropdown so user doesn't need to scroll */}
				<div className="md:hidden mb-4 flex justify-center">
					<label htmlFor="mobile-modules" className="sr-only">Select Module</label>
					<select
						id="mobile-modules"
						className="max-w-xs w-full px-3 py-1.5 text-sm border rounded-md bg-white text-gray-800 shadow-sm"
						value={String(activeModule)}
						onChange={e => handleSelectModule(Number(e.target.value))}
					>
						{modules.map((m, idx) => (
							<option key={m} value={idx} className="text-sm">
								{m}
							</option>
						))}
					</select>
				</div>
				<h2 className="text-2xl font-bold mb-6 text-gray-800">Quiz Questions</h2>



				<div className="space-y-6">
					{/* Render current question or an empty state */}
					{questions.length === 0 ? (
						<p className="text-gray-600">No questions available for this module.</p>
					) : (
						<>
							<h3 className="font-semibold mb-2 text-gray-700">
								{currentQ + 1}. {questions[currentQ]?.text}
							</h3>
							<ul className="list-disc list-inside space-y-2 text-gray-700">
								{questions[currentQ].options.map((opt, idx) => {
									const isSelected = selectedOptions[currentQ] === idx
									const isSubmitted = submitted[currentQ] || finished
									const isCorrect = opt === questions[currentQ].answerText

									let optionClass = 'px-4 py-2 bg-white rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition'
									if (isSelected && !isSubmitted) optionClass = 'px-4 py-2 bg-blue-100 rounded-lg hover:shadow-lg cursor-pointer transition'
									if (isSubmitted) {
										if (isCorrect) optionClass = 'px-4 py-2 bg-green-100 rounded-lg cursor-default'
										else if (isSelected && !isCorrect) optionClass = 'px-4 py-2 bg-red-100 rounded-lg cursor-default'
										else optionClass = 'px-4 py-2 bg-white rounded-lg cursor-default'
									}

									return (
										<li
											key={idx}
											onClick={() => handleSelectOption(idx)}
											className={optionClass}
										>
											{opt}
										</li>
									)
								})}
								</ul>
						</>
					)}
				</div>

				{/* responsive buttons: stack on xs, row on sm+ */}
				<div className="flex flex-col sm:flex-row sm:justify-between items-center mt-6 gap-4">
					<div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-start">
						<button
							onClick={handleDone}
							disabled={selectedOptions[currentQ] == null || submitted[currentQ] || finished}
							className={`px-4 py-2 rounded-lg w-full sm:w-auto transition ${selectedOptions[currentQ] == null || submitted[currentQ] || finished ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
						>
							Done
						</button>
						<button
							onClick={handleNext}
							disabled={questions.length === 0 || currentQ >= questions.length - 1}
							className={`px-4 py-2 rounded-lg w-full sm:w-auto transition ${questions.length === 0 || currentQ >= questions.length - 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
						>
							Next
						</button>
					</div>
					<div className="w-full sm:w-auto flex justify-center sm:justify-end">
						<button
							onClick={handleFinish}
							disabled={questions.length === 0 || currentQ < questions.length - 1}
							className={`px-4 py-2 rounded-lg w-full sm:w-auto transition ${questions.length === 0 || currentQ < questions.length - 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
						>
							Finish
						</button>
					</div>
				</div>

				{loading && <p className="mt-4 text-gray-600">Loading questions...</p>}

				{/* score box full width on small */}
				{finished && (
					<div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-md w-full">
						<p className="text-gray-600 font-medium text-xl">Your Score: {scorePercent}%</p>
						<p className={passed ? 'text-green-600 font-bold text-2xl' : 'text-red-600 font-bold text-2xl'}>
							Status: {passed ? 'Passed' : 'Failed'}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default QuizSection
