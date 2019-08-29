export default {
  email: [{ validate: 'required', message: 'Email requerido' }, { validate: 'email', message: 'Email inválido' }],
  password: [
    { validate: 'required', message: 'Contraseña requerida' },
    {
      validate: (_, form) => !form.password.split('').some(e => e === ' '),
      message: 'No se permiten espacios',
      custom: true,
    },
    {
      validate: (_, form) => form.password.length >= 8,
      message: 'Requiere mínimo 8 caracteres',
      custom: true,
    },
  ],
};
