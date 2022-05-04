import { FolhaModel } from "../models/folha.models";

const FolhaModels: FolhaModel[] = [];
let id = 0;

export class FolhaModelRepository {
    cadastrar(FolhaModel: FolhaModel): FolhaModel[] {
        id++;
        FolhaModel.id = id;
        FolhaModels.push(FolhaModel);
        return FolhaModels;
    }

    listar(): FolhaModel[] {
        return FolhaModels;
    }

    alterar(FolhaModelAlterada: FolhaModel): FolhaModel[] {
        const index = FolhaModels.findIndex((FolhaModel) => FolhaModel.id === FolhaModelAlterada.id);
        FolhaModels[index] = FolhaModelAlterada;
        return FolhaModels;
    }

    remover(id: number): FolhaModel[] {
        const index = FolhaModels.findIndex((FolhaModel) => FolhaModel.id === id);
        FolhaModels.splice(index, 1);
        return FolhaModels;
    }
}
