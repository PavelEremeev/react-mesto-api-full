import React, { useState } from "react";


const Login = ({ onLogin }) => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = data;
        onLogin(email, password)
    }

    return (
        <section className="login" >
            <form className="login__form" onSubmit={handleSubmit}>
                <h2 className="login__text">Вход</h2>
                <input
                    className="login__input"
                    placeholder="Email"
                    required
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                ></input>
                <input
                    className="login__input"
                    placeholder="Пароль"
                    required
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                ></input>
                <button type="submit" className="login__submit-button">Войти</button>
            </form>
        </section>
    )
}

export default Login 