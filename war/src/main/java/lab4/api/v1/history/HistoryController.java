package lab4.api.v1.history;

import lab4.api.v1.auth.AuthenticatedUser;
import lab4.api.v1.auth.Secured;
import lab4.history.HistoryService;
import lab4.history.QueryEntity;
import lab4.users.UserEntity;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Secured
@Path("/history")
@Produces(MediaType.APPLICATION_JSON)
public class HistoryController {

    private final HistoryService service;

    private final UserEntity authenticatedUser;

    @Deprecated
    public HistoryController() {
        service = null;
        authenticatedUser = null;
    }

    @Inject
    public HistoryController(HistoryService service, @AuthenticatedUser UserEntity authenticatedUser) {
        this.service = service;
        this.authenticatedUser = authenticatedUser;
    }

    @GET
    @Path("/get")
    public List<QueryDto> get() {
        return Objects.requireNonNull(service).getQueries(Objects.requireNonNull(authenticatedUser)).stream()
                .map(this::entityToDto).collect(Collectors.toList());
    }

    @GET
    @Path("/get/page/offset/{offset}/count/{count}")
    public List<QueryDto> getPage(
            @PathParam("offset") long offset,
            @PathParam("count") long count
    ) {
        return Objects.requireNonNull(service).getQueries(Objects.requireNonNull(authenticatedUser),
                offset, count).stream().map(this::entityToDto).collect(Collectors.toList());
    }

    private QueryDto entityToDto(QueryEntity entity) {
        return new QueryDto(
                entity.getX().toPlainString(),
                entity.getY().toPlainString(),
                entity.getR().toPlainString(),
                entity.getResult()
        );
    }
}
