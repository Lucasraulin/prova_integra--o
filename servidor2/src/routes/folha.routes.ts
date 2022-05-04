import { Router } from "express";
import { FolhaController } from "../controllers/folha.controller";

const routes = Router();

routes.get("/", (request, response) => {
  response.json({ message: "Folha de pagamentos" });
});

routes.post("/folha/cadastrar", new FolhaController().cadastrar);
routes.get("/folha/listar", new FolhaController().listar);
routes.get("/folha/consultar/:cpf/:mes/:ano", new FolhaController().listarFiltrado);


export { routes };
