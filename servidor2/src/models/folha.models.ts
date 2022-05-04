export interface FolhaModel {
    id: number,
    mes: number;
    ano: number;
    horas: number;
    valor: number;
    funcionario: {
        nome: string,
        cpf: string;
    }
    validador: boolean;
    bruto: number;
  }
