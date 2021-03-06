package lab4.api.v1.users;

import lab4.api.v1.auth.AuthenticatedUser;
import lab4.api.v1.auth.Secured;
import lab4.users.UserEntity;
import lab4.users.UsersService;

import javax.inject.Inject;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Objects;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
public class UsersController {

    private final UsersService service;

    private final UserEntity authenticatedUser;

    @Deprecated
    public UsersController() {
        service = null;
        authenticatedUser = null;
    }

    @Inject
    public UsersController(UsersService service, @AuthenticatedUser UserEntity authenticatedUser) {
        this.service = service;
        this.authenticatedUser = authenticatedUser;
    }

    @GET
    @Secured
    @Path("/get")
    public UserDto get() {
        return entityToDto(Objects.requireNonNull(authenticatedUser));
    }

    @GET
    @Path("/get/{userId}")
    public Response get(@PathParam("userId") long userId) {
        final UserEntity user = Objects.requireNonNull(service).getUser(userId);

        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        } else {
            return Response.ok(entityToDto(user)).build();
        }
    }

    @GET
    @Path("/find/{username}")
    public Response find(@NotNull @PathParam("username") String username) {
        final UserEntity user = Objects.requireNonNull(service).findUser(username);

        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        } else {
            return Response.ok(entityToDto(user)).build();
        }
    }

    @POST
    @Path("/create")
    public Response create(
            @NotNull @FormParam("username") String username,
            @NotNull @FormParam("password") String password
    ) {
        final UserEntity user = Objects.requireNonNull(service).createUser(username, password);

        return user == null
                ? Response.status(Response.Status.BAD_REQUEST).build()
                : Response.ok(user.getId()).build();
    }

    @DELETE
    @Secured
    @Path("/remove")
    public boolean remove() {
        return Objects.requireNonNull(service).removeUser(authenticatedUser);
    }

    private UserDto entityToDto(UserEntity entity) {
        return new UserDto(entity.getId(), entity.getUsername());
    }
}
