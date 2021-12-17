import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import baseURL from '../services/baseURL'

const PriceFile = () => {
    const dispatch = useDispatch()

    const [ data, setData ] = useState('')

    const content = useSelector(state => state.content)

    const getPriceFile = async (content) => {

      const response = await axios.post(`${baseURL}/generate_price_index/`, content)
      console.log(response)
      return response.data
    }




    useEffect(() => {
      if (content.id) {
        const sid = {
          siteid: content.id,
        }
     
        const res = getPriceFile(sid)
        console.log(res)
    

        


      }

    }, [content])



    return (
        <>
            
        </>
    )
}

export default PriceFile