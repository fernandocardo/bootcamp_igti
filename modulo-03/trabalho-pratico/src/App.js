import React, { Component } from 'react';

import SalarioLiquido from './components/SalarioLiquido/SalarioLiquido';

import { calculateSalaryFrom } from './helpers/salary'


import css from './app.module.css';
import Descontos from './components/Descontos/Descontos';

export default class App extends Component {

  constructor(){
    super();

    this.state ={
      salarioBruto : 0,
      salarioLiquido: 0,
      salarioBaseINSS: 0,
      descontoINSS: 0,
      salarioBaseIRPF: 0,
      descontoIRPF: 0
      
    }
  }

  handleCalculoSalario = (event) =>{
    
    const salarioBrutoDigitado = event.target.value;

    let calculos = calculateSalaryFrom(salarioBrutoDigitado)

    this.setState({
      salarioBruto: salarioBrutoDigitado,
      salarioLiquido: calculos.netSalary,
      salarioBaseINSS: calculos.baseINSS,
      descontoINSS: calculos.discountINSS,
      salarioBaseIRPF: calculos.baseIRPF,
      descontoIRPF: calculos.discountIRPF

    })
  }


  render() {

const {salarioBruto} = this.state;
const salario = this.state;

    return (
        <div >
          <div className='input-field'>
              <label 
                  className='active'
              >
                      Salário Bruto
              </label>
              <input 
                  type='number' 
                  id='SalarioBruto'
                  value={salarioBruto}
                  onChange={this.handleCalculoSalario}
                />
          </div>
        <div className={css.flexRow}>
          <Descontos salario={salario}/>
        </div>
        <SalarioLiquido salario={salario}/>
      </div>
    )

  };
}
