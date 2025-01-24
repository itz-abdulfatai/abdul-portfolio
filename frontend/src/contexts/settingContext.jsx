import { useState, createContext, useEffect } from "react";
// import { mocksettings } from "../constants";
import axios from "axios";

const SettingContext = createContext({});

export function SettingContextProvider({ children }) {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  async function fetchSettings  () {
    setLoading(true);
    setError(null);
   try {
     const response =  await axios.get('/api/settings')
     if (response.status == 200) {
       console.log(response.data);
       setSettings(response.data);
      //  set backup settings incase there is an error in the furure
      localStorage.setItem('settings', response.data) 

     } else {
      throw new Error(`an error occured:  ${response?.data?.message || ''}`)
     }

   } catch (error) {
     console.error(error);
     setError(error.message);
     // Handle error here, for example, show a toast message.
    
   } finally {
     setLoading(false);
   }

  }
  useEffect(()=> {
    fetchSettings();

  }, [])

  return (
    <SettingContext.Provider value={{settings, loading, error}}>
      {children}
    </SettingContext.Provider>
  );
}

export default SettingContext