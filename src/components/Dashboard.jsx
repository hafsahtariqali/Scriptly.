import React from 'react';

const Dashboard = () => {
    return (
        <div className="min-h-screen flex flex-col bg-radial-gradient">
            <nav className="bg-black text-white p-4 flex justify-between items-center">
                <div className="text-xl font-bold font-spartan"><span className='text-[#f7a8a8]'>scriptly.</span></div>
                <div className="flex space-x-8 items-center">
                    <a href="#" className="font-poppins text-white hover:text-red-300">Settings</a>
                    <a href="#" className="font-poppins text-white hover:text-red-300">Log Out</a>
                </div>
            </nav>

            <div className="flex flex-1 p-4 space-x-4 m-5">
                <div className="w-3/4 p-4 bg-white border font-poppins rounded-lg flex flex-col justify-center items-center">
                    <img src="/youtube.png" className='h-14 w-13 pb-3'></img>
                    <h2 className="text-2xl font-semibold mb-4">Generate a New Script</h2>
                    <button className="w-1/6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ">
                        Make a Script!
                    </button>
                </div>

                <div className="w-1/4 p-4 bg-white border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Past Scripts</h2>
                    <ul>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
