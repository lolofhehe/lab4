import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { signIn } from '../../store/application/actions';
import { Session } from '../../models/session';
import { LoginFormProps } from './LoginForm';
import { RootState } from '../../reducer';
import { backendApi } from '../../utils/backendApi';
import { lockAndDo } from '../../utils/lockAndDo';
import { growl } from '../../index';
import { backendApiUserNotifyWrapper } from '../../utils/backendApiUserNotifyWrapper';

type StateProps = Pick<LoginFormProps, 'locked'>;

const mapStateToProps = (rootState: RootState): StateProps => {
    return { locked: rootState.application.locked }
};

type DispatchProps = Pick<LoginFormProps, 'onSignIn' | 'onSignUp'>;

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        onSignIn(username: string, password: string): void {
            lockAndDo(dispatch, async () => {
                const response = await backendApiUserNotifyWrapper(
                    backendApi('session/create', 'POST', { username, password }),
                    [401]
                );

                if (response.ok) {
                    const json = await response.json();

                    dispatch(signIn(json as Session));
                } else if (response.status === 401) {
                    growl.current?.show({
                        severity: 'error',
                        summary: 'Ошибка при входе',
                        detail: 'Пароль неверен, либо пользователя не существует.'
                    });
                }
            });
        },

        onSignUp(username: string, password: string): void {
            lockAndDo(dispatch, async () => {
                const response = await backendApiUserNotifyWrapper(
                    backendApi('user/create', 'POST', { username, password }),
                    [400]
                );

                if (response.ok) {
                    growl.current?.show({
                        severity: 'success',
                        summary: 'Успех',
                        detail: 'Регистрация успешна.'
                    });
                } else {
                    growl.current?.show({
                        severity: 'error',
                        summary: 'Ошибка при регистрации',
                        detail: 'При регистрации произошла ошибка.'
                    });
                }
            });
        }
    };
};

export const loginFormConnect = connect(mapStateToProps, mapDispatchToProps);
