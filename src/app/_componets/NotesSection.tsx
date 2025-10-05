import React from 'react'

const NotesSection = () => {
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
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Module 1 Notes: Disaster Management Vocabulary</h2>
                <div className="space-y-6">
                    {/* Note 1 */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="font-semibold mb-2 text-gray-700">Module 1: Introduction to Disaster Awareness</h3>
                        <p className="text-gray-600">This module covers the basics of disaster awareness, including types of disasters, their causes, and the importance of preparedness. Key topics include understanding natural
                            disasters such as earthquakes, floods, and hurricanes, as well as man-made disasters like industrial accidents. The module emphasizes the need for early warning systems and community involvement in disaster preparedness.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesSection
