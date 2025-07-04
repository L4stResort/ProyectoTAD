import { Fragment, useEffect, useState } from "react";

import "../Style/Cart.css";
import NavBar from "../component/NavBar";

function Cart() {
  const [cartData, setCartData] = useState({ total: 0, Products: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    setIsAuthenticated(true);

    const fetchCartData = async () => {
      try {
        const response = await fetch("http://localhost:9003/cart", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCartData(data);
        } else {
          if (response.status === 401) {
            window.location.href = "/login";
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    // Update total price when cartData changes
    if (cartData) {
      const totalPriceElement = document.getElementById("totalPrice");
      if (totalPriceElement) {
        totalPriceElement.innerHTML = "Total: $" + cartData.total;
      }
    }
  }, [cartData]);

  // Función para eliminar un producto del carrito
  const handleDeleteProduct = async (productId: string, productPrice: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    const response = await fetch(
      `http://localhost:9003/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      setCartData((prev: any) => {
        const updatedProducts = prev.Products.filter((p: any) => p._id !== productId);
        //const newTotal = updatedProducts.reduce((sum: number, p: any) => sum + Number(p.price || 0), 0);
        const newTotal = parseFloat(
          updatedProducts.reduce((sum: number, p: any) => sum + Number(p.price || 0), 0).toFixed(2)
     );
        return {
          ...prev,
          Products: updatedProducts,
          total: newTotal,
        };
      });
    } else {
      alert("Error deleting product");
    }
  };

  // Validación para el botón de checkout
  const handleProceedToCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (cartData.Products.length === 0) {
      e.preventDefault();
      alert("Aún no se ha colocado ni un producto");
    } else {
      window.location.href = "/Checkout"; // Redirige a home después del pago
    }
  };

  if (!isAuthenticated || isLoading) {
    return null; // O puedes mostrar un loader si prefieres
  }

  return (
    <Fragment>
      <div className="backgrounds">
        <div className="spacefo2">
          <div className="cart-page">
            <div className="cart-page-container">
              <div className="cart-page-header">
                <h2 className="cart-header-text">Tu carrito de juegos</h2>
              </div>
              <div className="cart-page-table">
                <table className="cart-table-product">
                  <thead>
                    <tr className="cart-table-header">
                      <th className="cart-table-img">Imagen del Producto</th>
                      <th className="cart-table-desktop cart-table-payment">
                        Nombre
                      </th>
                      <th className="cart-table-desktop cart-table-size">
                        Categoria
                      </th>
                      <th className="cart-table-size right-text-mobile">
                        Precio
                      </th>
                      <th className="cart-table-size right-text-mobile">
                        Accion
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {cartData.Products.map((product: any) => (
                    <tr className="cart-table-content" key={product._id}>
                      <td className="cart-table-image-info">
                        <img src={product.image} alt="Product Image"/>
                      </td>
                      <td className="bold-text">{product.name}</td>
                      <td>{product.category}</td>
                      <td>${product.price}</td>
                      <td>
                        <button
                          className="cart-delete-btn"
                          onClick={() => handleDeleteProduct(product._id, product.price)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              <div className="cart-table-bill">
                <div className="bill-total bold-text">
                  ${cartData.total.toFixed ? cartData.total.toFixed(2) : cartData.total}
                </div>
              </div>
              <div className="cart-header-footer">
                <button
                  className="cart-header-cta red-bg"
                  type="button"
                  onClick={handleProceedToCheckout}
                >
                  Realizar compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .cart-delete-btn {
            background-color: #e74c3c;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 6px 14px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.2s;
          }
          .cart-delete-btn:hover {
            background-color: #c0392b;
          }
        `}
      </style>
    </Fragment>
  );
}
export default Cart;
//**
//  */

// ahora con validacion de que el carrito no este vacio

//ahora cuando proceda el pago se diriga a la pagina home