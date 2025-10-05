import React from 'react'

const QuizSection = () => {
    return (
        <div className="flex gap-6 p-4">
            {/* Left Side - Modules List */}
            <div className="w-1/4 bg-gray-100 rounded-md p-4">
                <h3 className="font-bold mb-4">Modules</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ">
                    <li className="px-4 py-2 m-2 font-bold rounded-lg bg-green-400 hover:shadow-lg cursor-pointer hover:bg-green-500 transition">Module 1</li>
                    <li className="px-4 py-2 m-2 font-bold rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">Module 2</li>
                    <li className="px-4 py-2 m-2 font-bold rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">Module 3</li>
                    <li className="px-4 py-2 m-2 font-bold rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">Module 4</li>
                    <li className="px-4 py-2 m-2 font-bold rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">Module 5</li>
                    <li className="px-4 py-2 m-2 font-bold rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">Module 6</li>
                    <li className="px-4 py-2 m-2 font-bold rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">Module 7</li>
                    <li className="px-4 py-2 m-2 font-bold rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">Module 8</li>
                    <li className="px-4 py-2 m-2 font-bold rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">Module 9</li>
                    <li className="px-4 py-2 m-2 font-bold rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">Module 10</li>
                    <li className="px-4 py-2 m-2 font-bold rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">Module 11</li>
                </ul>
            </div>

            {/* Right Side - Questions and Options */}
            <div className="w-3/4 bg-gray-100 rounded-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Quiz Questions</h2>
                <div className="space-y-6">
                    {/* Question 1 */}
                    <h3 className="font-semibold mb-2 text-gray-700">1. What is the primary purpose of disaster preparedness?</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li className="px-4 py-2 bg-white rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">To respond to disasters after they occur</li>
                        <li className="px-4 py-2 bg-white rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">To minimize the impact of disasters through planning and training</li>
                        <li className="px-4 py-2 bg-white rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">To document disasters for historical records</li>
                        <li className="px-4 py-2 bg-white rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-50 transition">To provide financial aid to disaster victims</li>
                    </ul>
                </div>
                <div className="flex justify-between items-center mt-6">
                    <div className='flex gap-4'>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Done</button>
                        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">Next</button>
                    </div>
                    <div>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Finish</button>
                    </div>
                </div>
                <div className='mt-6 p-4 bg-green-100 border border-green-300 rounded-md'>
                    <p className="text-gray-600 font-medium text-xl">Your Score: 80%</p>
                    <p className="text-green-600 font-bold text-2xl">Status: Passed</p>
                </div>
            </div>
        </div>
    )
}

export default QuizSection
