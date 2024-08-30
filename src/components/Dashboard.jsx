import React from 'react';

const Dashboard = () => {
    return (
        <div className="min-h-screen flex flex-col bg-radial-gradient">
            {/* <nav className="bg-black text-white p-4 flex justify-between items-center">
                <div className="text-xl font-bold font-spartan"><span className='text-white'>scriptly.</span></div>
                <div className="flex space-x-8 items-center">
                    <a href="#" className="font-sans text-black bg-white p-2 rounded-md hover:text-red-800">Settings</a>
                    <a href="#" className="font-sans text-black bg-white p-2 rounded-md hover:text-red-800">Log Out</a>
                </div>
            </nav> */}

            <div className="flex flex-1 p-4 space-x-4 m-5 ">
                <div className="w-3/4 p-4 border-2 border-white text-red-300 font-poppins rounded-lg flex flex-col justify-center items-center">
                    <img src="/youtube.png" className='h-14 w-13 pb-3'></img>
                    <h2 className="text-2xl font-semibold mb-4">Generate a New Script</h2>
                    <div className="flex space-x-4">
                        <button className="w-3/4 bg-white hover:bg-red-400 text-black p-1 rounded-lg">
                            Make a Script!
                        </button>
                        <button className="w-3/4 bg-white hover:bg-red-400 text-black p-1 rounded-lg">
                            Change Preferences
                        </button>
                    </div>
                </div>

                <div className="w-1/4 p-4 border-2 border-white rounded-lg text-red-300">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Past Scripts</h2>
                    <ul>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
