import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import ProductListSmall from './ProductListSmall'

const Category = () => {
    const { catid } = useParams()
    const content = useSelector(state => state.content)



    const category = content.categories ? content.categories.find(e => e.id === parseInt(catid)) : ''

    return (
        <>
        {category &&
        <ProductListSmall category={category} />
        }
        </>
    )
}

export default Category