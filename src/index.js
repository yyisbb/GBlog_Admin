import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
// eslint-disable-next-line no-unused-vars
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import { store } from './store/store';
import App from './App';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReduxProvider>,
    document.getElementById('root')
);
