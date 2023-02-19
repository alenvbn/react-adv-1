import { FormEvent } from 'react'
import { useForm } from '../hooks/useForms'
import '../styles/styles.css'

export const RegisterPage = () => {
  const {
    formData,
    name,
    email,
    password1,
    password2,
    onChange,
    resetForm,
    isValidEmail,
  } = useForm({
    name: 'Ale',
    email: 'ale@gmail.com',
    password1: '',
    password2: '',
  })

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(formData)
  }

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={onSubmit} noValidate>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={onChange}
          name="name"
          className={`${name.trim().length <= 0 && 'has-error'}`}
        />
        {name.trim().length <= 0 && <span>Este campo es necesario</span>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          name="email"
          className={`${!isValidEmail(email) && 'has-error'}`}
        />
        {!isValidEmail(email) && <span>Email no es valido</span>}
        <input
          type="password"
          placeholder="Password"
          value={password1}
          onChange={onChange}
          name="password1"
        />
        {password1.trim().length <= 0 && <span>Este campo es necesario</span>}
        {password1.trim().length < 6 && password1.trim().length > 0 && (
          <span>La contraseña tiene que tener 6 caracteres</span>
        )}
        <input
          type="password"
          placeholder="Repeat Password"
          value={password2}
          onChange={onChange}
          name="password2"
        />
        {password2.trim().length <= 0 && <span>Este campo es necesario</span>}
        {password2.trim().length > 0 && password2 !== password1 && (
          <span>Las contraseñas deben ser iguales</span>
        )}
        <button type="submit">Create</button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </form>
    </div>
  )
}
