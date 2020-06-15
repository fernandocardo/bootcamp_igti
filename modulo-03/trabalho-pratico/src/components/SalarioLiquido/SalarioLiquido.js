import React, { Component } from 'react'
import {formatNumber} from '../../helpers/format-helpers'

export default class SalarioLiquido extends Component {


    render() {

        const  salario  = this.props;

        let percentilSalario = ((salario.salario.salarioLiquido * 100)/salario.salario.salarioBruto).toFixed(2)+'%';
        let percentilINSS = ((salario.salario.descontoINSS * 100)/salario.salario.salarioBruto)+'%';
        let percentilIRPF = ((salario.salario.descontoIRPF * 100)/salario.salario.salarioBruto)+'%';

        let percentil = '';

        if (salario.salario.salarioBruto !== 0 && salario.salario.salarioBruto !== ''){
            percentil =  ' (' + percentilSalario+')'
        }

        let salarioLiquidoFormatado = formatNumber(salario.salario.salarioLiquido) + percentil 


        return (
            <div className='input-field'>
                <label 
                    className='active'
                >
                        Salário Liquido
                </label>
                <input 
                    type='text' 
                    id='SalarioLiquido'
                    disabled
                    value={salarioLiquidoFormatado}
                    style={{fontWeight: 'bold'}}
                />
                <div className="collapsible-header">
                    <div className="progress multi blue lighten-4">
                        <div className="determinate amber" style={{width: percentilINSS, animation: 'grow 4s'}}>{percentilINSS}</div>
                        <div className="determinate blue" style={{width: percentilIRPF, animation: 'grow 4s'}}>{percentilIRPF}</div>
                        <div className="determinate green" style={{width: percentilSalario, animation: 'grow 4s'}}>{percentilSalario}</div>
                    </div>

                </div>
            </div>
        )
    }
}
