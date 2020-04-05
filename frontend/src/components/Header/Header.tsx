import React from 'react';

import { Session } from '../../models/session';

import './Header.css';

export interface HeaderProps {

    locked: boolean;
    session: Session | null;

    onSignOut(session: Session): void;
}

export class Header extends React.Component<HeaderProps> {

    private onSignOut() {
        const { session, onSignOut } = this.props;

        if (session != null) {
            onSignOut(session);
        }
    }

    render() {
        const { locked, session } = this.props;

        return (
            <header className="main-header">
                <span className="header coolHeader">
                    Лабораторная работа №4<br/>
                    Вариант 1358742
                </span>

                {session && (
                    <div id="logout-button">
                        <button className="p-button-secondary" disabled={locked}
                                onClick={this.onSignOut.bind(this)} >Выйти</button>
                    </div>
                )}
            </header>
        );
    }
}
