import { initialUser } from '../data/user'; 

 

let account = { 

  email: 'mariana@sprache.app', 

  password: 'sprache123', 

  user: initialUser, 

}; 

 

export async function register({ name, email, password, level = 'A2', dailyGoal = 10 }) { 

  if (!name || !email || !password) { 

    throw new Error('Completa todos los campos para crear tu cuenta.'); 

  } 

 

  account = { 

    email: email.trim().toLowerCase(), 

    password, 

    user: { 

      ...initialUser, 

      name: name.trim(), 

      level: `Nivel ${level}`, 

      dailyGoal, 

      todayMinutes: 0, 

      studiedMinutes: 0, 

      learnedWords: 0, 

      streak: 0, 

    }, 

  }; 

 

  return account.user; 

} 

 

export async function login({ email, password }) { 

  if (email.trim().toLowerCase() !== account.email || password !== account.password) { 

    throw new Error('El correo o la contraseña no son correctos.'); 

  } 

 

  return account.user; 

} 

 

export async function logout() { 

  return null; 

} 