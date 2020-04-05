package lab4.api.v1.auth;

import lab4.users.UserEntity;

public class AuthenticationEvent {

    public final UserEntity user;

    AuthenticationEvent(UserEntity user) {
        this.user = user;
    }
}
