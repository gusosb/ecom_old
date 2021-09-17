import { useState } from "react"
import ProductCard from "./ProductCard"
import { useSelector } from "react-redux"

const Home = () => {

    const content = useSelector(state => state.content)

    return (
        <div>


            <ProductCard />
            
        </div>
    )
}

export default Home