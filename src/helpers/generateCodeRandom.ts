function generateCodeRandom(tamanho: number): string {
  let stringAleatoria = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  for (let i = 0; i < tamanho; i++) {
    stringAleatoria += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length),
    );
  }
  return stringAleatoria;
}

export default generateCodeRandom;
