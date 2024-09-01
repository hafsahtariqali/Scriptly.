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
    const [page, setPage] = useState(1);
    const [hasMoreTopics, setHasMoreTopics] = useState(true);
    const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    const [script, setScript] = useState('');
    const [scriptPage, setScriptPage] = useState(1);
    const [scriptHasMore, setScriptHasMore] = useState(true);


    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        }
    }, [isLoaded, isSignedIn, router]);

    useEffect(() => {
        if (showMenu) {
            fetchTopics();
        }
    }, [showMenu]);

    const fetchTopics = async (newPage = page) => {
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
                    page: newPage,
                    limit: 10
                }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            if (!data.topics || data.topics.length === 0) {
                setHasMoreTopics(false);
            } else {
                setTopics(prev => [...prev, ...data.topics]);
                setPage(newPage + 1);
            }
        } catch (error) {
            console.error("Failed to fetch topics:", error.message);
            setError("Failed to fetch topics. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMoreTopics && !loading) {
            fetchTopics(page);
        }
    };

    const toggleMenu = () => {
        if (!showMenu) {
            setTopics([])
            setPage(1);
            setHasMoreTopics(true);
        }
        setShowMenu(!showMenu);
        setSelectedTopic('');
    };

    const fetchScript = async (topic, newPage = scriptPage) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, page: newPage, limit: 100 }), // Adjust limit as needed
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            if (!data.script || data.script.length === 0) {
                setScriptHasMore(false);
            } else {
                setScript(prev => prev + data.script); // Append new content
                setScriptPage(newPage + 1);
            }
        } catch (error) {
            console.error("Failed to fetch script:", error.message);
            setError("Failed to fetch script. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleScriptScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight * 1.5 && scriptHasMore && !loading) {
            fetchScript(selectedTopic, scriptPage);
        }
    };

    const selectTopic = async (topic) => {
        setSelectedTopic(topic);
        setShowMenu(false);
        await fetchScript(topic);
    };

    const regenerateScript = async () => {
        if (!selectedTopic) return;
        setLoading(true);
        setError(null);
        setScript(''); 
        setScriptPage(1); 
        setScriptHasMore(true);

        try {
            await fetchScript(selectedTopic);
        } catch (error) {
            console.error("Failed to regenerate script:", error.message);
            setError("Failed to regenerate script. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    const downloadScript = () => {
        if (!script) return;
        const blob = new Blob([script], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedTopic}_script.txt`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
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
                            <div className="absolute inset-0 bg-opacity-30 shadow-lg backdrop-blur-lg bg-black/30 text-[#630404] rounded-lg p-4 flex flex-col justify-center items-center z-20" onScroll={handleScroll}>
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
                                {!hasMoreTopics && <p className="text-white">No more topics available</p>}
                                <button
                                    onClick={toggleMenu}
                                    className="mt-4 font-spartan bg-[#f7a8a8] px-4 py-2 rounded-md text-[#630404] cursor-pointer hover:bg-[#f47e7e] font-bold"
                                >
                                    Close
                                </button>
                            </div>
                        )}

                        {selectedTopic && (
                            <div className="absolute inset-0 bg-opacity-30 shadow-lg backdrop-blur-lg bg-black/30 rounded-lg border border-white p-7 flex flex-col justify-start items-start z-20" onScroll={handleScriptScroll}>
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
                                <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
                                    <p className="text-left text-white">{script || "Loading..."}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </SignedIn>
        </div>
    );
};

export default Dashboard;
