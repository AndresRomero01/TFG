package es.ucm.fdi.arties;

import java.io.IOException;
import java.util.Collection;

import javax.persistence.EntityManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import es.ucm.fdi.arties.model.User;
//import es.ucm.fdi.arties.model.User.Role;

/**
 * Called when a user is first authenticated (via login).
 * Called from SecurityConfig; see https://stackoverflow.com/a/53353324
 * 
 * Adds a "u" variable to the session when a user is first authenticated.
 * Important: the user is retrieved from the database, but is not refreshed at each request. 
 * You should refresh the user's information if anything important changes; for example, after
 * updating the user's profile.
 */
@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired 
    private HttpSession session;
    
    @Autowired
    private EntityManager entityManager;    
    
	private static Logger log = LogManager.getLogger(LoginSuccessHandler.class);
	
    /**
     * Called whenever a user authenticates correctly.
     */
    @Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
	   
		/* 
		  Avoids following warning: 
		  Cookie “JSESSIONID” will be soon rejected because it has the “SameSite” 
		  attribute set to “None” or an invalid value, without the “secure” attribute. 
		  To know more about the “SameSite“ attribute, read 
		  https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie/SameSite
		*/
		addSameSiteCookieAttribute(response);

		String username = ((org.springframework.security.core.userdetails.User)
				authentication.getPrincipal()).getUsername();
	    
	    // add a 'u' session variable, accessible from thymeleaf via ${session.u}
	    log.info("Storing user info for {} in session {}", username, session.getId());
		User u = entityManager.createNamedQuery("User.byUsername", User.class)
		        .setParameter("username", username)
		        .getSingleResult();		
		session.setAttribute("u", u);

		// add 'url' and 'ws' session variables
		String url = request.getRequestURL().toString()
			.replaceFirst("/[^/]*$", ""); 	    // .../foo		 => ...
		session.setAttribute("url", url);
		String ws = url
			.replaceFirst("[^:]*", "ws");       // http[s]://... => ws://...
		session.setAttribute("ws", ws + "/ws");

		// redirects to 'admin' or 'user/{id}', depending on the user
        String nextUrl = "index";
		/* String nextUrl = u.hasRole(User.Role.ADMIN) ? 
			"configuracion" :
			"user/" + u.getId(); */

		log.info("LOG IN: {} (id {}) -- session is {}, websocket is {} -- redirected to {}",
			u.getUsername(), u.getId(), session.getId(), ws, nextUrl);

   /*          boolean notificacion = false;
            session.setAttribute("notificacion", notificacion); */

		// note that this is a 302, and will result in a new request
		response.sendRedirect(nextUrl);
	}

	/**
	 * Set samesite cookie - see https://stackoverflow.com/a/58996747/15472
	 * @param response
	 */
	private void addSameSiteCookieAttribute(HttpServletResponse response) {
		Collection<String> headers = response.getHeaders(HttpHeaders.SET_COOKIE);
		boolean firstHeader = true;
		// there can be multiple Set-Cookie attributes
		for (String header : headers) {
			if (firstHeader) {
				response.setHeader(HttpHeaders.SET_COOKIE,
						String.format("%s; %s", header, "SameSite=Strict"));
				firstHeader = false;
				continue;
			}
			response.addHeader(HttpHeaders.SET_COOKIE,
					String.format("%s; %s", header, "SameSite=Strict"));
		}
	}
}