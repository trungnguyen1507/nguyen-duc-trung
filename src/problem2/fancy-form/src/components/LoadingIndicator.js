import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: ${spin} 1s linear infinite;
`

const LoadingIndicator = () => {
  return <Loader />
}

export default LoadingIndicator
