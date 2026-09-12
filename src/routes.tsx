import { createBrowserRouter } from 'react-router';
import Root from './Root';
import Home from './pages/Home';
import About from './pages/About';
import Capabilities from './pages/Capabilities';
import Industries from './pages/Industries';
import Facilities from './pages/Facilities';
import Projects from './pages/Projects';
import Partnerships from './pages/Partnerships';
import QualityRD from './pages/QualityRD';
import Contact from './pages/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'capabilities', Component: Capabilities },
      { path: 'industries', Component: Industries },
      { path: 'facilities', Component: Facilities },
      { path: 'projects', Component: Projects },
      { path: 'partnerships', Component: Partnerships },
      { path: 'quality-rd', Component: QualityRD },
      { path: 'contact', Component: Contact },
    ],
  },
]);
