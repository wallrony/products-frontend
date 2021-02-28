const baseErrors: Record<string, string> = {
  'Network Error': 'Erro ao conectar ao servidor. Por favor, entre em contato com o suporte.',
  'unknown-error': 'Ocorreu um erro desconhecido. Por favor, entre em contato com o suporte.',
  'ECONNREFUSED': 'Ocorreu um erro interno. Por favor, entre em contato com o suporte.',
};

export function treatError(e: Error) {
  let error;

  const baseErrorsKeys = Object.keys(baseErrors);

  for (let i = 0; i < baseErrorsKeys.length; i++) {
    const key: string = baseErrorsKeys[i];

    if (e.toString().includes(key)) {
      error = baseErrors[key];
    }
  }

  if (!error) {
    error = baseErrors['unknown-error'];
  }

  return error;
}
