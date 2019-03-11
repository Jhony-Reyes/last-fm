export default {
  email: [{ validate: 'required', message: 'Email requerido' }, { validate: 'email', message: 'Email inválido' }],
  password: [
    { validate: 'required', message: 'Contraseña requerida' },
    {
      validate: (_, form) => {
        if (form.password.length < 8) {
          return false;
        }
        return true;
      },
      message: 'Requiere mínimo 8 caracteres',
      custom: true,
    },
  ],
};
