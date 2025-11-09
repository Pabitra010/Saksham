import React, { useState } from 'react'

type ModulesList = 'Module 1' | 'Module 2' | 'Module 3' | 'Module 4' | 'Module 5' | 'Module 6' | 'Module 7' | 'Module 8' | 'Module 9' | 'Module 10' | 'Module 11'

const NotesSection = () => {

    const [selectedModule, setSelectedModule] = useState<ModulesList>("Module 1");

    const handleModuleClick = (module: string) => {
        // Logic to load the selected module's notes
    // loading notes for module (debug)
    }

    return (
        // root: stack on small screens, row on md+
        <div className="flex flex-col md:flex-row gap-6 p-4">
            {/* Left Side - Modules List (hidden on mobile) */}
            <div className="hidden md:block md:w-1/4 bg-gray-100 rounded-md p-4">
                <h3 className="font-bold mb-4">Modules</h3>
                {/* allow long lists to scroll on medium+ screens */}
                <ul className="list-disc list-inside space-y-2 text-gray-700 max-h-72 md:max-h-[60vh] overflow-auto">
                    {(['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5', 'Module 6', 'Module 7', 'Module 8', 'Module 9', 'Module 10', 'Module 11'] as ModulesList[]).map((module) => (
                        <li
                            key={module}
                            className={`font-bold cursor-pointer px-4 py-2 m-2 rounded-lg ${selectedModule === module ? 'bg-[#04DF73] text-white' : 'hover:bg-gray-200'}`}
                            onClick={() => {
                                setSelectedModule(module);
                                handleModuleClick(module);
                            }}
                        >
                            {module}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Right Side - Notes and Options */}
            {/* Mobile: compact modules dropdown so user doesn't need to scroll */}
            <div className="md:hidden mb-4 w-full flex justify-center">
                <label htmlFor="mobile-notes-modules" className="sr-only">Select Module</label>
                <select
                    id="mobile-notes-modules"
                    className="max-w-xs w-full px-3 py-1.5 text-sm border rounded-md bg-white text-gray-800 shadow-sm"
                    value={selectedModule}
                    onChange={e => {
                        const val = e.target.value as ModulesList
                        setSelectedModule(val)
                        handleModuleClick(val)
                    }}
                >
                    {(['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5', 'Module 6', 'Module 7', 'Module 8', 'Module 9', 'Module 10', 'Module 11'] as ModulesList[]).map((m) => (
                        <option key={m} value={m} className="text-sm">{m}</option>
                    ))}
                </select>
            </div>
            <div className="w-full md:w-3/4 bg-gray-100 rounded-md p-6">
                {/* Make the notes area scrollable on overflow similar to the left modules list */}
                <div className="space-y-4 max-h-screen md:max-h-[60vh] overflow-auto pr-2">
                {/* Module 1 */}
                {selectedModule === 'Module 1' && (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">Module 1 Notes: Disaster Management Vocabulary</h2>
                            <p>This module introduces the core vocabulary of disaster management.</p>
                        </div>
                        <div className="space-y-6">
                            {/* Note 1 */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Hazard vs. Disaster:</h3>
                                <p className="text-gray-600">A hazard is any potential source of harm (e.g., an earthquake, a cyclone, a chemical factory). It only becomes a disaster when it impacts a community that cannot cope with its own resources. A landslide in an uninhabited area is a hazard event, not a disaster.</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Vulnerability:</h3>
                                <p className="text-gray-600">This refers to the conditions that make a community susceptible to a hazard's impact. It can be physical (weak buildings), social (poverty, gender, age), or economic (reliance on a single crop). High population density in India's Gangetic plains, for example, increases vulnerability to floods.</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Risk:</h3>
                                <p className="text-gray-600">This is the probability of harm or loss. The core formula is Risk = Hazard x Vulnerability. You can have a high hazard (like a severe earthquake zone) but reduce the risk by lowering vulnerability (building stronger, earthquake-resistant houses).</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Capacity & Resilience:</h3>
                                <p className="text-gray-600">Capacity refers to a community's strengths and resources (e.g., a strong local government, community savings). Resilience 💪 is the ability to resist, absorb, and recover from a disaster. High capacity leads to high resilience.</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Types of Hazards:</h3>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Natural:</h4>
                                <ul className='list-disc pl-6 space-y-2'>
                                    <li >
                                        <div className='gap-2'>
                                            <h3 className='font-bold'>Geophysical:</h3>
                                            <p className="text-gray-600">Earthquakes, Tsunamis (e.g., Himalayan seismic activity).</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='gap-2'>
                                            <h3 className='font-bold'>Hydro-meteorological: </h3>
                                            <p className="text-gray-600">Cyclones, Floods, Droughts (e.g., Bay of Bengal cyclones, drought in Maharashtra).</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='gap-2'>
                                            <h3 className='font-bold'>Man-made (Technological):</h3>
                                            <p className="text-gray-600">Industrial accidents, chemical spills (e.g., the 1984 Bhopal Gas Tragedy 🏭).</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {/* Module 2 */}
                {selectedModule === 'Module 2' && (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">Module 2 Notes: The Disaster Management Cycle</h2>
                            <p>This is the standard framework for managing all phases of a disaster. It's a continuous loop, not a linear process.</p>
                        </div>
                        <div className="space-y-6">
                            {/* Note 1 */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Mitigation (Pre-disaster):</h3>
                                <p className="text-gray-600">Actions taken to reduce or eliminate the impact of a hazard. This includes building flood defenses, enforcing building codes, and land-use planning. The goal is to prevent a hazard from becoming a disaster.</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Preparedness (Pre-disaster):</h3>
                                <p className="text-gray-600">Planning for what to do when a disaster does occur. This includes developing evacuation plans, training response teams (like the NDRF in India), conducting mock drills 📢, and setting up early warning systems.</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Response (During/Immediately after):</h3>
                                <p className="text-gray-600">Immediate actions to save lives and meet basic needs. This phase includes search and rescue, first aid, providing food, water, and temporary shelter.</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Recovery (Post-disaster):</h3>
                                <p className="text-gray-600">The long-term process of getting back to normal and, ideally, better. This includes reconstruction (rebuilding infrastructure 🏗️) and rehabilitation (restoring livelihoods and providing psychosocial support).</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Paradigm Shift in India:</h3>
                                <p className='text-gray-600'>The Disaster Management Act of 2005 marked a major shift in India's approach—from being reactive and relief-focused to being proactive, holistic, and emphasizing mitigation and preparedness.</p>
                            </div>
                        </div>
                    </>
                )}
                {/* Module 3 */}
                {selectedModule === 'Module 3' && (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">Module 3 Notes: Hazard, Vulnerability, and Risk Assessment (HVRA)</h2>
                            <p>HVRA is the scientific process of identifying and analyzing risks to inform planning.</p>
                        </div>
                        <div className="space-y-6">
                            {/* Note 1 */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Purpose:</h3>
                                <p className="text-gray-600">To understand what hazards exist, who and what is vulnerable to them, and what the potential losses are. This helps prioritize mitigation and preparedness efforts.</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Key Components:</h3>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Natural:</h4>
                                <ul className='list-disc pl-6 space-y-2'>
                                    <li >
                                        <div className=' '>
                                            <h3 className='font-bold'>Hazard Assessment:</h3>
                                            <p className="text-gray-600">Identifies the nature, location, intensity, and probability of different hazards. India's Seismic Zone Map is a classic example.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className=''>
                                            <h3 className='font-bold'>Vulnerability Assessment:</h3>
                                            <p className="text-gray-600">Identifies the elements at risk and why they are vulnerable (physical, social, economic factors).</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className=''>
                                            <h3 className='font-bold'>Risk Analysis:</h3>
                                            <p className="text-gray-600"> Combines the above to estimate the probability and severity of losses. Tools like a Risk Matrix (plotting likelihood vs. consequence) are used.</p>
                                        </div>
                                    </li>
                                </ul>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Key Components:</h3>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Natural:</h4>
                                <p className="text-gray-600">Several key agencies in India are involved in this process:</p>
                                <ul className='list-disc pl-6 space-y-2'>
                                    <li >
                                        <div className='flex gap-2'>
                                            <h3 className='font-bold'>India Meteorological Department (IMD):</h3>
                                            <p className="text-gray-600">For cyclones, monsoons, and weather-related warnings.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2'>
                                            <h3 className='font-bold'>Central Water Commission (CWC):</h3>
                                            <p className="text-gray-600"> For flood forecasting 🌊.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2'>
                                            <h3 className='font-bold'>Geological Survey of India (GSI):</h3>
                                            <p className="text-gray-600"> For landslide studies.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2'>
                                            <h3 className='font-bold'>National Centre for Seismology (NCS):</h3>
                                            <p className="text-gray-600"> For earthquake monitoring.</p>
                                        </div>
                                    </li>
                                </ul>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Key Tools:</h4>
                                <p className="text-gray-600">The Vulnerability Atlas of India and satellite imagery from ISRO 🛰️ are critical tools for conducting HVRA at a national scale.</p>
                            </div>
                        </div>
                    </>
                )}
                {/* Module 4 */}
                {selectedModule === 'Module 4' && (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">Module 4 Notes: Disaster Mitigation</h2>
                            <p>This phase focuses on long-term risk reduction.</p>
                        </div>
                        <div className="space-y-6">
                            {/* Note 1 */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Structural Mitigation:</h3>
                                <p className="text-gray-600">Involves physical construction to reduce risk.</p>
                                <ul className='list-disc pl-6 space-y-2'>
                                    <li >
                                        <div >
                                            <h3 className='font-bold'>Examples:</h3>
                                            <p className="text-gray-600">Building cyclone shelters, sea walls, flood embankments, retrofitting buildings to be earthquake-resistant.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div >
                                            <h3 className='font-bold'>Indian Context: </h3>
                                            <p className="text-gray-600">Following the National Building Code for construction; building cyclone shelters along the Odisha coast.</p>
                                        </div>
                                    </li>
                                </ul>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Non-structural Mitigation:</h3>
                                <p className="text-gray-600">Involves policies, laws, and awareness to reduce risk.</p>
                                <ul className='list-disc pl-6 space-y-2'>
                                    <li >
                                        <div >
                                            <h3 className='font-bold'>Examples:</h3>
                                            <p className="text-gray-600">Land-use zoning laws, public awareness campaigns, crop diversification.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div >
                                            <h3 className='font-bold'>Indian Context: </h3>
                                            <p className="text-gray-600">Coastal Regulation Zone (CRZ) rules that limit construction near the sea; using the MGNREGA scheme for drought-proofing works like building check-dams.
                                                Mitigation is highly cost-effective; every rupee spent on reducing risk saves many more in future losses.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {/* Module 5 */}
                {selectedModule === 'Module 5' && (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">Module 5 Notes: Disaster Preparedness</h2>
                            <p>This phase focuses on building the capacity to respond effectively.</p>
                        </div>
                        <div className="space-y-6">
                            {/* Note 1 */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Early Warning Systems (EWS):</h3>
                                <p className="text-gray-600">A complete EWS must not only detect a hazard but also effectively communicate the warning to the people at risk so they can take timely action. India's Tsunami Early Warning Centre in Hyderabad is a state-of-the-art example.</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Planning:</h3>
                                <p className="text-gray-600">Creating Disaster Management Plans (DMPs) at national, state, district, and even village levels. These plans outline roles, responsibilities, and standard operating procedures (SOPs).</p>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Capacity Building:</h4>
                                <ul className='list-disc pl-6 space-y-2'>
                                    <li >
                                        <div>
                                            <h3 className='font-bold'>Training:</h3>
                                            <p className="text-gray-600">For response teams, government officials, and communities. In India, the NDRF and State DRFs conduct regular training. The Aapda Mitra scheme trains community volunteers.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3 className='font-bold'>Mock Drills:</h3>
                                            <p className="text-gray-600">Simulating disaster scenarios to test plans and improve coordination.</p>
                                        </div>
                                    </li>
                                </ul>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Resource Management:</h4>
                                <p className="text-gray-600">Stockpiling essential supplies (food, water, medicine) and creating an inventory of available resources (equipment, skilled personnel) through systems like the India Disaster Resource Network (IDRN).</p>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Emergency Operations Center (EOC):</h4>
                                <p className="text-gray-600">A designated physical location that serves as the command center for coordinating a response.</p>
                            </div>
                        </div>
                    </>
                )}
                {/* Module 6 */}
                {selectedModule === 'Module 6' && (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">Module 6 Notes: Disaster Response</h2>
                            <p>This phase covers immediate, life-saving actions.</p>
                        </div>
                        <div className="space-y-6">
                            {/* Note 1 */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Primary Goal:</h3>
                                <p className="text-gray-600">To save lives, provide first aid, and meet the basic subsistence needs of the affected population (food, water, shelter).</p>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Key Concepts:</h4>
                                <ul className='list-disc pl-6 space-y-2'>
                                    <li >
                                        <div>
                                            <h3 className='font-bold'>Golden Hours:</h3>
                                            <p className="text-gray-600">The first 72 hours are critical for search and rescue (SAR) as the chances of finding survivors decrease rapidly after this period 🕒.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3 className='font-bold'>Triage:</h3>
                                            <p className="text-gray-600">A system for prioritizing medical treatment for casualties in a mass-casualty incident to save the maximum number of lives.</p>
                                        </div>
                                    </li>
                                </ul>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Indian Response Structure:</h4>
                                <ul className='list-disc pl-6 space-y-2'>
                                    <li >
                                        <div>
                                            <h3 className='font-bold'>First Responders: </h3>
                                            <p className="text-gray-600">The local community and district administration are the first to respond.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3 className='font-bold'>State Government: </h3>
                                            <p className="text-gray-600">The primary responsibility for response lies with the State.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3 className='font-bold'>Central Support: </h3>
                                            <p className="text-gray-600"> If the disaster is severe, the state can request assistance from the center, including the deployment of the NDRF and the Armed Forces 🚁 (for logistics, evacuation, etc.).</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3 className='font-bold'>Incident Response System (IRS):</h3>
                                            <p className="text-gray-600">India has adopted this system to provide a standardized framework for coordinating the actions of various departments (police, fire, health, etc.) under a single command structure during an emergency.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {/* Module 7 */}
                {selectedModule === 'Module 7' && (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">Module 7 Notes: Damage and Needs Assessment</h2>
                            <p>This is the process of figuring out what the impact of the disaster was and what the affected population needs.</p>
                        </div>
                        <div className="space-y-6">
                            {/* Note 1 */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Types of Assessment:</h3>
                                <ul className='list-disc pl-6 space-y-2 '>
                                    <li >
                                        <div>
                                            <h3 className='font-bold'>Rapid Needs Assessment (RNA):</h3>
                                            <p className="text-gray-600">Done within the first few days to get a quick overview of the situation and guide immediate relief efforts.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3 className='font-bold'>Detailed Assessment:</h3>
                                            <p className="text-gray-600"> A more comprehensive assessment done later to inform long-term recovery and reconstruction plans.</p>
                                        </div>
                                    </li>
                                </ul>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Key Sectors:</h3>
                                <p className='text-gray-600'>Assessments look at various sectors, including WASH (Water, Sanitation, and Hygiene 💧), food, shelter, health, and livelihoods (how people's sources of income have been affected 🧑‍🌾).</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Indian Process:</h3>
                                <ul className='list-disc pl-6 space-y-2 text-gray-600'>
                                    <li >
                                        Initial reports are prepared by the local revenue administration.
                                    </li>
                                    <li>
                                        The state government submits a memorandum requesting assistance
                                    </li>
                                    <li >
                                        The central government may send an Inter-Ministerial Central Team (IMCT) to verify the damage.
                                    </li>
                                    <li>
                                        Based on these reports, funds are released from the State Disaster Response Fund (SDRF) and, for severe disasters, the National Disaster Response Fund (NDRF).
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {/* Module 8 */}
                {selectedModule === 'Module 8' && (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">Module 8 Notes: Recovery, Rehabilitation and Reconstruction</h2>
                            <p>This is the long-term phase of rebuilding and restoring the community.</p>
                        </div>
                        <div className="space-y-6">
                            {/* Note 1 */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Building Back Better (BBB):</h3>
                                <p className="text-gray-600">This is a key principle. It means not just rebuilding what was lost, but using the recovery process as an opportunity to reduce vulnerabilities and build a more resilient community. For example, rebuilding houses with stronger, earthquake-resistant designs.</p>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Key Components:</h4>
                                <ul className='list-disc pl-6 space-y-2'>
                                    <li >
                                        <div className='flex gap-2'>
                                            <h3 className='font-bold'>Reconstruction:</h3>
                                            <p className="text-gray-600">Rebuilding physical infrastructure like houses, roads, schools, and hospitals 🛠️.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2'>
                                            <h3 className='font-bold'>Rehabilitation:</h3>
                                            <p className="text-gray-600">Focuses on people. This includes:</p>
                                        </div>
                                         <ul className='list-disc pl-6 space-y-2 text-gray-600'>
                                                <li>Livelihood Recovery: Helping people restore their sources of income.</li>
                                                <li>Psychosocial Support: Providing counseling and mental health services to help people cope with trauma ❤️‍🩹.</li>
                                            </ul>
                                    </li>
                                </ul>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Indian Case Studies:</h3>
                                <p className="text-gray-600">The recovery after the 2001 Bhuj Earthquake and the 2004 Indian Ocean Tsunami involved large-scale housing reconstruction programs that incorporated BBB principles and often used an "owner-driven" model, which empowers families to rebuild their own homes with technical and financial support.</p>
                            </div>
                        </div>
                    </>
                )}
                {/* Module 9 */}
                {selectedModule === 'Module 9' && (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">Module 9 Notes: Institutional and Legal Aspects</h2>
                            <p>This module covers the laws and bodies that govern disaster management.</p>
                        </div>
                        <div className="space-y-6">
                            {/* Note 1 */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2 text-gray-700">The Disaster Management Act, 2005:</h3>
                                <p className="text-gray-600">This is the cornerstone of India's legal framework. It mandated the creation of a three-tiered institutional structure.</p>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Three-Tiered Structure:</h4>
                                <ul className='list-disc pl-6 space-y-2'>
                                    <li >
                                        <div>
                                            <h3 className='font-bold'>National Level:</h3>
                                            <p className="text-gray-600">National Disaster Management Authority (NDMA), chaired by the Prime Minister. It is the apex body for policy-making.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3 className='font-bold'>State Level:</h3>
                                            <p className="text-gray-600">State Disaster Management Authority (SDMA), chaired by the Chief Minister. Responsible for planning and implementation within the state.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3 className='font-bold'>District Level:</h3>
                                            <p className="text-gray-600">District Disaster Management Authority (DDMA), chaired by the District Collector/Magistrate. Responsible for planning and coordination at the district level.</p>
                                        </div>
                                    </li>
                                </ul>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Other Key Bodies:</h4>
                                <ul className='list-disc pl-6 space-y-2'>
                                    <li >
                                        <div className='flex gap-2'>
                                            <h3 className='font-bold'>National Executive Committee (NEC): </h3>
                                            <p className="text-gray-600"> Chaired by the Union Home Secretary, it is the primary coordinating body.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2'>
                                            <h3 className='font-bold'>National Disaster Response Force (NDRF):</h3>
                                            <p className="text-gray-600">A specialized force for disaster response, created under the DM Act.</p>
                                        </div>
                                    </li>
                                </ul>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>Global Framework:</h4>
                                <p className="text-gray-600">The Sendai Framework for Disaster Risk Reduction (2015-2030) is the primary international agreement that guides global efforts to reduce disaster risk and losses.</p>
                            </div>
                        </div>
                    </>
                )}
                {/* Module 10 */}
                {selectedModule === 'Module 10' && (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">Module 10 Notes: Community-Based Disaster Management (CBDM)</h2>
                            <p>This is a "bottom-up" approach that places the community at the center of disaster management efforts.</p>
                        </div>
                        <div className="space-y-6">
                            {/* Note 1 */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Core Principle:</h3>
                                <p className="text-gray-600">Communities are not helpless victims; they are the first responders and have valuable local knowledge about their environment, risks, and capacities.</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Process:</h3>
                                <p className="text-gray-600">CBDM involves a participatory process where the community itself assesses its risks, creates its own plans, and forms its own teams (e.g., for early warning, evacuation, first aid). The role of the government or NGOs is to act as facilitators, not directors.</p>
                                <h4 className='font-bold text-lg mb-1 text-gray-700'>CBDM in India:</h4>
                                <ul className='list-disc pl-6 space-y-2'>
                                    <li >
                                        <p className="text-gray-600">The DM Act, 2005 gives a formal role to Panchayati Raj Institutions (PRIs) and Urban Local Bodies (ULBs) in disaster management.</p>
                                    </li>
                                    <li>
                                        <p className="text-gray-600">This has led to the formation of Village Disaster Management Committees (VDMCs) and the preparation of Village Disaster Management Plans (VDMPs).</p>
                                    </li>
                                    <li>
                                        <p className="text-gray-600">Odisha's Success: The state's success in minimizing casualties from cyclones is a world-renowned example of combining a top-down early warning system with a robust bottom-up community preparedness and evacuation system.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {/* Module 11 */}
                {selectedModule === 'Module 11' && (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">Module 11 Notes: Cross-Cutting Issues</h2>
                            <p>This module covers important themes that are relevant across all phases of the disaster cycle.</p>
                        </div>
                        <div className="space-y-6">
                            {/* Note 1 */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Climate Change:</h3>
                                <p className="text-gray-600">It is increasing the frequency and intensity of hydro-meteorological disasters like cyclones, floods, and heatwaves in India, making climate change adaptation a critical part of disaster risk reduction 🌡️.</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Gender and Social Inclusion:</h3>
                                <p className="text-gray-600">Disasters affect different social groups differently. Women, children, the elderly, persons with disabilities, and marginalized caste groups are often disproportionately affected. Planning must be inclusive to address their specific needs and vulnerabilities.</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Technology:</h3>
                                <p className="text-gray-600">Modern technology plays a huge role. GIS is used for hazard mapping, satellite communication is vital when ground networks fail, and drones are used for rapid damage assessment. ISRO's satellites are a key asset for India.</p>
                                <h3 className="font-bold text-xl mb-2 text-gray-700">Sustainable Development Goals (SDGs):</h3>
                                <p className="text-gray-600">Disasters can wipe out years of development progress, pushing people back into poverty and damaging health and education systems. Therefore, effective disaster risk reduction is essential for achieving the SDGs 🌍.</p>
                            </div>
                        </div>
                    </>
                )}
                </div>
            </div>
        </div>
    )
}

export default NotesSection
