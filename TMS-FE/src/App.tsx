import './App.css';
import AppProvider from './providers/app';
import { AppRoutes } from './routes';
import { JqueryProvider } from '@/lib/jquery';
import Modal from 'react-modal';
import { ReactNotifications } from 'react-notifications-component';

Modal.setAppElement('#root');
function App() {
  return (
    <AppProvider>
      <JqueryProvider>
        <ReactNotifications />
        <AppRoutes />
      </JqueryProvider>
    </AppProvider>
  );
}

export default App;
