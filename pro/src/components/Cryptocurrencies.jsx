import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Button } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi'; // Redux
import { useCrypto } from '../context/CryptoContext'; // Context

const Cryptocurrencies = ({ simplified }) => {
    const [useRedux, setUseRedux] = useState(true);
    const count = simplified ? 10 : 100;

    // Redux query
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    
    // Context API
    const { cryptos, fetchCryptos, loading } = useCrypto();

    const [cryptosToDisplay, setCryptosToDisplay] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingTime, setLoadingTime] = useState(0);

    // Fetch cryptos only when switching to Context
    useEffect(() => {
        const fetchStartTime = Date.now(); // Start time
        if (!useRedux) {
            fetchCryptos(); // Fetch cryptos only when using Context
        }
        const fetchEndTime = Date.now(); // End time
        setLoadingTime(fetchEndTime - fetchStartTime); // Calculate loading time
    }, [useRedux, fetchCryptos]);

    // Filter data based on the selected mode
    useEffect(() => {
        const filterData = (data) => {
            return data.filter((coin) =>
                coin.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        };

        if (useRedux && cryptosList?.data) {
            setCryptosToDisplay(filterData(cryptosList.data.coins));
        } else if (!useRedux && cryptos) {
            setCryptosToDisplay(filterData(cryptos));
        }
    }, [cryptosList, cryptos, searchTerm, useRedux]);

    if (loading || (useRedux && isFetching)) return 'Loading...';

    return (
        <>
            <div>
                <Button onClick={() => setUseRedux(true)}>Use Redux</Button>
                <Button onClick={() => setUseRedux(false)}>Use Context</Button>
            </div>
            <h3>You are using {useRedux ? 'Redux' : 'Context'} state management</h3>
            <h4>Loading Time: {loadingTime} ms</h4>
            {!simplified && (
                <div className="search-crypto">
                    <Input
                        placeholder="Search Cryptocurrency"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptosToDisplay?.map((currency) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        className="crypto-card"
                        key={currency.uuid}
                    >
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl} alt={`${currency.name} icon`} />}
                                hoverable
                            >
                                <p>Price: ${(currency.price).toLocaleString()}</p>
                                <p>Market Cap: ${(currency.marketCap).toLocaleString()}</p>
                                <p>Daily Change: {currency.change}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Cryptocurrencies;
