import React from 'react';
import './App.css';

interface FormState {
    email: string;
    password: string;
    password_confirm: string;
    token: string;
    id: string;
}

const useForm = () => {
    const [formState, setFormState] = React.useState<FormState>({
        email: '',
        password: '',
        password_confirm: '',
        token: '',
        id: '',
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const resetFormState = () => {
        setFormState({ email: '', password: '', password_confirm: '', token: '', id: '' });
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
        const { password, password_confirm, token, id, email } = formState;

        if (password !== password_confirm) {
            alert('Passwörter stimmen nicht überein!');
            return;
        }

        const response = await fetch(`http://localhost:3000/token/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                email,
                password,
            }),
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
                    Personalnummer:
                    <input
                        required
                        value={formState.id}
                        name="id"
                        type="text"
                        onChange={onChange}
                    />
                </label>
                <label>
                    Einmal-Token:
                    <input
                        required
                        value={formState.token}
                        name="token"
                        type="text"
                        onChange={onChange}
                    />
                </label>
                <label>
                    E-Mail Adresse:
                    <input
                        required
                        value={formState.email}
                        name="email"
                        type="email"
                        onChange={onChange}
                    />
                </label>
                <label>
                    Passwort:
                    <input
                        required
                        value={formState.password}
                        name="password"
                        type="password"
                        onChange={onChange}
                    />
                </label>
                <label>
                    Passwort bestätigen:
                    <input
                        required
                        value={formState.password_confirm}
                        name="password_confirm"
                        type="password"
                        onChange={onChange}
                    />
                </label>
                <button type="submit">Senden</button>
            </form>
        </div>
    );
}

export default App;
