import "../Style/Register.css";
import { useState } from "react";
function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      //3001 is the port for the user service
      const response = await fetch("http://localhost:9001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, firstName, lastName, age, phone, gender })
      });
  
      if (response.ok) {
        console.log("Registro exitoso");
        window.location.href = "/";
      } else {
        console.log("Registro fallido");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    if (password === confpassword) {
      const data = {
        email,
        password,
        firstName,
        lastName,
        age,
        phone,
        gender
      };
      const dataString = JSON.stringify(data);
      window.location.href = "/login";
    } else {
      alert("passwords no coinciden");
    }
  }
  return (
    <div className="bg-img">
      <div className="registerContent">
        <header>Crear Cuenta</header>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <h6>Nombre</h6>
            </div>
            <div className="col">
              <h6>Apellidos</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Nombre"
                  name="firstName"
                  onChange={(event) => setFirstName(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Apellidos"
                  name="lastName"
                  onChange={(event) => setLastName(event.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6>Correo</h6>
            </div>
            <div className="col">
              <h6>Telefono</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field">
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="Correo"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Telefono"
                  name="phone"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6>Password</h6>
            </div>
            <div className="col">
              <h6>Confirmar password</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field">
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="Password"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="field">
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="Confirmar password"
                  onChange={(event) => setconfPassword(event.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6>Edad</h6>
            </div>
            <div className="col">
              <h6>Genero</h6>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Edad"
                  name="age"
                  onChange={(event) => setAge(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="field">
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="Genero"
                      name="gender"
                      onChange={(event) => setGender(event.target.value)}
                    ></input>
              </div>
            </div>
          </div>
          <div className="field space">
            <input type="submit" value="Registrarse" />
          </div>
        </form>
        <div className="signup space">
          Ya tienes una cuenta?
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;