import React from 'react';
import './App.css';

interface FormState {
    email: string;
    count: number;
}

const useForm = () => {
    const [formState, setFormState] = React.useState<FormState>({
        email: '',
        count: 0,
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const resetFormState = () => {
        setFormState({ email: '', count: 0 });
    };

    return {
        onChange,
        resetFormState,
        formState,
    };
};

function App() {
    const { onChange, formState, resetFormState } = useForm();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, count } = formState;

        if (count <= 0) {
            alert('Bitte gib eine Zahl größer 0 ein');
            return;
        }

        const response = await fetch(`http://localhost:3000/token/${count}/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status >= 200 && response.status < 300) {
            resetFormState();
            alert('Email wurde versendet');
        } else {
            const { error } = await response.json();
            alert(error);
        }
    };

    return (
        <div className="pagecontainer">
            <form
                className="form"
                onSubmit={onSubmit}
            >
                <label>
                    Anzahl der Einmal-Token:
                    <input
                        required
                        value={formState.count}
                        name="count"
                        type="number"
                        onChange={onChange}
                    />
                </label>
                <label>
                    E-Mail:
                    <input
                        required
                        value={formState.email}
                        name="email"
                        type="email"
                        onChange={onChange}
                    />
                </label>

                <button type="submit">Senden</button>
            </form>
        </div>
    );
}

export default App;
