/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-notifications-component/dist/theme.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
