package lab4;

import lab4.history.HistoryService;
import lab4.sessions.SessionsService;
import lab4.area.Area;
import lab4.users.UsersService;

import javax.ejb.EJB;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;

@ApplicationScoped
public class InjectionProducer {

    @Produces @EJB
    private Area area;

    @Produces @EJB
    private HistoryService historyService;

    @Produces @EJB
    private SessionsService sessionsService;

    @Produces @EJB
    private UsersService usersService;
}
