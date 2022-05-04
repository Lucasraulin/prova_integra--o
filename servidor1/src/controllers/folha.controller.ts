import axios from "axios";
import { Request, Response } from "express";
import { FolhaModelRepository } from "../repositories/folha.repository";

const folhaRepository = new FolhaModelRepository();

export class FolhaController {
    cadastrar(request: Request, response: Response) {
      const folha = request.body;
      folha.validador = false;
      const folhas = folhaRepository.cadastrar(folha);
  
      response.status(201).json({ message: "Folha cadastrada na base de dados", data: folhas });
    }
  
    calcular(request: Request, response: Response) {
      const folhasSemProcessar = folhaRepository.listar();
      let resposta: any = "";

      const calcularInss = (valor: number) => {
        if (valor <= 1693.72) {
          return valor * 0.08;
        } else if (valor <= 2822.90) {
            return valor * 0.09;
        } else if (valor <= 5646.80) {
            return valor * 0.11;
        } else {
            return 621.03;
        }
      }

      const calcularIr = (valor: number) => {
          if (valor <= 1903.98) {
            return 0;
        } else if (valor <= 2826.65) {
            return valor * 0.075;
        } else if (valor <= 3751.05) {
            return valor * 0.15;
        } else if (valor <= 4664.68) {
            return valor * 0.225;
        } else {
            return valor * 0.275;
        }
      }
  
      const folhasProcessadas = folhasSemProcessar.map(folha => {
        const dados: any = { ...folha };
        if (folha.validador === false) {
          dados.bruto = (dados.horas * dados.valor);
          dados.inss = calcularInss(dados.bruto);
          dados.ir = calcularIr(dados.bruto);
          dados.fgts = (dados.bruto * 0.08);
          dados.liquido = (dados.bruto - dados.inss - dados.ir);
          dados.validador = true;

          folhaRepository.alterar({...folha, validador: true, bruto: dados.bruto});
          return dados;
        }
      });
  
      axios
        .post("http://localhost:4000/folha/cadastrar", { data: folhasProcessadas })
        .then((response) => {
          resposta = response;
        }).catch((error) => {
          console.log(error);
        });
  
      response.status(201).json({ message: "Cadastrada", data: resposta });
    }
  
    listar(request: Request, response: Response) {
      const folhas = folhaRepository.listar();
      response.status(200).json({ message: "Todas as folhas de pagamento", data: folhas });
    }
  
    alterar(request: Request, response: Response) {
      const folhas = folhaRepository.alterar(request.body);
      response.status(200).json({ message: "Atualizada", data: folhas });
    }
  
    deletar(request: Request, response: Response) {
      const id = Number.parseInt(request.params.id, 10);
      const folhas = folhaRepository.remover(id);
      response.status(200).json({ message: "Removida", data: folhas });
    }
  }