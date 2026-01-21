import Layout from './components/Layout';
import ToastProvider from './components/ToastProvider';
import Dashboard from './features/dashboard/Dashboard';


function App() {
  return (
    <ToastProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </ToastProvider>
  );
}

export default App
