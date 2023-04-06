import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {

    const [cart, setCart] = useState([])

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product]
        setCart(newCart);
        addToDb(product.id)
        // console.log(newCart)
    }

    useEffect(() => {
        const storedCart = getShoppingCart();
        // console.log(storedCart)

        //step 1(for in loop)
        for (const id in storedCart) {

            const savedCart = [];


            //step 2 get product by using id
            const addedProduct = products.find(product => product.id === id)
            // console.log(addedProduct)

            if (addedProduct) {
                //step 3 get quantity of each product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }



        }
    }, [products])

    return (
        <div className='shop-container'>

            <div className="product-container">
                {
                    products.map(product => {
                        return <Product
                            key={product.id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>
                    })
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>


        </div>
    );
};

export default Shop;