'use client';
import React, { useState } from 'react';
import { Tranquiluxe } from 'uvcanvas';
import MultiInput from '@/components/MultiInput';

const Setup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        channelName: '',
        description: '',
        category: '',
        scriptsPerWeek: 1,
        daysNeeded: [],
        scriptFormat: [], // Initialize as an array
        videoLength: '',
        contentLanguage: '',
        specifyVideoLength: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'daysNeeded') {
                setFormData(prevData => ({
                    ...prevData,
                    [name]: checked
                        ? [...prevData[name], value]
                        : prevData[name].filter(day => day !== value)
                }));
            } else if (name === 'specifyVideoLength') {
                setFormData(prevData => ({
                    ...prevData,
                    [name]: checked
                }));
            }
        } else if (type === 'text' || type === 'number') {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else if (type === 'select-one') {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
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
                                    <option value=''>Select a category</option>
                                    {/* Add all YouTube categories */}
                                    <option value='Music'>Music</option>
                                    <option value='Gaming'>Gaming</option>
                                    <option value='Education'>Education</option>
                                    <option value='Tech'>Tech</option>
                                    <option value='Vlogs'>Vlogs</option>
                                    <option value='Film & Animation'>Film & Animation</option>
                                    <option value='Autos & Vehicles'>Autos & Vehicles</option>
                                    {/* Add other categories as needed */}
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
                            <div>
                                <label className='block text-white text-sm md:text-base font-bold mb-2'>
                                    Days you need scripts
                                </label>
                                <div className='grid grid-cols-2 gap-4'>
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                        <div key={day} className='flex items-center'>
                                            <input
                                                id={day}
                                                name='daysNeeded'
                                                type='checkbox'
                                                value={day}
                                                checked={formData.daysNeeded.includes(day)}
                                                onChange={handleChange}
                                                className='mr-2'
                                            />
                                            <label htmlFor={day} className='text-white'>{day}</label>
                                        </div>
                                    ))}
                                </div>
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
                                    Enter multiple formats separated by commas.
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
                                    placeholder='Enter content language (e.g., English, Spanish)'
                                    className='bg-black border border-white rounded w-full py-2 md:py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                />
                            </div>
                        </div>
                    </form>
                )}
                <div className='flex items-center justify-between mt-6'>
                    {step > 1 && (
                        <button
                            type='button'
                            onClick={handlePrevious}
                            className='bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        >
                            Previous
                        </button>
                    )}
                    {step < 3 ? (
                        <button
                            type='button'
                            onClick={handleNext}
                            className='bg-[#FF0000] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type='submit'
                            className='bg-[#FF0000] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Setup;
