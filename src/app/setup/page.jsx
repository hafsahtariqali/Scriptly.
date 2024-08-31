'use client';
import React, { useState } from 'react';
import { Tranquiluxe } from 'uvcanvas';
import MultiInput from '@/components/MultiInput';
import { saveChannelData } from '../models/setupModel';

const Setup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        channelName: '',
        description: '',
        category: '',
        scriptsPerWeek: 1,
        scriptFormat: [],
        videoLength: '',
        contentLanguage: '',
        specifyVideoLength: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
                setFormData(prevData => ({
                    ...prevData,
                    [name]: checked
                }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleNext = () => setStep(step + 1);
    const handlePrevious = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await saveChannelData('sajjadabdullah345@gmail.com', formData);

            if (response.success) {
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
                    specifyVideoLength: false
                });
                setStep(1);
            } else {
                alert('Failed to save channel data. Please try again.');
            }
        } catch (error) {
            console.error('Error saving channel data:', error);
            alert('An error occurred while saving the channel data. Please try again later.');
        }
    };

    return (
        <div className='relative h-screen flex items-center justify-center overflow-hidden'>
            <Tranquiluxe className='absolute top-0 left-0 w-full z-0' />
            <div className='relative bg-black w-full m-8 max-w-3xl h-auto p-8 md:p-12 lg:p-16 rounded-xl shadow-xl overflowX-hidden scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900'>
                <h1 className='text-3xl md:text-4xl font-bold text-white mb-6 text-center'>
                    Channel Setup - Page {step}
                </h1>
                {step === 1 && (
                    <form className='w-full'>
                        <div className='space-y-6'>
                            <div>
                                <label htmlFor='channelName' className='block text-white text-sm md:text-base font-bold mb-2'>
                                    Channel Name
                                </label>
                                <input
                                    id='channelName'
                                    name='channelName'
                                    type='text'
                                    value={formData.channelName}
                                    onChange={handleChange}
                                    placeholder='Enter your channel name'
                                    className='bg-black border border-white rounded w-full py-2 md:py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                />
                            </div>
                            <div>
                                <label htmlFor='description' className='block text-white text-sm md:text-base font-bold mb-2'>
                                    Description
                                </label>
                                <textarea
                                    id='description'
                                    name='description'
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder='Enter a brief description'
                                    rows='4'
                                    className='bg-black border border-white rounded w-full py-2 md:py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                />
                            </div>
                            <div>
                                <label htmlFor='category' className='block text-white text-sm md:text-base font-bold mb-2'>
                                    Category
                                </label>
                                <select
                                    id='category'
                                    name='category'
                                    value={formData.category}
                                    onChange={handleChange}
                                    className='bg-black border border-white rounded w-full py-2 md:py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                >
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
                    <form className='w-full'>
                        <div className='space-y-6'>
                            <div>
                                <label htmlFor='scriptsPerWeek' className='block text-white text-sm md:text-base font-bold mb-2'>
                                    How many scripts needed in a week (1-10)
                                </label>
                                <input
                                    id='scriptsPerWeek'
                                    name='scriptsPerWeek'
                                    type='number'
                                    min='1'
                                    max='10'
                                    value={formData.scriptsPerWeek}
                                    onChange={handleChange}
                                    className='bg-black border border-white rounded w-full py-2 md:py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                />
                            </div>
                        </div>
                    </form>
                )}
                {step === 3 && (
                    <form className='w-full'>
                        <div className='space-y-6'>
                            <div>
                                <label htmlFor='scriptFormat' className='block text-white text-sm md:text-base font-bold mb-2'>
                                    Script Format
                                </label>
                                <MultiInput
                                  value={formData.scriptFormat}
                                  onChange={(newFormats) => setFormData(prevData => ({
                                    ...prevData,
                                    scriptFormat: newFormats
                                  }))}
                                />
                                <small className='text-gray-400'>
                                    Enter a heading and press <strong>Enter</strong>
                                </small>
                            </div>
                            <div>
                                <label className='block text-white text-sm md:text-base font-bold mb-2'>
                                    Specify Video Length
                                </label>
                                <div className='flex items-center mb-4'>
                                    <input
                                        id='specifyVideoLength'
                                        name='specifyVideoLength'
                                        type='checkbox'
                                        checked={formData.specifyVideoLength}
                                        onChange={handleChange}
                                        className='mr-2'
                                    />
                                    <label htmlFor='specifyVideoLength' className='text-white'>
                                        Do you need to specify the video length?
                                    </label>
                                </div>
                                {formData.specifyVideoLength && (
                                    <div>
                                        <label htmlFor='videoLength' className='block text-white text-sm md:text-base font-bold mb-2'>
                                            Length of the video (in minutes)
                                        </label>
                                        <input
                                            id='videoLength'
                                            name='videoLength'
                                            type='number'
                                            value={formData.videoLength}
                                            onChange={handleChange}
                                            min='1'
                                            className='bg-black border border-white rounded w-full py-2 md:py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label htmlFor='contentLanguage' className='block text-white text-sm md:text-base font-bold mb-2'>
                                    Content Language
                                </label>
                                <input
                                    id='contentLanguage'
                                    name='contentLanguage'
                                    type='text'
                                    value={formData.contentLanguage}
                                    onChange={handleChange}
                                    className='bg-black border border-white rounded w-full py-2 md:py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                />
                            </div>
                        </div>
                    </form>
                )}
                <div className='flex justify-between items-center mt-8'>
                    {step > 1 && (
                        <button
                            type='button'
                            onClick={handlePrevious}
                            className='bg-red-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-200'
                        >
                            Previous
                        </button>
                    )}
                    {step < 3 && (
                        <button
                            type='button'
                            onClick={handleNext}
                            className='bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-200'
                        >
                            Next
                        </button>
                    )}
                    {step === 3 && (
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            className='bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200'
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Setup;
