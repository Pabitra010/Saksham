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
  { name: "FeedBack", },
];

const ClassRoomPage = () => {

  const [activeItem, setActiveItem] = useState("About Course");


  React.useEffect(() => {
    const firstItem = Listtype[0].name;
    setActiveItem(firstItem);
  }, []);


  return (
    <div className='w-full px-5 py-3 mt-17 rounded-lg'>
      <div className='flex items-center font-bold text-blue-900 bg-gray-200 rounded-lg'>
        {Listtype.map((item, index) => (
          <div key={index} onClick={() => setActiveItem(item.name)} className='px-4 py-2 m-2 rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-100 transition'>
            {item.name}
          </div>
        ))}
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
          {activeItem === "FeedBack" && (
            <div className='p-4'>
              <h2 className='text-2xl font-bold mb-4'>FeedBack</h2>
              <p>This section contains information about the feedback process, including how to submit feedback and what to expect.</p>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div >
  )
}

export default ClassRoomPage
