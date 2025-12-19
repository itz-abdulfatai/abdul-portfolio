

export function shuffle(array){ return array.sort(() => Math.random() - 0.5); }


export const getCertUrl = (certName) => {
  return `?cert=${certName.toLowerCase().replace(/\s+/g, "-")}`;
};