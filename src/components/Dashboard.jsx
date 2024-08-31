'use client';

import React, { useState } from 'react';
import { Youtube, Download, ArrowLeft } from 'lucide-react'; // Import the ArrowLeft icon
import { Tranquiluxe } from 'uvcanvas';

const Dashboard = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('');

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setSelectedTopic(''); // Clear the selected topic when opening the menu
    };

    const selectTopic = (topic) => {
        setSelectedTopic(topic);
        setShowMenu(false); // Close the menu when selecting a topic
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
        <div className="min-h-screen flex flex-col bg-radial-gradient relative">
            {/* Add Tranquiluxe background */}
            <Tranquiluxe className="absolute top-0 left-0 w-full h-full z-0" />

            {/* Main content */}
            <div className="bg-opacity-30 shadow-lg backdrop-blur-lg bg-black/30 rounded-xl flex flex-1 p-4 space-x-4 m-5 z-10">
                {/* Show main screen if no menu or topic is selected */}
                {!showMenu && !selectedTopic && (
                    <div className="w-full p-4 text-white rounded-lg flex flex-col justify-center items-center relative">
                        <Youtube size={40} color="#fff" />
                        <h1 className="text-3xl font-semibold mb-4 mt-4">
                            Generate a New Script
                        </h1>

                        <div className="flex space-x-4 w-1/4">
                            <button
                                onClick={toggleMenu}
                                className="flex-1 h-12 font-spartan bg-[#FF0000] p-2 rounded-md text-white cursor-pointer hover:bg-[#BF0000] font-bold"
                            >
                                Generate
                            </button>
                            <button
                                className="flex-1 h-12 font-spartan bg-[#FF0000] p-2 rounded-md text-white cursor-pointer hover:bg-[#BF0000] font-bold"
                            >
                                Edit Channel
                            </button>
                        </div>
                    </div>
                )}

                {/* Show menu if showMenu is true */}
                {showMenu && (
                    <div className="absolute inset-0 bg-opacity-30 shadow-lg backdrop-blur-lg bg-black/30 text-[#630404] rounded-lg p-4 flex flex-col justify-center items-center z-20">
                        <h3 className="font-bold mb-4 text-white">Select a Topic:</h3>
                        <ul className="space-y-4 w-full">
                            <li
                                onClick={() => selectTopic('Topic 1')}
                                className="cursor-pointer hover:bg-[#f47e7e] p-2 rounded-md text-center text-white"
                            >
                                Topic 1
                            </li>
                            <li
                                onClick={() => selectTopic('Topic 2')}
                                className="cursor-pointer hover:bg-[#f47e7e] p-2 rounded-md text-center text-white"
                            >
                                Topic 2
                            </li>
                            <li
                                onClick={() => selectTopic('Topic 3')}
                                className="cursor-pointer hover:bg-[#f47e7e] p-2 rounded-md text-center text-white"
                            >
                                Topic 3
                            </li>
                        </ul>
                        <button
                            onClick={toggleMenu}
                            className="mt-4 font-spartan bg-[#f7a8a8] px-4 py-2 rounded-md text-[#630404] cursor-pointer hover:bg-[#f47e7e] font-bold"
                        >
                            Close
                        </button>
                    </div>
                )}

                {/* Show script details if a topic is selected */}
                {selectedTopic && (
                    <div className="absolute inset-0 bg-opacity-30 shadow-lg backdrop-blur-lg bg-black/30 rounded-lg border border-white p-7 flex flex-col justify-start items-start z-20">
                        <div className="flex justify-between w-full mb-4">
                            <button
                                onClick={goBack}
                                className="font-spartan text-[#630404] bg-[#f7a8a8] px-4 py-2 rounded-md cursor-pointer hover:bg-[#f47e7e] font-bold"
                            >
                                <ArrowLeft size={16} /> {/* Back icon */}
                            </button>
                            <div className="flex space-x-2">
                                <button
                                    onClick={regenerateScript}
                                    className="font-spartan text-[#630404] bg-[#f7a8a8] px-4 py-2 rounded-md cursor-pointer hover:bg-[#f47e7e] font-bold"
                                >
                                    Regenerate
                                </button>
                                <button
                                    onClick={downloadScript}
                                    className="font-spartan text-[#630404] bg-[#f7a8a8] px-4 py-2 rounded-md cursor-pointer hover:bg-[#f47e7e] font-bold flex items-center"
                                >
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>
                        <h3 className="font-bold mb-4 text-white">{`Script for ${selectedTopic}`}</h3>
                        <p className="text-left text-white">Your Script.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
