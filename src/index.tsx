import { createBrowserHistory } from 'history';
import App from './app';
import reducers from './reducers';
import configureStore from './store';
import sagas from './sagas';

const history = createBrowserHistory();

const app = new App({ configureStore, history, reducers, sagas });

const domNode = document.getElementById('app') as HTMLElement;

app.mountToNode(domNode);
