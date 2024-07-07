import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import {InputBox} from './components/index.js'

function App() {

  const [amount, setAmount] = useState('')
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)
  
  //we are saving a custom hook that we made useCurrencyInfo to save its data in a const variable currencyInfo
  const currencyInfo = useCurrencyInfo(from)
  const options =  Object.keys(currencyInfo)

  const swap = () => {
    //when swap we interchange the label, entered amount, and input fields for currency selection

    //const userAmount = amount
    setFrom(to)
    setTo(from)
    
    setConvertedAmount(amount)
    //this i've modified on own, adding 1 milisecond delay, to swap both values properly
    //earlier once swap func runs, both amount becomes same instantly to there was no actual swap amount display for user
    //so making it slightly delay, first the convertedvalue is being swapped by user input amount
    setTimeout(function() { setAmount(convertedAmount); }, 100);
    //setAmount(convertedAmount)
  }

  const convert = () => {
    //we are taking amount type entered by user and multiply with the matching currency the user is looking to
    //eg. bydefault from is usd then user enters {to} to inr - so this below code takes amount of usd * inr [value] in the object that is returned
    //eg. 10 usd to inr -> gets converted like this -> 10 * 83.24 -> and we set the result 830.40 to variable setConvertedAmount
    setConvertedAmount(amount * currencyInfo[to])
  }


  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{backgroundImage: 'url(https://images.pexels.com/photos/4497591/pexels-photo-4497591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'}}>
      
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto  border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
          <form onSubmit={(e) => {
            //this form when submitted firstly prevents default reload of page, then runs a function convert that does the math part
            e.preventDefault()
            convert()
          }}>
            <div className='w-full mb-1'>
              <InputBox
              label="from"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              onAmountChange={(amount) => setAmount(amount)}
              selectedCurrency={from}
              />
            </div>
            <div className='relative w-full h-0.5'>
              <button
              onClick={swap} 
              className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'>
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox
              label="to"
              currencyOptions={options}
              amount={convertedAmount.toFixed(2)}
              onCurrencyChange={(currency) => setTo(currency)}
              selectedCurrency={to}
              amountDisabled={true}
              />
            </div>
            <button
            type='submit'
            className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-0.5'>Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default App
