import React from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Typography,Row,Col,Statistic } from 'antd'
import {Link} from 'react-router-dom'
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
const {Title} = Typography;
const Homepage = () => {
   const {data,isFetching} = useGetCryptosQuery(10);
   const globalStats = data?.data?.stats;
   if(isFetching) return 'Loading...'
   
  return (
   <>
   <Title level={2} className='heading'>
         Global Crypto Stats
   </Title>
   <Row>
      <Col span={12}>< Statistic title="Total crypto currencies" value={globalStats.total} /></Col>
      <Col span={12}>< Statistic title="Total Exchanges" value={globalStats.totalExchanges}  /></Col>   
      <Col span={12}>< Statistic title="Total Market Cap" value={globalStats.totalMarketCap}  /></Col>
      <Col span={12}>< Statistic title="Total 24hr volume" value={globalStats.total24hVolume}  /></Col>
      <Col span={12}>< Statistic title="Total Markets" value={globalStats.totalMarkets}  /></Col>
   </Row>
   <div className='home-heading-container'>
          <Title level={2} className='home-title' >Top 10 Crypto Currencies</Title>
          <Title level={2} className='show-more' ><Link to="/cryptocurrencies">Show more</Link></Title>  
   </div>
   <Cryptocurrencies simplified/>
   <div className='home-heading-container'>
          <Title level={2} className='home-title' >Latest Crypto News</Title>
          <Title level={2} className='show-more' ><Link to="/news">Show more</Link></Title>  
   </div>
   <News simplified />

   </>
  )
}

export default Homepage