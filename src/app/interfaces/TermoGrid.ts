interface TermoGrid {
  letter: string;
  status: 'correct' | 'locked' | 'wrong' | 'unlock' | 'close';
}

export default TermoGrid;
