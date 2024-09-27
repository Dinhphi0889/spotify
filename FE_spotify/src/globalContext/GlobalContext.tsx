import { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from 'react';

interface GlobalContextType {
    idMusic: string | undefined;
    nameArtists: string | undefined;
    setIdMusic: Dispatch<SetStateAction<string | undefined>>;
    setNameArtists: Dispatch<SetStateAction<string | undefined>>
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [idMusic, setIdMusic] = useState<string | undefined>(undefined);
    const [nameArtists, setNameArtists] = useState<string | undefined>(undefined);

    return (
        <GlobalContext.Provider value={{
            idMusic, setIdMusic,
            nameArtists, setNameArtists,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
