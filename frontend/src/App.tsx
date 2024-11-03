import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
    const [greeting, setGreeting] = useState<string>('');

    useEffect(() => {
        fetch('http://localhost:3000/api/greeting')
            .then(response => response.json())
            .then(data => setGreeting(data.message))
            .catch(error => console.error('Error fetching greeting:', error));
    }, []);

    return (
        <div>
            <h1>Pokedex</h1>
            <p>{greeting}</p>
        </div>
    );
};

export default App;
