import React from 'react';

import { Page } from '../Page/Page';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { loginFormConnect } from '../../components/LoginForm/connector';
import { forNonAuthorizedConnect } from '../../components/Guard/forNonAuthorizedConnect';
import { Guard } from '../../components/Guard/Guard';

import './LoginPage.css';

const LoginFormContainer = loginFormConnect(LoginForm);
const ForNonAuthorizedGuard = forNonAuthorizedConnect(Guard);

export class LoginPage extends Page {

    renderContent() {
        return (
            <ForNonAuthorizedGuard redirectUrl="/area">
                <table className="login-page-main">
                    <tr className="login-form-container">
                        <LoginFormContainer />
                    </tr>
                    <tr>
                        <div className="header bottom">Юров Максим Алексеевич, группа P3211
                        </div>
                    </tr>
                </table>
            </ForNonAuthorizedGuard>
        );
    }
}
