import React, { useState, useEffect } from "react";
import userImage from '../assets/user.png';
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import settTech from '../assets/Juan.png'

const LoginScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);

  // Recuperar email e senha salvos, se "lembrar senha" estiver ativo
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedUser');
    const savedPassword = localStorage.getItem('rememberedPassword');

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleRememberChange = (e) => setRemember(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (remember) {
        localStorage.setItem('rememberedUser', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('rememberedPassword');
      }

      navigate("/client-list");
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Email ou senha inválidos");
    }
  };

  return (
    <div>
      <main className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center mx-auto my-auto">
        <section className="w-full flex flex-col justify-start items-center min-h-screen flex-1 mt-24 gap-10">
          <img src={settTech} alt="sett tech logo" className="w-72 h-auto"  />
          <div className="w-full max-w-xl flex justify-center items-center gap-4 flex-col">
            <img
              className="w-36 hover:scale-110"
              src={userImage}
              alt="Logo do usuário"
            />
            <h1 className="font-bold text-xl mb-7">Login</h1>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl flex justify-center items-center gap-4 flex-col"
            >
              <input
                onChange={handleChangeEmail}
                value={email}
                className="w-full p-2 rounded-lg outline-hidden focus:bg-white bg-gray-100 shadow-md shadow-slate-800"
                type="email"
                name="email"
                id="email"
                placeholder="Digite seu email..."
              />
              <input
                onChange={handleChangePassword}
                value={password}
                className="w-full p-2 rounded-lg outline-hidden focus:bg-white bg-gray-100 shadow-md shadow-slate-800"
                type="password"
                name="password"
                id="password"
                placeholder="**************"
              />
              {error && <p className="text-red-600">{error}</p>}
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="rememberPass"
                    id="rememberPass"
                    checked={remember}
                    onChange={handleRememberChange}
                  />
                  <label className="font-medium" htmlFor="rememberPass">
                    Lembrar senha
                  </label>
                </div>
                {/* Pode remover esse link se não for implementar recuperação */}
                <a
                  className="text-sky-600 hover:text-sky-400 duration-200"
                  href="#"
                >
                  Esqueceu a senha
                </a>
              </div>
              <button className="w-full cursor-pointer bg-blue-600 p-2 rounded-lg text-white 
              text-lg font-medium hover:bg-blue-500">
                Acessar
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginScreen;