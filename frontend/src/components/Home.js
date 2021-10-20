import { initContent } from "../reducers/contentReducer"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductList from "./ProductList"



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
    {content.categories &&
    <ProductList category={content.categories[0]} />
    }
    </>
  )
}

export default Home