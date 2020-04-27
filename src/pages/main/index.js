import React, { Component } from 'react';
import api from '../../services/api'

import './styles.css'

export default class Main extends Component {
    state = {
        products: [], // array vazio
        productInfo: {}, // objeto vazio
        page: 1, // armazena a pagina inicial
    }

    componentDidMount(){ // método executado assim qeu o componente é exibido em tela.
        this.loadProducts();
    }

    loadProducts = async (page = 1) =>{
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;
        console.log(response.data.docs)

        this.setState({ products: docs, productInfo, page}) // substitui o array do state pela contagem produtos
    };

    prevPage = () => {
        const { page, productInfo } = this.state;

        if(page == 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const { page, productInfo } = this.state; // busca pagina que estou e a informacao

        if(page == productInfo.pages) return; // pages retorna numero total de páginas

        const pageNumber = page + 1; // senao adiciona +1 a pagina, prox pagina

        this.loadProducts(pageNumber)
    }

    render(){
        const { products, page, productInfo } = this.state; //busca a variavel products
    return (
        <div className="product-list">
            {products.map(product => (
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>

                    <a href="">Acessar</a>
                </article>
            ))}
            <div className="actions">
                <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
            </div>
        </div>
    )
    }
}
