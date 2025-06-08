import React, { useState } from 'react';
import '../styles/LoginForm.css';
import bakanlikLogo from '../assets/bakanlik_logo.png';
import { login } from '../api/auth';
import { saveToken, saveSicilNo } from '../utils/storage';
import { useNavigate } from 'react-router-dom';



function LoginForm() {
      const navigate = useNavigate(); // yönlendirme hook'u

    const [sicilNo, setSicilno] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const data = await login(sicilNo, password);
      saveToken(data.tokenType, data.accessToken);
      saveSicilNo(data.id);
      alert(`Hoşgeldin, ${data.sicilNo}!`);
      navigate('/tayin-talebi'); // yönlendirme
    } catch (err) {
      setError('Giriş başarısız. Kullanıcı adı veya şifre yanlış.');
    }
  }


    return (
        <main className="form-signin w-100 m-auto" style={{ maxWidth: '330px' }}>
            <form onSubmit={handleSubmit} className="text-center">
                <img
                    className="mb-4"
                    src={bakanlikLogo}  
                    alt="Bakanlık Logo"
                    width="100"
                    height="100"
                />
                <h1 className="h3 mb-3 fw-normal">Lütfen giriş yapın</h1>

                {error && <p className="alert alert-warning">{error}</p>}

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder='Sicil No'
                        value={sicilNo}
                        onChange={(e) => setSicilno(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingInput">Sicil no</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingPassword">Parola</label>
                </div>

                <div className="form-check text-start mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={rememberMe}
                        id="checkDefault"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />

                    <label className="form-check-label" htmlFor="checkDefault">
                        Beni hatırla
                    </label>
                </div>


                <button className="btn btn-primary w-100 py-2" type="submit">
                    Giriş yap
                </button>
                

                <p className="mt-5 mb-3 text-body-secondary">Adalet Bakanlığı</p>
            </form>
        </main>
    );
}

export default LoginForm;