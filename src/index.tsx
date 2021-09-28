import App from './App';
import ReactDOM from 'react-dom';
import { doubleClick } from './tools';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
	
Object.assign(window, { doubleClick });