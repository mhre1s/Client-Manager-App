import React, { useState } from "react";
import userImage from '../assets/user.png'
import techImage from '../assets/techs.png'
import { useNavigate } from "react-router";

const LoginScreen = () => {
    
    let navigate = useNavigate()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleChangeUser = (e) =>{
        setUser(e.target.value)
        console.log(e.target.value)
    }

    const handleChangePassword = (e) =>{
        setPassword(e.target.value)
        console.log(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(user === 'juanbatista' && password === '30092810!'){
            navigate('/teste')
        } else{
            setError('Usuário ou senha inválidos')
        }    
    }
  return (
    <div>
      <main className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center mx-auto my-auto">
        <section className="w-full flex flex-col justify-center items-center flex-1 p-5">
          <div className="w-full max-w-xl flex justify-center items-center gap-4 flex-col">
            <img
              className="w-36 hover:scale-110"
              src={userImage}
              alt="Logo do usuário"
            />
            <h1 className="font-bold text-xl mb-7">Login</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-xl flex justify-center items-center gap-4 flex-col">
                <input
                    onChange={handleChangeUser}
                    className="w-full p-2 rounded-lg outline-none focus:bg-white bg-gray-100 shadow-md shadow-slate-800"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Digite seu usuário..."
                />
                <input
                    onChange={handleChangePassword}
                    className="w-full p-2 rounded-lg outline-none focus:bg-white bg-gray-100 shadow-md shadow-slate-800"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="**************"
                />
                {error && <p className="text-red-600">{error}</p>}
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="remeberPass" id="rememberPass" />
                        <label className="font-medium" htmlFor="rememberPass">
                        Lembrar senha
                        </label>
                    </div>
                    <a
                        className="text-sky-600 hover:text-sky-400 duration-200"
                        href="#"
                    >
                        Esqueceu a senha
                    </a>
                </div>
                <button className="w-full bg-blue-600 p-2 rounded-lg text-white text-lg font-medium hover:bg-blue-500">
                Acessar
                </button>
            </form>
          </div>
        </section>
        <section className="hidden md:flex w-full flex-1 bg-blue-600 h-screen justify-center gap-8 items-center flex-col p-4">
          <h1 className="max-w-lg text-white text-2xl text-center lg:text-3xl">
            Domine as <strong>tecnologias mais buscadas</strong> pelo mercado
          </h1>
          <img
            className="w-3/4 lg:w-full lg:max-w-md"
            src={techImage}
            alt="Tecnologias mais usadas do mercado"
          />
        </section>
      </main>
    </div>
  );
};

export default LoginScreen;

