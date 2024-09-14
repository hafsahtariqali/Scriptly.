import { db } from '../../../firebase';
import { doc, setDoc, updateDoc, getDoc } from  'firebase/firestore';



export const saveChannelData = async (userEmail, channelData) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  try {
    // Check for validation errors
    if (channelData.weeklyScriptLimit > 10) {
      alert('Weekly script limit cannot exceed 10.');
      return false;
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
      language: channelData.language,
      scriptsGeneratedThisWeek: 0, 
      userCreated: formattedDate
    }); 

    // Successfully saved
    return true;
  } catch (error) {
    console.error('Error saving channel data: ', error);
    // Display error to the user
    alert('Failed to save data. Please try again.');
    return false;
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
    console.log('Getting channel data for user:', userEmail);
    const userRef = doc(db, 'users', userEmail);
    console.log('User reference:', userRef);
    const userSnap = await getDoc(userRef);
    console.log('User snapshot:', userSnap);

    if (userSnap.exists()) {
      console.log('User data:', userSnap.data());
      return userSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching channel data:', error);
    throw error;
  }
};