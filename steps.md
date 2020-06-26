# React JS

## Descrição 
Passo a passo (detalhado) de como iniciar um projeto do zero utilizando ReactJS.

Importante: deixar a parte de backend organizada anteriormente para que funcione certinho, deixar o banco de dados funcionando, a porta ok, para que eu consiga conectar o backend ao frontend. 

- Verificar se já tenho o node js, npm e yarn instalados (-v)
- Iniciar um projeto, para isso (huntweb foi o nome escolhido)
```
create-react-app huntweb
```
- Acessar a pasta do projeto criado:
```
cd huntweb
```
- Abrir um vscode:
```
code .
```
- Esse vscode recém aberto, vai ter alguns arquivos, como gitignore, json, yarn.lock.. enfim
- Iniciar o npm start
```
npm start
```
- O terminal vai exibir uma mensagem de servidor sendo iniciado, o chrome vai abrir com o logo do react girando.

- No vscode, vamos deletar alguns arquivos:
- Abrir a pasta src:
- deletar:
    - app.css
    - app.test.js
    - index.css
    - logo.svg

- dentro do arquivo index.js excluir a linhaa de comando:
```
'./index.css/';
```

- dentro do arquivo app.js, excluir as linhas de comando:
```
import logo from './logo.svg';
import './App.css';
```

- E dentro desse mesmo arquivo, organizar a class App para que ela fique assim: 

```
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello pessoal</h1>
      </div>
    );
  }
}

export default App;
```

Agora, eu vou em index.js e observo o meu código que está assim:
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
```

Esse ReactDOM.render vou usar uma única vez em toda aplicação, que é aqui dentro do index.js que é basicamente renderizar o nosso primeiro componente, que nesse caso é o App (importando o app from app) e colocando esse app num html com id div chamado root.

Inclusive, se eu for no public -> index.html -> vai existir uma div com o id root.

Porque o App é um componente?
O app é uma classe, com o nome app que estende o componente do react, 

## Criando uma header
- Dentro da pasta scr, criar uma pasta chamada components e dentro dela criar uma pasta chamada Header e dentro um arquivo chamado index.js

- Dentro do arquivo index.js:

```
import React from 'react';

const Header = () => (

);
```

- Organizar:
```
import React from 'react';

const Header = () => <header id="main-header">JSHunt</header>;

export default Header;
```

- Ir no app.js e organizar/ importar algumas coisas:

```
import React, { Component } from 'react';

import Header from './components/Header';

const App = () => (
  <div className="App">
    <Header/>
  </div>
);

export default App;
```
- No meu chrome, é para aparecer JSHunt
- Dentro da pasta header, criar um arquivo chamado styles.css
- Dentro de styles.css:
```
header#main-header{
    width: 100%;
    height: 60px;
    background: #da552f;
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

- Para importar o meu arquivo css, vou no meu index.js (o de dentro da pasta header) e coloco o seguinte comando:

- Na pasta src, criar um arquivo chamado styles.css
- Vou no arquivo App.js e importo o styles:

```
import './styles.css';
```
- Dentro do styles recem criado, vamos remover algumas estilizações padrão que vem no programa.
```
* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
} 

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #fafafa;
    color: #333;
}
```

Depois disso, eu preciso acessar uma API, essa api eu criei com node.js
Para isso: 
- terminal comando: sudo yarn install axios
- dentro da pasta src criar uma pasta services
- e dentro dela criar um arquivo chamado api.js

dentro dela:
```
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001/api'});

export default api;
```
importante: essa url é aquela que eu utilizo lá no insomnia, então, preciso cuidar bastante no periodo da sua criação.

Depois, no App.js:
```
import api from './services/api';
```

Dentro de src, criar uma pasta chamada pages;
Dentro de pages, criar uma pasta chamada main;
Dentro de main criar um arquivo chamado index.js

Dentro de index.js recem criado:
```
import React, { Component } from 'react';

export default class Main extends Component {
    render() {
       return <h1>Olá pessoal!</h1>

    }
}
```
Depois vou novamente em App.js e tiro o import da api: essa linha
```
import api from './services/api';
```

E coloco dentro do index.js recem criado, ficando assim:
```
import React, { Component } from 'react';
import api from '../../services/api';

export default class Main extends Component {
    render() {
       return <h1>Olá pessoal!</h1>

    }
}
```

Em app.js, vou importar o main, ficando assim:

```
import React, { Component } from 'react';

import './styles.css';

import Header from './components/Header';
import Main from './pages/main';

const App = () => (
  <div className="App">
    <Header/>
    <Main/>
  </div>
);

export default App;
```

Depois de fazer isso, salvar e dar uma olhada no chrome, para ter certeza que ta funcionando. 

O meu index.js deve ficar assim:
```
import React, { Component } from 'react';
import api from '../../services/api';

export default class Main extends Component {
    componentDidMount(){
        this.loadPayments();
    }

    loadPayments = async () => {
        const response = await api.get('/payments');

    };


    render() {
       return <h1>Olá pessoal!</h1>

    }
}
```
Dentro do react a gente não cria simplesmente variáveis para armazenar os valores, pq temos um conceito chamado estado - um estado é sempre um objeto.
```
state = {

}
```
e nessa variavel de estado, nos podemos armazenar os objetos que a gente quiser, por exemplo um array [];

Sempre que a gente tiver uma variavel no estado, o nosso método render vai ficar escutando a alteração dessa variavel e sempre que alguma variavel do estado alterar, o método render executa de novo trazendo as alterações em tela

o index.js ficará assim:
```
import React, { Component } from 'react';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        payments: []
    };


    componentDidMount(){
        this.loadPayments();
    }

    loadPayments = async () => {
        const response = await api.get('/payments');

        this.setState( { payments: response.data.docs } )

    };


    render() {
       return(
           <div className="payment-list">
               {this.state.payments.map(payment => (
                   <h2 key={payment._id}>{payment.holder}</h2>
               ))}
           </div>
       )

    }
}
```
Agora vamos reorganizar novamente o index.js

```
import React, { Component } from 'react';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        payments: []
    };


    componentDidMount(){
        this.loadPayments();
    }

    loadPayments = async () => {
        const response = await api.get('/payments');

        this.setState( { payments: response.data.docs } )

    };


    render() {
        const { payments } = this.state; 

       return(
           <div className="payment-list">
               {payments.map(payment => (
                   <article key={payment._id}>
                       <strong>{payment.description}</strong>
                       <p>{payment.value}</p>

                       <a href="">Acessar</a>
                      
                   </article>
               ))}
           </div>
       )

    }
}
```

Na pasta main, criar um arquivo styles.css (onde vou fazer a estilização da pagina main) e vou importar esse arquivo dentro de index.js, igual aqui em baixo:

```
import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css'
```


Organizar o arquivo recem criado(styles.css).

```
.payment-list {
    max-width: 700px;
    margin: 20px auto 0;
    padding: 0 20px;
}

.payment-list article {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
}

.payment-list article p {
    font-size: 16px;
    color: #999;
    margin-top: 5px;
    line-height: 24px;
}
.payment-list article a {
    height: 42px;
    border-radius: 5px;
    border: 2px solid #da552f;
    background: none;
    margin-top: 10px;
    color: #da552f;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;

}

.payment-list article a:hover {
    background: #da552f;
    color: #fff;
}
```
Criação de paginas anteriores e próximas com react.

Para issso, inicialmente, vou até o aqruivo index.js e coloco a div anterior e a div proxima

```

        return (
            <div className="payment-list">
                {payments.map(payment => (
                    <article key={payment._id}>
                        <strong>{payment.description}</strong>
                        <p>{payment.value}</p>

                        <a href="">Acessar</a>

                    </article>
                ))}
                <div className="actions">
                    <button>Anterior</button>
                    <button>Próxima</button>
                </div>
            </div>
        );
    }
}
```
Volto para o styles.css e adiciono a seguinte estilização:
```

.payment-list .actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.payment-list .actions button {
    padding: 10px;
    border-radius: 5px;
    border: 0;
    background: #da552f;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}

.payment-list .actions button[disabled] {
    opacity: 0.5;
    cursor: default;
}

.payment-list .actions button:hover {
    opacity: 0.7;
}

.payment-list .actions button[disabled]:hover  {
    opacity: 0.5;
}
}
```

Agora vou fazer com que o meu JS entenda que eu estou chamando uma outra pagina, para isso, vou no meu arquivo index.js e faço o onClick, assim:

```
<div className="actions">
                    <button onClick={this.prevPage}>Anterior</button>
                    <button onClick={this.nextPage}>Próxima</button>
                </div>
```
Ainda no index.js, vou criar as duas funções prevPage e nextPage logo abaixo de loadPayments e antes do render()

Eu preciso tbm, armazenar as coisas que estão vindo da minha API, organizando o meu index.js , ele deve ficar desse jeito agora:

```
import React, { Component } from 'react';
import api from '../../services/api';

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

                        <a href="">Acessar</a>

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
```

Configurações de navegação.
para isso, ir no meu terminal e rodar o comando (dentro de huntweb):
```
sudo yarn add react-router-dom
```
Na pasta src criar um arquivo chamado routes.js e configurá-lo p que fique assim:

```
import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';

const Routes = () => (
    <BrowserRouter>
    <Switch>
    <Route path="/" component={Main} />
    </Switch>
    </BrowserRouter>
);

export default Routes;
```

Depois no meu app.js:
```
import React, { Component } from 'react';
import Routes from './routes';

import './styles.css';

import Header from './components/Header';
import Main from './pages/main';

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

export default App;
```

Depois, na pasta pages, criar uma nova pasta chamada payment e dentro dela criar o arquivo index.js, dentro dele: 

```
import React, { Component } from 'react';

export default class Payment extends Component{
    render ()  {
        return <h1>Payment</h1>
    }
}
```

Depois disso, ir em routes.js
```
import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Payment from './pages/payment';

const Routes = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/payments/:id" component={Payment} />
    </Switch>
    </BrowserRouter>
);

export default Routes;
```

Depois, na pasta main, em index.js,fazer um novo import:
```
import { Link } from 'react-router-dom';
```

E lá em baixo, onde eu to usando um ahref, vou trocar o a por link e href por to, assim:
era:
```
 <a href="">Acessar</a>
```
ficou:
```
<Link to="">Acessar</Link>
```
e formatar para fazer a rota que queremos chegar:
```
<Link to={`/payments/${payment._id}`}>Acessar</Link>
```


Buscando os dados do produto e exibindo eles em tela.

Dentro de pages -> payment -> index.js
organizar:

```
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
```

Na pasta product, iniciar um novo arquivo chamado styles.css
e dentro dele:

```
.product-info {
    max-width: 700px;
    margin: 20px auto 0;
    padding: 20px;
    background: #FFF;
    border-radius: 5px;
    border: 1px solid #DDD;
}

.product-info h1 {
    font-size: 32px;

}

.product-info fp {
    color: #666;
    line-height: 24px;
    margin-top: 5px;
}

.product-info p a {
    color: #069
}
```
