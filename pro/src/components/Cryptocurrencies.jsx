import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Card,Row,Col,Input} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'


const Cryptocurrencies = ({simplified}) => {
    const count =  simplified ? 10 :100
    const {data: cryptosList,isFetching} = useGetCryptosQuery(count);
    const [cryptos,setCryptos] =useState([])
    const [searchTerm,setSearchTerm] = useState('')   
    
    useEffect(()=>{
            const filterData = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setCryptos(filterData)
        },[cryptosList,searchTerm])
    
    if(isFetching) return 'Loading...'
  return (
    <>
    {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >

            {/* Note: Change currency.id to currency.uuid  */}
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {(currency.price)}</p>
                <p>Market Cap: {(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default  Cryptocurrencies