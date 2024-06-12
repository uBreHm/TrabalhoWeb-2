import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../pages/api/hello'; 

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user: '',
    pwd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Chamando a API em: localhost:8080/api/auth/login');
  
      const response = await login(formData.user, formData.pwd);
      console.log('Login efetuado com sucesso:', response);
  
      if (response && response.user && response.user.level === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      router.push('/login');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <input type="text" name="user" value={formData.user} onChange={handleChange} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" name="pwd" value={formData.pwd} onChange={handleChange} />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
