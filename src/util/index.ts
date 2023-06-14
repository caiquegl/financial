import { IProduct } from "../hook/productsHook";
import moment from "moment";
export interface IOptionsSelect {
  label: string;
  value: any;
}

export const calcTotal = (list: IProduct[]) => {
  try {
    let total = 0;
    list.forEach((el) => {
      const qtdValue = el.qtd * el.value;
      total = total + qtdValue;
    });
    return `R$ ${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  } catch (error) {
    return "R$ 0,00";
  }
};

export const defaultOptionsYesOrNo: IOptionsSelect[] = [
  {
    label: "Sim",
    value: "sim",
  },
  {
    label: "Não",
    value: "nao",
  },
];

export const saySaudation = () => {
  const agora = moment();
  const hora = agora.hour();

  let saudacao;

  if (hora >= 5 && hora < 12) {
    saudacao = "Bom dia";
  } else if (hora >= 12 && hora < 18) {
    saudacao = "Boa tarde";
  } else {
    saudacao = "Boa noite";
  }

  return saudacao;
};
