import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Payment extends Component{
    state = {
        payment: {},
    };

    async componentDidMount() {

        const { id } = this.props.match.params;

        const response = await api.get(`/payments/${id}`);

        this.setState({ payment: response.data });

    }
    render ()  {

        const { payment } = this.state;

        return (
            <div className="payment-infor">
                <h1>{payment.description}</h1>  /* aqui ele usou product.title*/
                <p>{payment.value}</p>  /* aqui ele usou product.description*/

                <p>
                    URL: <a href={payment.type}>{payment.type}</a> /* aqui ele usou product.url*/
                </p>

            </div>
        )
    }
}