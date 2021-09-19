import { useState } from "react"
import { initContent } from "../reducers/contentReducer"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductList from "./ProductList"



const Home = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.content)
    const categories = useSelector(state => state.content.categories)

  
    useEffect(() => {
      if (content.length === 0) {
        dispatch(initContent(1))
      }
    }, [dispatch])



    return (
        <div>
          {categories &&
          <ProductList category={categories[0]} />
          }
        </div>
    )
}

export default Home