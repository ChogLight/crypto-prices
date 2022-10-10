import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import useSelectCurrencies from "../hooks/useSelectCurrencies"
import Error from "./Error"
const Button = styled.input`
    background-color:#9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size:20px;
    border-radius: 10px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`


const Form = ({setCurrencies}) => {

  const [cryptos, setCryptos] = useState([])
  const currencies = [
    {id: 'USD', name: 'United States Dollar'},
    {id: 'CAD', name: 'Canadian Dollar'},
    {id: 'COP', name: 'Colombian Peso'},
    {id: 'EUR', name: 'Euro'},
    {id: 'GBP', name: 'Great Britain Pound'},
  ]
  const [ currency, SelectCurrency ] = useSelectCurrencies('Pick the currency', currencies)
  const [ crypt, SelectCrypt ] = useSelectCurrencies('Pick the crypto', cryptos)
  const [ error, setError ] = useState(false)

  useEffect(() => {
    const consultAPI = async () =>{
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
      const response = await fetch(url);
      const result = await response.json();
      const arrayCryptos = result.Data.map(crypto => {
        
        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName
        }

        return object
      })
      setCryptos(arrayCryptos)
    }
    consultAPI()
  }, [])

  const handleSubmit =e => {

    e.preventDefault()
    if([currency, crypt].includes('')){

      setError(true)
      return
    }
    setError(false)

    setCurrencies({
      currency,
      crypt
    })

  }
  return (
    <>
      {error && <Error>All fields are mandatory</Error>}
    <form
      onSubmit={handleSubmit}
    >

        <SelectCurrency/>
        <SelectCrypt/>

        <Button 
            type = "submit" value = "Get Price"
        />
    </form>
    </>
    
  )
}

export default Form
