import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import CurrencyInput from './CurrencyInput'
import LoadingIndicator from './LoadingIndicator'
import { formatCurrencyName } from '../utils/utils'
import CurrencySelect, { currencyIconsBaseUrl } from './CurrencySelect'

const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
  margin: auto;
  margin-top: 50px;
`

const FormField = styled.div`
  margin-bottom: 10px;
`

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`

const ErrorMessage = styled.span`
  color: red;
  display: block;
  margin-top: 5px;
  min-height: 20px;
`

const SwapButton = styled.button`
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:disabled {
    background: #ccc;
  }
`

const ResultContainer = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
  min-height: 20px;
`

const CurrencySwapForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [currencies, setCurrencies] = useState([])
  const [prices, setPrices] = useState({})
  const [result, setResult] = useState(null)

  useEffect(() => {
    axios.get('https://interview.switcheo.com/prices.json').then((response) => {
      // console.log(response)
      const pricesData = response.data.reduce((acc, item) => {
        acc[item.currency] = item.price
        return acc
      }, {})
      setPrices(pricesData)
      const currencyKeys = Object.keys(pricesData)
      setCurrencies(
        currencyKeys.map((key) => ({
          value: key,
          label: key,
          icon: `${currencyIconsBaseUrl}${formatCurrencyName(key)}.svg`
        }))
      )
    })
  }, [])

  // console.log(prices)
  // console.log(currencies)

  const onSubmit = (data) => {
    console.log('data', data)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const fromPrice = prices[data.fromCurrency.value]
      const toPrice = prices[data.toCurrency.value]
      const toAmount = (Number(data.fromAmount) * fromPrice) / toPrice
      setResult(
        `Swapped ${data.fromAmount} ${data.fromCurrency.value} to ${toAmount.toFixed(2)} ${data.toCurrency.value}`
      )
    }, 2000)
  }

  return (
    <FormContainer>
      <h2>Currency Swap</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label>From Amount</Label>
          <CurrencyInput name='fromAmount' register={register} />
          <ErrorMessage>{errors.fromAmount?.message}</ErrorMessage>
        </FormField>

        <FormField>
          <Label>From Currency</Label>
          <CurrencySelect
            name='fromCurrency'
            currencies={currencies}
            onChange={(selectedOption) => setValue('fromCurrency', selectedOption)}
            register={register}
          />
          <ErrorMessage>{errors.fromCurrency?.message}</ErrorMessage>
        </FormField>

        <FormField>
          <Label>To Currency</Label>
          <CurrencySelect
            name='toCurrency'
            currencies={currencies}
            onChange={(selectedOption) => setValue('toCurrency', selectedOption)}
            register={register}
          />
          <ErrorMessage>{errors.toCurrency?.message}</ErrorMessage>
        </FormField>

        <SwapButton type='submit' disabled={isLoading}>
          {isLoading ? <LoadingIndicator /> : 'Swap'}
        </SwapButton>
      </form>
      <ResultContainer>{result}</ResultContainer>
    </FormContainer>
  )
}

export default CurrencySwapForm
