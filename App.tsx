import { useState } from 'react';
import Login from './Login';
import ChaosCarnival from './ChaosCarnival';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    if (isLoggedIn) {
        return <ChaosCarnival />;
    }

    return <Login onLogin={() => setIsLoggedIn(true)} />;
}

export default App;
