import React, { Component } from 'react'
import {formatNumber} from '../../helpers/format-helpers'
import css from './Descontos.modules.css';

export default class ItemDesconto extends Component {
    render() {

        const  {textoLabel} = this.props;
        const  {valorDesconto} = this.props;
        const  {cor} = this.props;

        return (
            <div className={'input-field'+css.item}>
                <label 
                    className='active'
                >
                        {textoLabel}
                </label>
                <input 
                    type='text' 
                    disabled
                    value={formatNumber(valorDesconto)}
                    style={{color:cor}}
                >
                </input>
            </div>
        )
    }
}
