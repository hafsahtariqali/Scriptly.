import { db } from '../../../firebase';
import { doc, setDoc, updateDoc, getDoc } from '@firebase/firestore';



//this is to add a new user with its information
export const saveChannelData = async (userEmail, channelData) => {
  try {
    if (channelData.weeklyScriptLimit > 10) {
      throw new Error('Weekly script limit cannot exceed 10.');
    }

    const userRef = doc(db, 'users', userEmail);
    await setDoc(userRef, {
      channelName: channelData.channelName,
      channelDescription: channelData.description,
      category: channelData.category,
      weeklyScriptLimit: channelData.scriptsPerWeek,
      headings: channelData.scriptFormat,
      videoLength: channelData.videoLength || 0, 
      plan: 'Free',
      language: channelData.contentLanguage,
      scriptsGeneratedThisWeek: 0, 
    }); 

    return true;
  } catch (error) {
    console.error('Error saving channel data: ', error);
    throw error;
  }
};



//to update any channel related data by the user
export const updateChannelData = async (userEmail, updatedData) => {
  try {
    const userRef = doc(db, 'users', userEmail);
    await updateDoc(userRef, updatedData);
    return true;
  } catch (error) {
    console.error('Error updating channel data: ', error);
    throw error;
  }
};


//to retrieve the channel data from database
export const getChannelData = async (userEmail) => {
  try {
    const userRef = doc(db, 'users', userEmail);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching channel data: ', error);
    throw error;
  }
};
