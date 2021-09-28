import { useLocation } from "react-router-dom"
import ProductList from './ProductList'

import Grid from '@mui/material/Grid'

const Category = () => {

    const location = useLocation()
    const category = location.state.e
    console.log(category)


    return (
        <>
        {category &&
        <ProductList category={category} />
        }
        </>
    )
}

export default Category