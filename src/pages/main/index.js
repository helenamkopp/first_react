import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css'

export default class Main extends Component {
    state = {
        payments: [],
        paymentInfo: {},
        page: 1, 
    };


    componentDidMount() {
        this.loadPayments();
    }

    loadPayments = async (page = 1) => {
        const response = await api.get(`/payments?page=${page}`);

        const { docs, ...paymentInfo } = response.data;

        this.setState({ payments: docs, paymentInfo, page })

    };

    prevPage = () => {
        const { page, paymentInfo } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadPayments(pageNumber);
    };

    nextPage = () => {
        const { page, paymentInfo } = this.state;

        if (page === paymentInfo.pages) return;

        const pageNumber = page + 1;

        this.loadPayments(pageNumber);

    };


    render() {
        const { payments, page, paymentInfo} = this.state;

        return (
            <div className="payment-list">
                {payments.map(payment => (
                    <article key={payment._id}>
                        <strong>{payment.description}</strong>
                        <p>{payment.value}</p>

                        <Link to={`/payments/${payment._id}`}>Acessar</Link>

                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === paymentInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        );
    }
}