// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import Locales from 'components/Locales';
// import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Survey from 'pages/extra-pages/survey';
// auth provider
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //


const App = () => (
  
  <ThemeCustomization>
    {Survey}
    <Locales>
      <ScrollTop>
        <AuthProvider>
          <>
            <Routes />
            <Snackbar />
          </>
        </AuthProvider>
      </ScrollTop>
    </Locales>
    {}
  </ThemeCustomization>
  
);

export default App;
