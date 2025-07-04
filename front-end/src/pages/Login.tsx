import { Fragment, useState } from "react";
import "../Style/Login.css";
import Alert from "../component/Alert";
function Login() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    try {
      //3001 is the port for the user service
      const response = await fetch("http://localhost:9001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        console.log("Login successful");
        // window.location.href = "/";
        response.json().then((data) => {
          window.location.href = "/";
          console.log(data);
          localStorage.setItem("token", data);
          localStorage.setItem("user", JSON.stringify(data.user));
        });
      } else {
        alert("password o correo incorrecto");
        window.location.href = "/login";
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }


  }
  return (
    <Fragment>
      <div className="bg-img">
        <div className="content">
          <header>Bienvenido</header>
          <form onSubmit={handleSubmit}>
            <h4 className="fieldHeader">Correo Electronico</h4>
            <div className="field">
              <span className="person"> </span>
              <input
                type="text"
                required
                placeholder="Correo Electronico"
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <h4 className="fieldHeader space">Password</h4>
            <div className="field space">
              <span className="password"></span>
              <input
                type="password"
                className="pass-key"
                required
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              ></input>
              <span className="show">SHOW</span>
            </div>
            <div className="field space">
              <input type="submit" value="Iniciar Sesion" />
            </div>
          </form>
          <div className="signup space">
            No tienes una cuenta?
            <a href="/register">Click aqui</a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
