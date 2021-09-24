import { initContent } from "../reducers/contentReducer"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductList from "./ProductList"



const Home = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.content)
    const categories = content.categories

  
    useEffect(() => {
      if (!content) {
        dispatch(initContent(1))
      }
    }, [dispatch, content])



  return (
    <>
    {categories &&
    <ProductList category={categories[0]} />
    }
    </>
  )
}

export default Home