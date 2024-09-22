import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CryptoContext = createContext();

export const useCrypto = () => {
    return useContext(CryptoContext);
};

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'YOUR_API_KEY',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

export const CryptoProvider = ({ children }) => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const count = 10; // Number of cryptocurrencies to fetch

    const fetchCryptos = useCallback(async () => {
        setLoading(true);
        setError(null); // Reset error state before fetching
        try {
            const response3 = await fetch(`${baseUrl}/coins?limit=${count}`, {
                headers: cryptoApiHeaders,
            });
            const response2 = await fetch(`${baseUrl}/coins?limit=${count}`, {
                headers: cryptoApiHeaders,
            });
            const response = await fetch(`${baseUrl}/coins?limit=${count}`, {
                headers: cryptoApiHeaders,
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setCryptos(data.data.coins);
        } catch (err) {
            setError(err.message); // Set the error message
        } finally {
            setLoading(false);
        }
    }, [count]);

    useEffect(() => {
        fetchCryptos();
    }, [fetchCryptos]); // Depend on fetchCryptos only

    return (
        <CryptoContext.Provider value={{ cryptos, loading, error, fetchCryptos }}>
            {children}
        </CryptoContext.Provider>
    );
};
