// import "../Style/profile.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import NavBar from "../component/NavBar";
// import data from "../data.json";
// import clip1 from "../assets/clip-01.jpg";
// import clip2 from "../assets/clip-02.jpg";
// import clip3 from "../assets/clip-03.jpg";
// import clip4 from "../assets/clip-04.jpg";
// import profile from "../assets/profile.jpg";
// import profileg from "../assets/profileGirl.jpg";
// import { useState, useEffect, Fragment } from "react";
// function Profile() {


//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       //3001 is the port for the user service
//       fetch("http://localhost:9001/users/", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }).then((response) => {
//         if (response.ok) {
//           response.json().then((data) => {
//             setUser(data);
//           });
//         } else {
//           window.location.href = "/login";
//         }
//       });
//     } else {
//       window.location.href = "/login";
//     }
//   }, []);


//   // Función para cerrar sesión
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   // var image = profile;
//   // if (data.gender === "female") {
//   //   image = profileg;
//   // }
//   return (
//     <Fragment>
//       <NavBar />
//       <div className="widt">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="page-content">
//               <div className="row">
//                 <div className="col-lg-12">
//                   <div className="main-profile">
//                     <div className="row">
//                       <div className="col-lg-4">
//                         {/* Render user profile image here */}
//                         <img src={user.gender === "female" ? profileg : profile} alt="Profile Image" />
//                       </div>
//                       <div className="col-lg-4 align-self-center">
//                         <div className="main-info header-text">
//                           <h1 id="firstname">{user.firstName}</h1>
//                           <h5 id="lastname">{user.lastName}</h5>
//                           <p>"I'm {user.firstName}, a passionate gamer who loves exploring new worlds and conquering challenges. Let's conquer the gaming world together!"</p>
//                           <div className="main-border-button">
//                             <a href="#">Update</a>
//                           </div>
//                           <div className="main-border-button" style={{ marginTop: "10px" }}>
//                             <button onClick={handleLogout} className="btn btn-danger">
//                               Cerrar sesión
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-lg-4 align-self-center">
//                         <ul>
//                           <li>
//                             Email <span>{user.email}</span>
//                           </li>
//                           <li>
//                             Age <span>{user.age}</span>
//                           </li>
//                           <li>
//                             Phone Number <span>{user.phone}</span>
//                           </li>
//                           <li>
//                             Clips <span>29</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                     {/* Rest of the JSX code */}
//                     {/* ... */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// }
// export default Profile;


import "../Style/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../component/NavBar";
import data from "../data.json";
import clip1 from "../assets/clip-01.jpg";
import clip2 from "../assets/clip-02.jpg";
import clip3 from "../assets/clip-03.jpg";
import clip4 from "../assets/clip-04.jpg";
import profile from "../assets/profile.jpg";
import profileg from "../assets/profileGirl.jpg";
import { useState, useEffect, Fragment } from "react";

function Profile() {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

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
            setUser(data);
            setUserId(data._id);
          });
        } else {
          window.location.href = "/login";
        }
      });
    } else {
      window.location.href = "/login";
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Mostrar historial de compras
  const handleShowHistory = async () => {
    if (!userId) return;
    const res = await fetch(`http://localhost:9003/userHistory?userId=${userId}`);
    const data = await res.json();
    if (!data || data.length === 0) {
      alert("No tiene ninguna compra");
      setShowHistory(false);
    } else {
      setHistory(data);
      setShowHistory(true);
    }
  };

  return (
    <Fragment>
      <NavBar />
      <div className="widt">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-profile">
                    <div className="row">
                      <div className="col-lg-4">
                        {/* Render user profile image here */}
                        <img src={user.gender === "female" ? profileg : profile} alt="Profile Image" />
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <div className="main-info header-text">
                          <h1 id="firstname">{user.firstName}</h1>
                          <h5 id="lastname">{user.lastName}</h5>
                          <p>
                            "Soy {user.firstName}, un apasionado gamer que ama explorar nuevos mundos y superar desafíos. ¡Conquistemos juntos el mundo de los videojuegos!"
                          </p>
                          <div className="main-border-button">
                            <a href="#">Update</a>
                          </div>
                          <div className="main-border-button" style={{ marginTop: "10px" }}>
                            <button onClick={handleLogout} className="btn btn-danger">
                              Cerrar sesión
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <ul>
                          <li>
                            Correo <span>{user.email}</span>
                          </li>
                          <li>
                            Edad <span>{user.age}</span>
                          </li>
                          <li>
                            Telefono <span>{user.phone}</span>
                          </li>
                          <li>
                            Sexo <span>{user.gender}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* Botón y visualización del historial de compras */}
                    <div style={{ marginTop: "2rem", textAlign: "center" }}>
                      <button className="history-btn" onClick={handleShowHistory}>
                        Historial de compras
                      </button>
                    </div>
                    {showHistory && (
                      <div className="history-section" style={{ marginTop: "2rem" }}>
                        {history.map((item: any, idx) => (
                          <div key={idx} className="history-card" style={{ marginBottom: "1.5rem", background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(44,62,80,0.08)", padding: "1.2rem 1.5rem" }}>
                            <div>
                              <strong>Fecha:</strong> {new Date(item.date).toLocaleString()}
                            </div>
                            <div>
                              <strong>Total:</strong> ${item.total}
                            </div>
                            <div>
                              <strong>Productos:</strong>
                              <ul>
                                {item.products.map((prod: any, i: number) => (
                                  <li key={i}>
                                    {prod.name} (${prod.price})
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <strong>Tarjeta:</strong> {item.cardType} {item.cardNumber}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Fin historial */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Profile;