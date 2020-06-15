import React, { Component } from 'react'

export default class SalarioBruto extends Component {
    render() {
        return (
            <div className='input-field'>
                <label 
                    for='SalarioBruto'
                    className='active'
                >
                        Salário Bruto
                </label>
                <input 
                    type='number' 
                    id='SalarioBruto'
                 />

            </div>
        )
    }
}
