import React from 'react';

import { htmlInputEventExtractor } from '../../utils/htmlInputEventExtractor';

import './LoginForm.css';
import { stateDispatcher } from '../../utils/stateDispatcher';
import { customDispatcher } from '../../utils/customDispatcher';

export interface LoginFormProps {

    locked: boolean;

    onSignIn(username: string, password: string): void;
    onSignUp(username: string, password: string): void;
}

interface LoginFormState {

    username: string;
    password: string;
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    state: LoginFormState = {
        username: '',
        password: ''
    };

    render() {
        const { locked } = this.props;

        return (
            <div className="login-form">
                <label className="centered">Вход/Регистрация</label>
                <form onSubmit={this.onSignIn.bind(this)}>
                    <span className="p-float-label">
                        <input type='text' id="username" placeholder="Username" className="login-form__username" disabled={locked} onInput=
                            {customDispatcher(htmlInputEventExtractor, stateDispatcher(this, 'username'), String)} />

                    </span>

                    <span className="p-float-label">
                        <input type='password' id="password" placeholder="Password" className="login-form__password"  disabled={locked}
                                  onInput={customDispatcher(htmlInputEventExtractor, stateDispatcher(this, 'password'), String)} />

                    </span>

                    <div className="login-form__buttons">
                        <button type="submit" disabled={locked}>Войти</button>
                        <button type="button" disabled={locked}
                                onClick={this.onSignUp.bind(this)} className="p-button-secondary" >Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        );
    }

    onSignIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { username, password } = this.state;
        this.props.onSignIn(username, password);
    }

    onSignUp(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        const { username, password } = this.state;
        this.props.onSignUp(username, password);
    }
}
