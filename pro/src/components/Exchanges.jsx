import React from 'react'
import { Button } from 'antd'
import { useState } from 'react'
const Exchanges = () => {
 
  
  const [value, setVlaue]= useState(0)
  function increment(){
     const x= value+1
      setVlaue(x)

  }
  return (
    <>
    <div>Homepage {value} </div>
    <Button onClick={increment()}>increment</Button>
    </>
  )
}

export default Exchanges