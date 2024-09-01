'use client';
import React, { useState, useEffect } from 'react';
import { Tranquiluxe } from 'uvcanvas';
import FogBackground from '@/components/FogBackground';
import VantaEffect from '@/components/VanitaEffect';
import MultiInput from '@/components/MultiInput';
import { saveChannelData, getChannelData } from '../models/setupModel'; // Import getChannelData here
import { SignedIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Setup = () => {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress; 
    const [formData, setFormData] = useState({
        channelName: '',
        description: '',
        category: 'Vlog',
        scriptsPerWeek: 1,
        scriptFormat: [],
        videoLength: '',
        contentLanguage: '',
        specifyVideoLength: false
    });

    // Fetch existing channel data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            if (userEmail) {
                try {
                    const fetchedData = await getChannelData(userEmail);
                    if (fetchedData && fetchedData.channelName !== '') {
                        // Replace formData with fetched data if channelName is not empty
                        setFormData({
                            channelName: fetchedData.channelName,
                            description: fetchedData.channelDescription,
                            category: fetchedData.category,
                            scriptsPerWeek: fetchedData.weeklyScriptLimit,
                            scriptFormat: fetchedData.headings,
                            videoLength: fetchedData.videoLength,
                            contentLanguage: fetchedData.contentLanguage,
                            specifyVideoLength: fetchedData.VideoLength,
                        });
                    }
                } catch (error) {
                    console.error('Error fetching channel data:', error);
                }
            }
        };

        fetchData();
    }, [userEmail]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleNext = () => setStep(step + 1);
    const handlePrevious = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form data before submission:', formData); // Add this line

        try {
            const response = await saveChannelData(userEmail, formData);

            if (response) {
                alert('Channel data saved successfully!');
                setFormData({
                    channelName: '',
                    description: '',
                    category: '',
                    scriptsPerWeek: 1,
                    daysNeeded: [],
                    scriptFormat: [],
                    videoLength: '',
                    contentLanguage: '',
                    specifyVideoLength: false,
                });
                router.replace('/dashboard');
            } else {
                alert('Failed to save channel data. Please try again.');
            }
        } catch (error) {
            console.error('Error saving channel data:', error);
            alert('An error occurred while saving the channel data. Please try again later.');
        }
    };

    return (
        <SignedIn>
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                <VantaEffect />
                <div className="relative bg-black w-full m-8 max-w-3xl h-auto p-8 md:p-12 lg:p-16 rounded-xl shadow-xl overflowX-hidden scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#FF0000] mb-2 text-center">
                        Scriptly.
                    </h1>
                    <h6 className="md:font-bold text-white mb-6 text-center">
                        Channel Setup - Page {step}
                    </h6>
                    {step === 1 && (
                        <form className="w-full">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="channelName" className="block text-white text-sm md:text-base font-bold mb-2">
                                        Channel Name
                                    </label>
                                    <input
                                        id="channelName"
                                        name="channelName"
                                        type="text"
                                        value={formData.channelName}
                                        onChange={handleChange}
                                        placeholder="Enter your channel name"
                                        className="bg-black border border-white rounded w-full py-2 md:py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-white text-sm md:text-base font-bold mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Enter a brief description"
                                        rows="4"
                                        className="bg-black border border-white rounded w-full py-2 md:py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-white text-sm md:text-base font-bold mb-2">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="bg-black border border-white rounded w-full py-2 md:py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a category
                                        </option>
                                        <option value="vlog">Vlog</option>
                                        <option value="gaming">Gaming</option>
                                        <option value="education">Education</option>
                                        <option value="beauty">Beauty & Fashion</option>
                                        <option value="tech">Technology</option>
                                        <option value="travel">Travel</option>
                                        <option value="fitness">Fitness</option>
                                        <option value="food">Food & Cooking</option>
                                        <option value="music">Music</option>
                                        <option value="sports">Sports</option>
                                        <option value="comedy">Comedy</option>
                                        <option value="news">News & Politics</option>
                                        <option value="entertainment">Entertainment</option>
                                        <option value="film">Film & Animation</option>
                                        <option value="howto">How-To & DIY</option>
                                        <option value="science">Science & Technology</option>
                                        <option value="kids">Kids</option>
                                        <option value="art">Art & Design</option>
                                        <option value="lifestyle">Lifestyle</option>
                                        <option value="health">Health & Wellness</option>
                                        <option value="business">Business & Finance</option>
                                        <option value="auto">Autos & Vehicles</option>
                                        <option value="pets">Pets & Animals</option>
                                        <option value="history">History</option>
                                        <option value="nonprofits">Nonprofits & Activism</option>
                                        <option value="podcast">Podcasts</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    )}
                    {step === 2 && (
                        <form className="w-full">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="scriptsPerWeek" className="block text-white text-sm md:text-base font-bold mb-2">
                                        How many scripts needed in a week (1-10)
                                    </label>
                                    <input
                                        id="scriptsPerWeek"
                                        name="scriptsPerWeek"
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={formData.scriptsPerWeek}
                                        onChange={handleChange}
                                        className="bg-black border border-white rounded w-full py-2 md:py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                    {step === 3 && (
                        <form className="w-full">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="scriptFormat" className="block text-white text-sm md:text-base font-bold mb-2">
                                        Script format
                                    </label>
                                    <MultiInput name="scriptFormat" value={formData.scriptFormat} setValue={setFormData} />
                                </div>
                            </div>
                        </form>
                    )}
                    {step === 4 && (
                        <form className="w-full">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="videoLength" className="block text-white text-sm md:text-base font-bold mb-2">
                                        Video length
                                    </label>
                                    <select
                                        id="videoLength"
                                        name="videoLength"
                                        value={formData.videoLength}
                                        onChange={handleChange}
                                        className="bg-black border border-white rounded w-full py-2 md:py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a video length
                                        </option>
                                        <option value="1-3 mins">1-3 mins</option>
                                        <option value="3-5 mins">3-5 mins</option>
                                        <option value="5-10 mins">5-10 mins</option>
                                        <option value="10+ mins">10+ mins</option>
                                    </select>
                                </div>
                                {/* <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="specifyVideoLength"
                                        name="specifyVideoLength"
                                        checked={formData.specifyVideoLength}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="specifyVideoLength" className="text-white">
                                        Specify a custom video length
                                    </label>
                                </div> */}
                            </div>
                        </form>
                    )}
                    <div className="flex justify-between mt-8">
                        {step > 1 && (
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                onClick={handlePrevious}
                            >
                                Previous
                            </button>
                        )}
                        {step < 4 ? (
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </SignedIn>
    );
};

export default Setup;
