import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { MyTextInput } from '../components'

import '../styles/styles.css'

export const RegisterFormikPage = () => {
  return (
    <div>
      <h1>Register Formik Page</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password1: '',
          password2: '',
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, 'El nombre debe ser de 2 caracteres o más')
            .max(15, 'El nombre debe ser de 15 caracteres o menos')
            .required('Requerido'),
          email: Yup.string()
            .email('El correo no tiene un formato valido')
            .required('Requerido'),
          password1: Yup.string()
            .min(6, 'La contraseña debe tener 6 caracteres o más')
            .required('Requerido'),
          password2: Yup.string()
            .oneOf([Yup.ref('password1')], 'Las contraseñas deben ser iguales')
            .required('Requerido'),
        })}
      >
        {({ handleReset }) => (
          <Form>
            <MyTextInput label="Nombre" name="name" placeholder="Alejandro" />
            <MyTextInput
              label="Email"
              type="email"
              name="email"
              placeholder="john@google.com"
            />
            <MyTextInput
              label="Password"
              name="password1"
              type="password"
              placeholder="******"
            />
            <MyTextInput
              label="Confirm password"
              name="password2"
              type="password"
              placeholder="******"
            />
            <button type="submit">Create</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
