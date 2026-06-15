export interface Projeto {
  id: string;
  titulo: string;
  justificativa: string;
  pretensao: string;
  requisitos: string;
  detalhes: string;
}

export const PROJECTS: Projeto[] = [
  {
    id: '1',
    titulo: 'InovaEdu',
    justificativa: 'o avanço da inteligencia artificial.',
    pretensao: 'Orientar estudantes do ensino fun 1 e 2.',
    requisitos: 'O projeto busca capacitar estudantes do ensino fundamental',
    detalhes: 'Os alunos de engenharia de software e ads serão divididos'
  },
  {
    id: '2',
    titulo: 'Computação para a vida',
    justificativa: 'a inclusão digital é um fator essencial na sociedade',
    pretensao: 'A inclusão digital é um fator essencial para o desenvolvimento profissional no mundo atual',
    requisitos: 'O projeto computação para a vida trabalhará com uma equipe de alunos academicos do curso de analise e desenvolvimento de sistemas e engenharia de software ',
    detalhes: 'Datas: 16 de março a 18 de maio'
  }
];