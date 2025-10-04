// App.js

import { AuthProvider } from './src/context/AuthContext.js';
import AppNavigator from './src/navigation/AppNavigator'; 
// ...

// O componente principal do nosso aplicativo
export default function App() {
  return (
    // Envolve toda a navegação com o AuthProvider
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}