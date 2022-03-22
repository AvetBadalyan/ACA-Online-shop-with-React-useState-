import React from "react";
import "./Item.css";
import Cart from "../../Assets/cart.svg";
import { useState } from "react";

export default function Item({ price, title, image, id, addCart, subCart }) {
  const [totalCount, setTotalCount] = useState(0);

  const modalProduct = {
    title: title,
    price: price,
    id: id,
    image: image,
    totalCount: totalCount + 1,
  };

  const addCartHandler = () => {
    setTotalCount(totalCount + 1);
    addCart(modalProduct);
  };

  const subCartHandler = () => {
    if (totalCount > 0) {
      setTotalCount(totalCount - 1);
      subCart(modalProduct);
    }
  };

  return (
    <div className="Wrapper" key={id}>
      <img src={image} alt="image" className="item-image" />
      <div className="title">{title.slice(0, 12)}...</div>
      <div className="price">$ {price.toFixed(2)}</div>
      {totalCount <= 0 && (
        <img
          src={Cart}
          alt="cart"
          width="30px"
          height="30px"
          onClick={() => {
            setTotalCount(totalCount + 1);
          }}
        />
      )}
      {totalCount > 0 && (
        <div className="Counter">
          <button onClick={subCartHandler} className="button">
            -
          </button>
          <div>
            <p>Total Count: {totalCount} </p>
          </div>
          <button onClick={addCartHandler} className="button">
            +
          </button>
        </div>
      )}
    </div>
  );
}
