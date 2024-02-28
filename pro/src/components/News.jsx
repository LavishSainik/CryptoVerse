import React from 'react'
import { Select,Typography,Row,Col , Avatar,Card } from 'antd'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useState,useEffect } from 'react';

const {Text,Title}=Typography
const {Option}= Select
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {
    const { data ,error } = useGetCryptoNewsQuery({newsCategory:'Cryptocurrency',count: simplified?6:12})
   
    if(data){
        console.log(data.news[0].title);
    }
    if (error) {
        return `Error: ${error.message}`;
      }
    
     
    return (
        <Row gutter={[24, 24]}>l
       {data?.news?.map((news, i) => (
  <Col xs={24} sm={12} lg={8} key={i}>
    <Card hoverable className='news-card'>
      <a href={news.url} target='_blank' rel="noreferrer">
        <div className='news-image-container'>
          <Title className='news-title' level={4}>{news.title}</Title>
         
           <Avatar src={news?.image || demoImage} size={72} shape="square" />
        </div>
        <p>{news.body.length > 100 ? `${news.body.substring(0, 100)}...` : news.body}</p>
      </a>
    </Card>
  </Col>
))}
      </Row>

 
    
  )
}

export default  News