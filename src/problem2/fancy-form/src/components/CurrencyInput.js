import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`

const CurrencyInput = ({ name, register }) => {
  return (
    <Input
      {...register(name, {
        required: {
          value: true,
          message: 'This field is required.'
        },
        pattern: {
          value: /^[0-9]*\.?[0-9]*$/,
          message: 'Invalid input. Please enter a valid number.'
        }
      })}
    />
  )
}

export default CurrencyInput
