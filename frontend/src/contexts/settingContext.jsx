import { useState, createContext, useEffect } from "react";
// import { mocksettings } from "../constants";
import axios from "axios";

const SettingContext = createContext({});

export function SettingContextProvider({ children }) {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // async function fetchSettings() {alert('fetching settings')}
  async function fetchSettings  () {
    setLoading(true);
    setError(null);
   try {
     const response =  await axios.get('/api/settings')
     if (response.status == 200) {
      //  console.log(response.data);
       setSettings(response.data);
      //  set backup settings incase there is an error in the furure
      localStorage.setItem('settings', JSON.stringify(response.data)) 

     } else {
       //  use backup settings incase setting fetch fails
      //  if (JSON.parse(localStorage.getItem('settings'))) setSettings(JSON.parse(localStorage.getItem('settings')))
      //   else
       throw new Error(`an error occured:  ${response?.data?.message || ''}`)
     }

   } catch (error) {
     console.error(error)
console.error(error.stack);
     
     //  use backup settings incase setting fetch fails
     if (JSON.parse(localStorage.getItem('settings'))) setSettings(JSON.parse(localStorage.getItem('settings')))
      else setError(error.message);
    
    
   } finally {
     setLoading(false);
   }

  }
  useEffect(()=> {
    fetchSettings();

  }, [])

  return (
    <SettingContext.Provider value={{settings, loading, error, fetchSettings}}>
      {children}
    </SettingContext.Provider>
  );
}

export default SettingContext