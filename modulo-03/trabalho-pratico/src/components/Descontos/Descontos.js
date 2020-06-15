import React, { Component } from 'react'
import css from './Descontos.modules.css';
import ItemDesconto from './ItemDesconto';

export default class Descontos2 extends Component {
    render() {
        const  {salario} = this.props;

        return (
            <div className={'container'+css.flex,css.flexWrap}>
                <ItemDesconto 
                    textoLabel='Base Inss' 
                    valorDesconto={salario.salarioBaseINSS} 
                    cor=''/>
                <ItemDesconto 
                    textoLabel='Desconto Inss' 
                    valorDesconto={salario.descontoINSS} 
                    cor='#e67e22'/>
                <ItemDesconto 
                    textoLabel='Base IRPF' 
                    valorDesconto={salario.salarioBaseIRPF} 
                    cor=''/>
                <ItemDesconto 
                    textoLabel='Desconto IRPF' 
                    valorDesconto={salario.descontoIRPF} 
                    cor='#c0392b'/>
            </div>
        )
    }
}