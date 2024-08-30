import React from 'react';
import { Youtube } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="min-h-screen flex flex-col bg-radial-gradient">
            <nav className="bg-black text-white p-4 flex justify-between items-center">
                <div className="text-xl font-bold font-spartan"><span className='text-white'>scriptly.</span></div>
                <div className="flex space-x-8 items-center">
                <button
                className="font-spartan bg-[#f7a8a8] font-roboto px-4 py-2 rounded-md text-[#630404] cursor-pointer hover:bg-[#f47e7e] font-bold"
              >
                Settings
              </button>
                <button
                className="font-spartan bg-[#f7a8a8] font-roboto px-4 py-2 rounded-md text-[#630404] cursor-pointer hover:bg-[#f47e7e] font-bold">
                Log Out
              </button>
                </div>
            </nav>

            <div className="flex flex-1 p-4 space-x-4 m-5 ">
                <div className="w-3/4 p-4 border border-white text-red-300 font-poppins rounded-lg flex flex-col justify-center items-center">
                    <Youtube size={40}/>
                    <h2 className="text-2xl font-semibold mb-4">Generate a New Script</h2>
                    <div className="flex space-x-4">
                        <button className="w-3/4 font-spartan bg-[#f7a8a8] font-roboto px-4 py-2 rounded-md text-[#630404] cursor-pointer hover:bg-[#f47e7e] font-bold">
                            Make a Script
                        </button>
                        <button className="w-3/4 font-spartan bg-[#f7a8a8] font-roboto px-4 py-2 rounded-md text-[#630404] cursor-pointer hover:bg-[#f47e7e] font-bold">
                            Change Preferences
                        </button>
                    </div>
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
