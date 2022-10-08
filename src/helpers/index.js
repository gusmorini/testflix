/**
 * recebe um array e retorna 1 item dele aleatoriamente
 */
export const randomArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * limita o texto ao tamanho definido em caracteres
 */
export const limitText = (text, limit = 200) => {
  if (text.length > limit) {
    text = text.substring(0, limit) + " ...";
  }

  return text;
};
