import React from 'react'
import Select from 'react-select'
import { formatCurrencyName } from '../utils/utils'

export const currencyIconsBaseUrl = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/'

const customSingleValue = ({ data }) => {
  const iconUrl = `${currencyIconsBaseUrl}${formatCurrencyName(data.value)}.svg`
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={iconUrl} alt={data.label} style={{ width: 20, marginRight: 10 }} />
      {data.label}
    </div>
  )
}

const customOption = (props) => {
  const iconUrl = `${currencyIconsBaseUrl}${formatCurrencyName(props.data.value)}.svg`
  return (
    <div {...props.innerProps} style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
      <img src={iconUrl} alt={props.data.label} style={{ width: 20, marginRight: 10 }} />
      {props.data.label}
    </div>
  )
}

const customStyles = {
  valueContainer: (provided) => ({
    ...provided,
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px'
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center'
  })
}

const CurrencySelect = ({ name, currencies, register, onChange }) => {
  return (
    <Select
      defaultValue=''
      options={currencies}
      components={{ SingleValue: customSingleValue, Option: customOption }}
      {...register(name, { required: 'Please select a currency' })}
      onChange={onChange}
      isSearchable={false}
      placeholder='Please select a currency'
      styles={customStyles}
    />
  )
}

export default CurrencySelect
