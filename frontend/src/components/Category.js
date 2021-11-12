import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"
import { initContent } from "../reducers/contentReducer"
import ProductList from './ProductList'

const Category = () => {



    const { catid } = useParams()
    const content = useSelector(state => state.content)

    const category = content.categories ? content.categories.find(e => e.id === parseInt(catid)) : ''






    return (
        <>
        {category &&
        <ProductList category={category} />
        }
        </>
    )
}

export default Category