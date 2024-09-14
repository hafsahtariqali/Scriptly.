'use client';

import React, { useState, useEffect } from 'react';
import { Youtube, Download, ArrowLeft, RefreshCcw } from 'lucide-react';
import { SignedIn, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import VantaEffect from './VanitaEffect';
import { getChannelData, updateChannelData } from '@/app/models/setupModel';
import MarkdownRenderer from './MarkDown';
import { marked } from 'marked';
import { generateAndDownloadDocx } from '@/app/utils/docDownload';
import Snackbar from './Snackbar';

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [scriptData, setScriptData] = useState(''); 
  const [prevScriptData, setprevScriptData] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const { user , isLoaded, isSignedIn} = useUser();
  const [userData, setUserData] = useState({})
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const router = useRouter(); 
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(false); // Loading state for topics


  useEffect(() => {
    if (isLoaded && !isSignedIn) {
        router.push('/sign-in');
    }
}, [isLoaded, isSignedIn, router]);


useEffect(()=>{
  fetchTopics()
},[])

useEffect(() => {
  if (selectedTopic) {
    generateScript();
  }
}, [selectedTopic]);


const fetchTopics = async (e) => {
  if (e) e.preventDefault();

  console.log('Fetching topics...');

  setTopicsLoading(true);

  try {
    const formData = await getChannelData(userEmail);
    console.log('Form data:', formData);

    if (!formData) {
      console.error('Error fetching channel data:', 'No data returned');
      showSnackbar('Error fetching channel data. Please try again later.');
      setTopicsLoading(false);
      return;
    }

    const { channelName, category, headings } = formData;


    console.log('Request payload:', {
      channelName: channelName || '',
      videoCategory: category || '',
      preferences: headings || '',
    });

    try {
      const response = await fetch('/api/generatetopics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channelName: channelName,
          videoCategory: category,
          preferences: headings,
        }),
      });

      console.log('Response:', response);

      if (!response.ok) {
        throw new Error('Failed to fetch topics');
      }

      const data = await response.json();
      console.log('Topics:', data.topics);
      setTopics(data.topics);
    } catch (error) {
      console.error('Error fetching topics:', error);
      showSnackbar('Error fetching topics. Please try again later.');
    } finally {
      setTopicsLoading(false);
    }
  } catch (error) {
    console.error('Error fetching channel data:', error);
    showSnackbar('Error fetching channel data. Please try again later.');
    setTopicsLoading(false);
  }
};


  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10); 
  };


  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setSelectedTopic('');
    setScriptData(''); 
    fetchTopics()
  };

  const selectTopic = (topic) => {
    setSelectedTopic(topic);
    setShowMenu(false);
  };

  const goBack = () => {
    setSelectedTopic('');
    setScriptData(''); 
  };

  const downloadScript = async () => {
    if (scriptData) {
  
      generateAndDownloadDocx(`${selectedTopic}.docx`, marked.parse(scriptData));
      
  
      try {
        if(scriptData !== prevScriptData){

        const updatedData = {
          scriptsGeneratedThisWeek: (userData.scriptsGeneratedThisWeek || 0) + 1,
        };
  
  
        await updateChannelData(userEmail, updatedData);
          setUserData((prev) => ({
          ...prev,
          ...updatedData,
        }));
        showSnackbar(`Total scripts downloaded this week: ${userData.scriptsGeneratedThisWeek+1}`)
        console.log('Channel data updated:', updatedData);}
        else{
            showSnackbar('Downloading same script')
        }

      } catch (error) {
        console.error('Error updating channel data:', error);
      }

      setprevScriptData(scriptData)

    }
  };
  

  const regenerateScript = () => {
    console.log(`Regenerating script for ${selectedTopic}`);
    generateScript(); 
  };


  const generateScript = async (e) => {
    if (e) e.preventDefault();
    setLoading(true); 
    const formData = await getChannelData(userEmail);
    setUserData(formData)
    const { weeklyScriptLimit, scriptsGeneratedThisWeek, userCreated } = formData;
    
    if (userCreated === getCurrentDate()) {
      const resetData = { scriptsGeneratedThisWeek: 0 };
      await updateChannelData(userEmail, resetData);
      setUserData((prev) => ({
        ...prev,
        ...resetData,
      }));
    }
    
    if (scriptsGeneratedThisWeek >= weeklyScriptLimit) {
      alert("You have reached your scripts limit this week. Update your scripts limit in setup or change your plan.");
      setLoading(false);
        return;
      }

    console.log('User data', userData)
    console.log(selectedTopic)
    const modifiedFormData = {
      ...formData,
      selectedTopic: selectedTopic,
    };
    
    console.log(modifiedFormData);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedFormData),
      });

      if (!response.ok) {
        throw new Error(
          "Error generating script, check your plan or try rewriting the prompt. If the issue persists, contact admin."
        );
      }

      const result = await response.text(); 
      setScriptData(result);
      console.log('Script received:', result);
    } catch (error) {
      console.error("Error fetching script:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-radial-gradient overflow-hidden">
      <SignedIn>
        <div className="flex flex-1 p-4 space-x-4 m-5 z-0">
          <VantaEffect />
          <div className="custom-scrollbar h-screen w-full p-4 border border-white text-white rounded-lg flex flex-col justify-center items-center relative overflow-y-auto">
            <Youtube size={40} color="#fff" />
            <h2 className="text-2xl font-semibold mb-4 mt-4">
              {selectedTopic ? `Script for ${selectedTopic}` : 'Generate a New Script'}
            </h2>

            {!selectedTopic && !showMenu && (
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={toggleMenu}
                  className="bg-[#FF0000] p-2 rounded-md text-white cursor-pointer hover:bg-[#BF0000]"
                >
                  Generate
                </button>
                <button
                    onClick={()=>router.push('/setup')}
                  className="bg-[#FF0000] p-2 rounded-md text-white cursor-pointer hover:bg-[#BF0000]"
                >
                  Edit Channel
                </button>
              </div>
            )}

            {showMenu && (
                            <div className="absolute inset-0 bg-opacity-30 shadow-lg backdrop-blur-lg bg-black/30 text-white rounded-lg p-4 flex flex-col justify-center items-center z-20">
                                <h3 className="font-bold mb-4">Select a Topic:</h3>
                                <ul className="space-y-4 w-full">
                                    {topics.map((topic) => (
                                        <li
                                            key={topic}
                                            onClick={() => selectTopic(topic)}
                                            className="cursor-pointer hover:bg-[#FF0000] p-2 rounded-md text-center text-white"
                                        >
                                            {topic}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={toggleMenu}
                                    className="mt-4 bg-[#FF0000] px-4 py-2 rounded-md text-white cursor-pointer hover:bg-[#BF0000] font-bold"
                                >
                                    Close
                                </button>
                            </div>
                        )}



            {selectedTopic && (
              <div className="absolute inset-0 bg-opacity-30 shadow-lg backdrop-blur-lg bg-black/30 rounded-lg  p-4 flex flex-col justify-start items-start z-20 " style={{ maxHeight: 'calc(100vh - 80px)' }}>
                <div className="flex justify-between w-full mb-4">
                  <button
                    onClick={goBack}
                    className="bg-[#FF0000] px-4 py-2 rounded-md text-white cursor-pointer hover:bg-[#BF0000] font-bold"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={regenerateScript}
                      className="bg-[#FF0000] px-4 py-2 rounded-md text-white cursor-pointer hover:bg-[#BF0000] font-bold"
                    >
                      <RefreshCcw></RefreshCcw>
                    </button>
                    <button
                      onClick={downloadScript}
                      className="bg-[#FF0000] px-4 py-2 rounded-md text-white cursor-pointer hover:bg-[#BF0000] font-bold flex items-center"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold mb-4">{`Script for ${selectedTopic}`}</h3>
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-4 border-t-transparent border-red-600 border-solid rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  <MarkdownRenderer markdown={scriptData} />
                )}
              </div>
            )}
          </div>
        </div>
        <Snackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
      </SignedIn>
    </div>
  );
};

export default Dashboard;
