'use client';

import React, { useState, useEffect } from 'react';
import { Youtube, Download, ArrowLeft } from 'lucide-react';
import { SignedIn, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    const [script, setScript] = useState('');

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        }
    }, [isLoaded, isSignedIn, router]);

    const fetchTopics = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await fetch('/api/generatetopics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    channelName: 'Your Channel Name',
                    videoCategory: 'Your Video Category',
                    preferences: '',
                    numberOfTopics: 5
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
    
            const data = await response.json();
            if (!data.topics) {
                throw new Error('No topics found in response');
            }
    
            setTopics(data.topics);
        } catch (error) {
            console.error("Failed to fetch topics:", error.message);
            setError("Failed to fetch topics. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    
    const toggleMenu = async () => {
        if (!showMenu) {
            await fetchTopics();
        }
        setShowMenu(!showMenu);
        setSelectedTopic('');
    };

    const fetchScript = async (topic) => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic }),
            });
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
    
            const data = await response.json();
            if (!data.script) {
                throw new Error('No script found in response');
            }
    
            setScript(data.script);
        } catch (error) {
            console.error("Failed to fetch script:", error.message);
            setError("Failed to fetch script. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    
    

    const selectTopic = async (topic) => {
        setSelectedTopic(topic);
        setShowMenu(false);
        await fetchScript(topic); 
    };
       
    const regenerateScript = () => {
        console.log(`Regenerating script for ${selectedTopic}`);
    };

    const downloadScript = () => {
        console.log(`Downloading script for ${selectedTopic}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-radial-gradient">
            <SignedIn>
                <div className="flex flex-1 p-4 space-x-4 m-5">
                    <div className="w-3/4 p-4 border border-white text-red-300 font-poppins rounded-lg flex flex-col justify-center items-center relative">
                        <Youtube size={40} color="#fff" />
                        <h2 className="text-2xl font-semibold mb-4 mt-4">
                            {selectedTopic ? `Script for ${selectedTopic}` : 'Generate a New Script'}
                        </h2>

                        {!selectedTopic && !showMenu && (
                            <div className="flex space-x-4">
                                <button
                                    onClick={toggleMenu}
                                    className="flex-1 h-15 font-spartan bg-[#FF0000] p-2 rounded-md text-white cursor-pointer hover:bg-[#BF0000] font-bold"
                                >
                                    Generate
                                </button>
                                <button
                                    className="flex-1 h-15 font-spartan bg-[#FF0000] p-2 rounded-md text-white cursor-pointer hover:bg-[#BF0000] font-bold"
                                >
                                    Edit Channel
                                </button>
                            </div>
                        )}

                        {showMenu && (
                            <div className="absolute inset-0 bg-opacity-30 shadow-lg backdrop-blur-lg bg-black/30 text-[#630404] rounded-lg p-4 flex flex-col justify-center items-center z-20">
                                <h3 className="font-bold mb-4 text-white">Select a Topic:</h3>
                                {loading ? (
                                    <p className="text-white">Loading topics...</p>
                                ) : error ? (
                                    <p className="text-red-500">{error}</p>
                                ) : (
                                    <ul>
                                        {topics.map((topic, index) => (
                                            <li key={index} onClick={() => selectTopic(topic)} className="cursor-pointer text-white">
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <button
                                    onClick={toggleMenu}
                                    className="mt-4 font-spartan bg-[#f7a8a8] px-4 py-2 rounded-md text-[#630404] cursor-pointer hover:bg-[#f47e7e] font-bold"
                                >
                                    Close
                                </button>
                            </div>
                        )}

                        {selectedTopic && (
                            <div className="absolute inset-0 bg-opacity-30 shadow-lg backdrop-blur-lg bg-black/30 rounded-lg border border-white p-7 flex flex-col justify-start items-start z-20">
    <div className="flex justify-between w-full mb-4">
        <button
            onClick={() => setSelectedTopic('')}
            className="font-spartan text-[#630404] bg-[#f7a8a8] px-4 py-2 rounded-md cursor-pointer hover:bg-[#f47e7e] font-bold"
        >
            <ArrowLeft size={16} />
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
    <p className="text-left text-white">{script || "Your Script."}</p>
</div>

                        )}
                    </div>
                </div>
            </SignedIn>
        </div>
    );
};

export default Dashboard;
