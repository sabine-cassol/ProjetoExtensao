export interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  data: string;
  autor: string;
}

export const NEWS: Noticia[] = [
  {
    id: '1',
    titulo: 'Novos prazos para a entrega do TCC',
    resumo: 'A coordenação alterou o calendário oficial devido ao feriado institucional.',
    conteudo: 'Atenção alunos e professores. As datas finais de entrega do Trabalho de Conclusão de Curso foram postergadas em uma semana. Verifique o portal do aluno para o novo cronograma completoizado.',
    data: '12 Jun 2026',
    autor: 'Coordenação Acadêmica'
  },
  {
    id: '2',
    titulo: 'Vagas abertas para Monitoria de TypeScript',
    resumo: 'Professores do departamento de TI buscam estudantes interessados em ajudar turmas iniciais.',
    conteudo: 'Estão abertas as inscrições para o programa de monitoria. Requisitos: Ter concluído o módulo de Lógica com nota superior a 8.5. O monitor terá direito a desconto na mensalidade.',
    data: '10 Jun 2026',
    autor: 'Prof. Claudio'
  }
];