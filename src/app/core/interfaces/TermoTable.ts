interface TermoTable {
  letter: string;
  status: 'correct' | 'locked' | 'wrong' | 'unlock' | 'close';
}

export default TermoTable;
