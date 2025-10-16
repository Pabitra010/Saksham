"use client";
import FooterPage from "@/components/Footer";
import React, { useState } from "react";
import { communitySupportList } from "@/lib/ComunitySupports";
import CommunitySupportForm from "@/app/_componets/CommunitySupportForm";

const CommunitySupportsPage = () => {
  const communitySupports = communitySupportList;
  const [selectedSupport, setSelectedSupport] = useState<
    null | (typeof communitySupportList)[0]
  >(null);
  const [requestInput, setRequestInput] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  
  // Form states for community support requests
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [formSubmitMessage, setFormSubmitMessage] = useState<string>("");

  const handleSubmitRequest = async () => {
    if (!requestInput.trim()) {
      setSubmitMessage("Please enter your request before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Call API to send immediate notification
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: requestInput.trim(),
          timestamp: new Date().toISOString(),
          category: 'immediate', // This will trigger immediate notification
          type: 'immediate_request'
        }),
      });

      if (response.ok) {
        setSubmitMessage("Your request has been submitted successfully! You will be contacted soon.");
        setRequestInput("");
      } else {
        setSubmitMessage("There was an error submitting your request. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      setSubmitMessage("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommunityFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      setFormSubmitMessage("Please fill in your name and describe your situation.");
      return;
    }

    setIsFormSubmitting(true);
    setFormSubmitMessage("");

    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: formData.message.trim(),
          timestamp: new Date().toISOString(),
          category: selectedSupport?.name, // This will NOT trigger immediate notification
          user_name: formData.name.trim(),
          user_phone: formData.phone.trim() || undefined,
          user_email: formData.email.trim() || undefined,
          type: 'community_support_request'
        }),
      });

      if (response.ok) {
        setFormSubmitMessage("Your request has been submitted successfully! Our team will review it and contact you soon.");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setFormSubmitMessage("There was an error submitting your request. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting community support request:', error);
      setFormSubmitMessage("There was an error submitting your request. Please try again.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <div className="mt-16 w-full">
      <div className="bg-[#227dba] w-full px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Community Supports
          </h1>
          <p className="text-white mt-2 sm:mt-4 text-sm sm:text-base md:text-lg max-w-3xl">
            Find local resources and support services in your community.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
            <input
              type="text"
              value={requestInput}
              onChange={(e) => setRequestInput(e.target.value)}
              placeholder="Write your Request..."
              className="px-4 sm:px-6 py-3 sm:py-4 rounded-full w-full sm:w-2/3 md:w-1/2 bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#f8ff36] transition-all duration-300"
              disabled={isSubmitting}
            />
            <button 
              onClick={handleSubmitRequest}
              disabled={isSubmitting}
              className="sm:ml-4 px-4 sm:px-6 py-3 sm:py-4 bg-[#f8ff36] text-base sm:text-lg md:text-xl font-bold text-black rounded-full cursor-pointer hover:bg-yellow-300 transition-colors duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Your Request'}
            </button>
          </div>
          
          {/* Status Message */}
          {submitMessage && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              submitMessage.includes('successfully') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {submitMessage}
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-10 md:py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A5276] text-center sm:text-left">
              Available Community Supports
            </h2>
            <p className="text-gray-600 mt-2 sm:mt-4 text-sm sm:text-base md:text-lg text-center sm:text-left max-w-3xl">
              Explore the various support services available in your area.
            </p>
            {!selectedSupport ? (
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {communitySupports.map((support, index) => (
                  <div onClick={()=>{setSelectedSupport(support)}}
                    key={index}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100 hover:border-[#227dba]"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-[#1A5276] mb-2">
                      {support.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {support.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4">
                <button
                  onClick={() => setSelectedSupport(null)}
                  className="mb-4 text-sm text-blue-600 underline"
                >
                  ← Back to list
                </button>

                <h2 className="text-2xl font-bold mb-2 text-blue-800">
                  {selectedSupport.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {selectedSupport.description}
                </p>

                {/* Community Support Request Form */}
                <form onSubmit={handleCommunityFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                      className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isFormSubmitting}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Your contact number"
                      className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isFormSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your.email@example.com"
                      className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isFormSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Describe Your Situation *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Please describe your specific needs and situation in detail..."
                      rows={4}
                      className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isFormSubmitting}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isFormSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isFormSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
                
                {/* Form Status Message */}
                {formSubmitMessage && (
                  <div className={`mt-4 p-3 rounded-lg text-sm ${
                    formSubmitMessage.includes('successfully') 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {formSubmitMessage}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default CommunitySupportsPage;
