import useWindowSize from "../hooks/hooks"
import ProdBig from "./ProdBig"
import ProdSmall from "./ProdSmall"

const Prod = () => {
  const size = useWindowSize()
  return (
    <>
    {size.width > 900 ? <ProdBig /> : <ProdSmall />}
      
    </>
  )
}

export default Prod