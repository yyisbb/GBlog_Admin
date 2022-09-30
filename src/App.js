// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import AuthRouter from './routes/authRouter';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <ThemeCustomization>
        <ScrollTop>
            <AuthRouter>
                <Routes />
            </AuthRouter>
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
