import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProductDetails from "../Components/Products/ProductDetails.jsx"
import { useParams } from 'react-router-dom'
import { productData } from '../static/data.jsx'
import SuggestedProduct from "../Components/Products/SuggestedProduct.jsx"

const ProductDetailsPage = () => {
    const {name} = useParams();
    const [data, setData] = React.useState(null);
    const productName = name.replace(/-/g, " ");

    React.useEffect(() => {
        const data = productData.find((i)=> i.name === productName);
        setData(data);
    },[])
  return (
    <div>
      <Header/>
      <ProductDetails data={data}/>
      {data && 
        <SuggestedProduct data={data} />
        }
      <Footer/>
    </div>
  )
}

export default ProductDetailsPage
