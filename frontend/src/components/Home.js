import { initContent } from "../reducers/contentReducer"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import useWindowSize from "../hooks/hooks"
import ProductList from "./ProductList"
import ProductListSmall from './ProductListSmall'



const Home = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.content)

    const size = useWindowSize()

    useEffect(() => {
      if (!content) {
        dispatch(initContent())
      }
    }, [dispatch, content])

    



  return (
    <>

    {size.width > 700
    ? content.categories && <ProductList category={content.categories[0]} />
    : content.categories && <ProductListSmall category={content.categories[0]} />
    }


    
    </>
  )
}

export default Home