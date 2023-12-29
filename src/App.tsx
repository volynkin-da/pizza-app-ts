import { MouseEvent } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {
    const addCounter = (e: MouseEvent) => {
        console.log(e);
    };

    return (
        <>
            <Button onClick={addCounter} appearence="big" className="accent">
                Применить
            </Button>
            <Button onClick={addCounter} appearence="small" className="accent">
                Применить
            </Button>
            <Input placeholder="Email" />
        </>
    );
}

export default App;
