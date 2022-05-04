import { Request, Response } from "express";
import { FolhaModelRepository } from "../repositories/folha.repository";

const folhaRepository = new FolhaModelRepository();

export class FolhaController {
  
  
    listar(request: Request, response: Response) {
      const folhas = folhaRepository.listar();
      response.status(200).json({ message: "Todas as folhas de pagamento", data: folhas });
    }

    cadastrar(request: Request, response: Response) {
      const folhas: any[] = request.body.data;
      
      folhas.forEach(folha => {
        folhaRepository.cadastrar(folha);
      })

      response.status(201).json({ message: "Folha cadastrada na base de dados", data: folhas });
    }

    listarFiltrado(request: Request, response: Response) {
      const cpf = request.params.cpf;
      const mes = request.params.mes;
      const ano = request.params.ano;

      const folhas = folhaRepository.listarFiltrado(cpf, mes, ano);
      response.status(200).json({ message: "Folha de pagamento filtrada", data: folhas });
    }
  
    
  }