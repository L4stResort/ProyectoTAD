import { Fragment, useEffect, useState } from "react";
import "../Style/CheckOut.css";

function CheckOut() {
  const [userName, setUserName] = useState({ firstName: "", lastName: "" });
  const [userId, setUserId] = useState(""); // <-- Nuevo estado para el id del usuario
  const [cartData, setCartData] = useState({ total: 0, Products: [] });
  const [cardType, setCardType] = useState("Visa");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:9001/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUserName(data);
            setUserId(data._id); // <-- Guarda el id del usuario
          });
        } else {
          window.location.href = "/login";
        }
      });
    } else {
      window.location.href = "/login";
    }

    // Obtener datos del carrito
    fetch("http://localhost:9003/cart", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })
      .then(res => res.json())
      .then(data => setCartData(data));
  }, []);

  async function submitHandler(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    setIsProcessing(true);

    // Guardar historial de compra
    await fetch("http://localhost:9003/userHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({
        userId, // <-- Envía el id del usuario
        name: userName.firstName + " " + userName.lastName,
        products: cartData.Products,
        total: cartData.total,
        date: new Date().toISOString(),
        cardType,
        cardNumber: "****" + cardNumber.slice(-4)
      }),
    });

    // Vaciar carrito
    fetch("http://localhost:9003/cart/checkout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })
      .then((response) => {
        setIsProcessing(false);
        if (response.ok) {
          alert("¡Tu compra fue realizada con éxito!");
          window.location.href = "/profile";
        } else {
          alert("Error al procesar la compra");
        }
      })
      .catch(() => {
        setIsProcessing(false);
        alert("Error al procesar la compra");
      });
  }

  return (
    <Fragment>
      <div className="wrapper">
        <div className="spaceto">
          <div className="containers">
            <div className="title">Pasarela de Pago</div>
            <form className="input-form" onSubmit={submitHandler}>
              <div className="section-1">
                <div className="items">
                  <label className="label">Nombre</label>
                  <input
                    type="text"
                    className="input"
                    value={userName.firstName + " " + userName.lastName}
                    readOnly
                  />
                </div>
                <div className="items">
                  <label className="label">Total a pagar</label>
                  <input
                    type="text"
                    className="input"
                    value={`$${cartData.total.toFixed ? cartData.total.toFixed(2) : cartData.total}`}
                    readOnly
                  />
                </div>
              </div>
              <div className="section-2">
                <div className="items">
                  <label className="label">Tipo de tarjeta</label>
                  <select
                    className="input"
                    value={cardType}
                    onChange={e => setCardType(e.target.value)}
                  >
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                    <option value="Amex">Amex</option>
                  </select>
                </div>
                <div className="items">
                  <label className="label">Número de tarjeta</label>
                  <input
                    type="text"
                    className="input"
                    maxLength={16}
                    placeholder="1234 1234 1234 1234"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="section-3">
                <div className="items">
                  <label className="label">Nombre en la tarjeta</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Nombre como aparece en la tarjeta"
                    value={cardName}
                    onChange={e => setCardName(e.target.value)}
                    required
                  />
                </div>
                <div className="items">
                  <label className="label">Fecha de expiración</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    required
                  />
                </div>
                <div className="items">
                  <div className="cvc">
                    <label className="label">CVC</label>
                    <div className="tooltip">
                      ?
                      <div className="cvc-img">
                        <img src="https://i.imgur.com/r8oXtry.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="input"
                    maxLength={4}
                    placeholder="0000"
                    value={cardCVC}
                    onChange={e => setCardCVC(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button className="bat" type="submit" disabled={isProcessing}>
                {isProcessing ? "Procesando..." : "Pagar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default CheckOut;