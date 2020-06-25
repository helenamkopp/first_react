# React JS

## Descrição 
Passo a passo (detalhado) de como iniciar um projeto do zero utilizando ReactJS.

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
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await api.get('/products');

    };


    render() {
       return <h1>Olá pessoal!</h1>

    }
}
```

CONTINUA EM ARMAZENANDO NO ESTADO. 