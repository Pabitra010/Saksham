"use client";
import QuizSection from "@/app/_componets/QuizSection";
import NotesSection from "@/app/_componets/NotesSection";
import React, { useState, useEffect } from "react";



interface QuizData {
  module: number;
  id: number;
  question: string;
  options: string[];
  answer: string;
};
const Listtype = [
  { name: "About Course", },
  { name: "Notes", },
  { name: "Quiz", },
  { name: "Final Exam", },
];

const ClassRoomPage = () => {

  const [activeItem, setActiveItem] = useState("About Course");


  React.useEffect(() => {
    const firstItem = Listtype[0].name;
    setActiveItem(firstItem);
  }, []);


  return (
    <div className='w-full px-5 py-3 mt-17 rounded-lg'>
      {/* Responsive tab bar: horizontal scroll on small screens, wrapped on md+ */}
      <div className="bg-gray-200 rounded-lg">
        <div className="flex gap-2 px-2 py-2 overflow-x-auto md:flex-wrap md:justify-start">
          {Listtype.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveItem(item.name)}
              className={
                'flex-shrink-0 whitespace-nowrap px-3 py-2 rounded-lg transition ' +
                (activeItem === item.name
                  ? 'bg-white text-blue-900 shadow'
                  : 'text-blue-900 hover:bg-gray-100')
              }
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className='bg-gray-200 mt-3 rounded-md'>
        <div>
          {activeItem === "About Course" && (
            <div className='p-4' >
              <h1 className='text-3xl font-bold text-gray-500 mb-4'>Disaster Awareness and Preparedness</h1>
              <p className='font-bold text-xl text-red-500 underline'>IMPORTANT Instructions for learners - Please read this carefully</p>
              <div className='px-4 py-2 bg-[#E3F0FA] border-l-4 border-l-[#017AFF] my-4'>
                <ul className='list-disc list-inside mt-2 text-gray-700 gap-y-2'>
                  <li>All "Quiz" buttons start in red.</li>
                  <li>If you score 70% or higher, the buttons will change to green</li>
                  <li>If your score is below 70%, the buttons will remain red.</li>
                  <li>Your total score will be shown after you finish the quiz.</li>
                  <li>Final test will appear after completeting all quiz with 70% score</li>
                </ul>
              </div>
            </div>
          )}
          {activeItem === "Notes" && (
            <div>
              <NotesSection />
            </div>
          )}
          {activeItem === "Quiz" && (
            <div>
              <QuizSection />
            </div>
          )}
          {activeItem === "Final Exam" && (
            <div className='p-4 flex flex-col items-center justify-center h-64'>
              <p className="text-gray-600">No Exam Schedule Available Currently</p>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div >
  )
}

export default ClassRoomPage
