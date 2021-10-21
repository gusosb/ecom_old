import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import ProductList from './ProductList'

const Category = () => {

    const { catid } = useParams()
    const cats = useSelector(state => state.content.categories)

    const category = cats ? cats.find(e => e.id === parseInt(catid)) : ''

    


    return (
        <>
        {category.products &&
        <ProductList category={category} />
        }
        </>
    )
}

export default Category