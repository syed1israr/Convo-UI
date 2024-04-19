import React from 'react'
import { Helmet } from 'react-helmet-async'
const Title = (
    {title="chat App",description="This is chat app made by me"}
) => {
  return <Helmet>
    <title>{title}</title>
    <meta content={description} name='description'></meta>
  </Helmet>
}
{/*
  Hi
*/}
export default Title