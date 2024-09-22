import React, { useEffect } from 'react';
import { useCrypto } from './CryptoContext';

const CryptoComponent = () => {
    const { cryptos, fetchCryptos, loading, error } = useCrypto();

    useEffect(() => {
        fetchCryptos(10); // Fetch 10 cryptocurrencies, adjust as needed
    }, [fetchCryptos]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {cryptos.map((coin) => (
                <div key={coin.id}>{coin.name}</div> // Adjust based on your data structure
            ))}
        </div>
    );
};

export default CryptoComponent;
