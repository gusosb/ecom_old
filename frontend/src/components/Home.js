import { initContent } from "../reducers/contentReducer"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductListSmall from './ProductListSmall'



const Home = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.content)



    useEffect(() => {
      if (!content) {
        dispatch(initContent())
      }
    }, [dispatch, content])

    



  return (
    <>
    <link rel="preconnect" href="https://api.kanindev.se/api" />
    {/*{size.width > 700
    ? content.categories && <ProductList category={content.categories[0]} />
    : content.categories && <ProductListSmall category={content.categories[0]} />
    }*/}
    {content.categories && <ProductListSmall category={content.categories[0]} />}


    
    </>
  )
}

export default Home