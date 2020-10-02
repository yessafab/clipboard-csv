module.exports =  class ResultsCalculator {
  constructor(data) {
    this.data = data;
  }

  calculateResults() {
    const { A, B, C, D, E, F, G, H, I, J, K } = this.data.inputValues;

    return this.data.algebraicExpressions.map(row => (
      row.map(expression => eval(expression))
    ));
  }
}
