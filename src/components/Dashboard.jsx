'use client';

import React, { useState } from 'react';
import { Youtube, Download } from 'lucide-react';

const Dashboard = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('');

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const selectTopic = (topic) => {
        setSelectedTopic(topic);
        setShowMenu(false);
    };

    const goBack = () => {
        setSelectedTopic('');
    };

    const regenerateScript = () => {
        console.log(`Regenerating script for ${selectedTopic}`);
        // Logic to regenerate the script can go here
    };

    const downloadScript = () => {
        console.log(`Downloading script for ${selectedTopic}`);
        // Logic to download the script can go here
    };

    return (
        <div className="min-h-screen flex flex-col bg-radial-gradient">
            <nav className="bg-black text-white p-4 flex justify-between items-center">
                <div className="text-xl font-bold font-spartan">
                    <span className="text-white">scriptly.</span>
                </div>
                <div className="flex space-x-8 items-center">
                    <button
                        className="font-spartan bg-[#f7a8a8] font-roboto px-4 py-2 rounded-md text-[#630404] cursor-pointer hover:bg-[#f47e7e] font-bold"
                    >
                        Settings
                    </button>
                    <button
                        className="font-spartan bg-[#f7a8a8] font-roboto px-4 py-2 rounded-md text-[#630404] cursor-pointer hover:bg-[#f47e7e] font-bold"
                    >
                        Log Out
                    </button>
                </div>
            </nav>

            <div className="flex flex-1 p-4 space-x-4 m-5">
                <div className="w-3/4 p-4 border border-white text-red-300 font-poppins rounded-lg flex flex-col justify-center items-center relative">
                    <Youtube size={40} />
                    <h2 className="text-2xl font-semibold mb-4">
                        {selectedTopic ? `Script for ${selectedTopic}` : 'Generate a New Script'}
                    </h2>
                    
                    {!selectedTopic && !showMenu && (
                        <div className="flex space-x-4">
                            <button
                                onClick={toggleMenu}
                                className="w-3/4 font-spartan bg-[#f7a8a8] font-roboto px-4 py-2 rounded-md text-[#630404] cursor-pointer hover:bg-[#f47e7e] font-bold"
                            >
                                Make a Script
                            </button>
                            <button className="w-3/4 font-spartan bg-[#f7a8a8] font-roboto px-4 py-2 rounded-md text-[#630404] cursor-pointer hover:bg-[#f47e7e] font-bold">
                                Change Preferences
                            </button>
                        </div>
                    )}

                    {showMenu && (
                        <div className="absolute inset-0 bg-[#fcdfdf] text-[#630404] rounded-lg border border-white p-4 flex flex-col justify-center items-center">
                            <h3 className="font-bold mb-4">Select a Topic:</h3>
                            <ul className="space-y-4 w-full">
                                <li
                                    onClick={() => selectTopic('Topic 1')}
                                    className="cursor-pointer hover:bg-[#f47e7e] p-2 rounded-md text-center"
                                >
                                    Topic 1
                                </li>
                                <li
                                    onClick={() => selectTopic('Topic 2')}
                                    className="cursor-pointer hover:bg-[#f47e7e] p-2 rounded-md text-center"
                                >
                                    Topic 2
                                </li>
                                <li
                                    onClick={() => selectTopic('Topic 3')}
                                    className="cursor-pointer hover:bg-[#f47e7e] p-2 rounded-md text-center"
                                >
                                    Topic 3
                                </li>
                            </ul>
                            <button
                                onClick={toggleMenu}
                                className="mt-4 font-spartan bg-[#f7a8a8] font-roboto px-4 py-2 rounded-md text-[#630404] cursor-pointer hover:bg-[#f47e7e] font-bold"
                            >
                                Close
                            </button>
                        </div>
                    )}

                    {selectedTopic && (
                        <div className="absolute inset-0 bg-white text-black rounded-lg border border-white p-4 flex flex-col justify-start items-start">
                            <div className="flex justify-between w-full mb-4">
                                <button
                                    onClick={goBack}
                                    className="font-spartan text-[#630404] bg-[#f7a8a8] font-roboto px-2 py-1 rounded-md cursor-pointer hover:bg-[#f47e7e] font-bold"
                                >
                                    Back
                                </button>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={regenerateScript}
                                        className="font-spartan text-[#630404] bg-[#f7a8a8] font-roboto px-2 py-1 rounded-md cursor-pointer hover:bg-[#f47e7e] font-bold"
                                    >
                                        Regenerate
                                    </button>
                                    <button
                                        onClick={downloadScript}
                                        className="font-spartan text-[#630404] bg-[#f7a8a8] font-roboto px-2 py-1 rounded-md cursor-pointer hover:bg-[#f47e7e] font-bold flex items-center"
                                    >
                                        <Download size={16} />
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-bold mb-4">{`Script for ${selectedTopic}`}</h3>
                            <p className="text-left">Your Script.</p>
                        </div>
                    )}
                </div>

                <div className="w-1/4 p-4 border border-white rounded-lg text-red-300">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Past Scripts</h2>
                    <ul>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
