export interface Noticia {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string;
  imageUrl: string;
  professorId: number;
  createdAt: string;
  autor: {
    nome: string;
  };
}