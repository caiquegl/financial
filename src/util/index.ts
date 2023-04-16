import { IProduct } from "../hook/productsHook"

export interface IOptionsSelect {
    label: string
    value: any
}

export const calcTotal = (list: IProduct[]) => {
    try {
        let total = 0
        list.forEach(el => {
            const qtdValue = el.qtd * el.value
            total = total + qtdValue
        })
        return `R$ ${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    } catch (error) {
        return 'R$ 0,00'
    }
}

export const defaultOptionsYesOrNo: IOptionsSelect[] = [
    {
        label: 'Sim',
        value: true
    },
    {
        label: 'Não',
        value: false
    }
]