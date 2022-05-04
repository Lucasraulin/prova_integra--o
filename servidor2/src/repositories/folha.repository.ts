import { FolhaModel } from "../models/folha.models";

const FolhaModels: FolhaModel[] = [];
let id = 0;

export class FolhaModelRepository {

    cadastrar(FolhaModel: FolhaModel): FolhaModel[] {
        FolhaModels.push(FolhaModel);
        return FolhaModels;
    }

    listar(): FolhaModel[] {
        return FolhaModels;
    }

    listarFiltrado(cpf: string, mes: string, ano: string): FolhaModel[] {
        return FolhaModels.filter(FolhaModel => FolhaModel.funcionario.cpf === cpf && FolhaModel.mes === +mes && FolhaModel.ano === +ano);
    }
}
