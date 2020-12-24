import React, {useState, createContext} from 'react';
import { useHistory } from  'react-router-dom';

export const CpeContext = createContext();

const CpeContextProvider = (props) => {
    const history = useHistory();
    const [cpe, setCpe] = useState(null);

    const setDataCpe = (cpe) => {
        setCpe(cpe); 
        return history.push('/result');
    }

    return(
        <CpeContext.Provider value={{cpe, setDataCpe}}>
            {props.children}
        </CpeContext.Provider>
    )
}

export default CpeContextProvider;