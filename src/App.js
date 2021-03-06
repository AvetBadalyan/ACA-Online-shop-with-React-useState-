import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

import Header from "./Components/Header/Header";
import Products from "./Components/Products/Products";
import Modal from "./Components/Modal/Modal";

function App() {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((products) => {
        setProducts(
          products.map((item) => {
            return { ...item, itemCount: 0 };
          })
        );
      });
  }, []);

  const cartOpenHandler = () => {
    setIsCartOpen(!isCartOpen);
  };

  const changeItemCount = (id, delta) => {
    const changedCart = products.map((item) => {
      if (item.id === id) {
        return { ...item, itemCount: item.itemCount + delta };
      } else {
        return item;
      }
    });
    setProducts(changedCart);
  };

  const deleteItemFromCart = (id) => {
    let filteredCart = products.map((item) => {
      return item.id === id ? { ...item, itemCount: 0 } : item;
    });
    setProducts(filteredCart);
  };

  const emptyCart = () => {
    let deletedCart = products.map((item) => {
      if (item.itemCount > 0) {
        return { ...item, itemCount: 0 };
      } else {
        return item;
      }
    });
    setProducts(deletedCart);
  };

  const cartProducts = products.filter((item) => {
    return item.itemCount > 0;
  });

  return (
    <div className="App">
      
      <Header
        cartCount={cartProducts.length}
        cartOpenHandler={cartOpenHandler}
      />
      {isCartOpen && (
        <Modal
          products={cartProducts}
          changeItemCount={changeItemCount}
          deleteItemFromCart={deleteItemFromCart}
          emptyCart={emptyCart}
        />
      )}
      <Products products={products} changeItemCount={changeItemCount} />
    </div>
  );
}

export default App;
