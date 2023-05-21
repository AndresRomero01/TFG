package es.ucm.fdi.arties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Security configuration.
 * 
 * Most security configuration will appear in this file, but according to 
 * https://spring.io/guides/topicals/spring-security-architecture/, it is not
 * a bad idea to also use method security (via @Secured annotations in methods) 
 */
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private Environment env;

	@Override
    public void configure(WebSecurity web) throws Exception {
		String debugProperty = env.getProperty("es.ucm.fdi.debug");
		if (debugProperty != null && Boolean.parseBoolean(debugProperty.toLowerCase())) {
			// allows access to h2 console iff running under debug mode
			web.ignoring().antMatchers("/h2/**");
		}
    }

	/**
	 * Main security configuration.
	 * 
	 * The first rule that matches will be followed - so if a rule decides to grant access
	 * to a resource, a later rule cannot deny that access, and vice-versa.
	 * 
	 * To disable security entirely, just add an .antMatchers("**").permitAll() 
	 * as a first rule. Note that this may break an application that expects to have
	 * login information available.
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
	    http
			.csrf()
				.ignoringAntMatchers("/api/**")
				.and()
	        .authorizeRequests()
			.antMatchers("/css/**", "/js/**", "/img/**", "/", "/error", "/signup", "/courses", "/seeCourse", "/items/listToLoan", "/lessons/lessonsToBook", "/derechosImgs").permitAll()
				.antMatchers("/api/**").permitAll()            // <-- public api access
				.antMatchers("/admin/**", "/existeUsuario", "/getUser").hasRole("ADMIN")	   // <-- administration
				.antMatchers("/settings", "/user/deleteUser", "/user/addStaff").hasRole("ADMIN")
				//items admin
				.antMatchers( "/items/addNewItem", "/items/modifyItem", "/items/modifyItemImg","/items/deleteItem").hasRole("ADMIN")
				.antMatchers("/admin/**", "/existeUsuario", "/getUser", "/deletePhrase", "/addPhrase", "/changeGymSubPrice").hasRole("ADMIN")	   // <-- administration
				.antMatchers("/settings", "/user/deleteUser", "/user/addStaff", "/items/addNewItem", "/items/modifyItem", "/items/modifyItemImg","/items/deleteItem").hasRole("ADMIN")
				.antMatchers("/lessons/addNewLesson", "/lessons/modifyLessonImg", "/lessons/modifyLesson").hasRole("ADMIN")
				.antMatchers("/user/**", "/items/cancelLoan").hasAnyRole("USER", "STAFF", "ADMIN")	
				.antMatchers("/chats", "/loanList","/items/endLoan", "/items/undoEndLoan", "/loanListHistory", "/coursesStaff", "/addCourse", "/createCourse", "/modifyCourseImg", "/modifyCourse", "/deleteCourse","/uploadCourseVideo").hasAnyRole("STAFF", "ADMIN")	   
				.antMatchers("/newQuestion", "/suscribe", "/updateUserDescription", "/paymentPage", "/cancelSub").hasAnyRole("USER", "ADMIN")
				.antMatchers("/subscriptions", "/lessons", "/items/myItems","/items/loanItem", "/items/makeLoan", "items/availableItemDay", "/modifyUser", "/getConversation", "/getStaffList").hasAnyRole("USER", "ADMIN", "STAFF")
				.antMatchers("/lessons/myBookingLessons", "/lessons/bookLesson", "/lessons/getDaysOfLesson", "/lessons/bookLessonSession", "/lessons/cancelBookSession", "/lessons/payBooking", "/lessons/paidBookingLessonSession").hasAnyRole("USER", "ADMIN", "STAFF")
				.anyRequest().authenticated()
	            .and()
			.formLogin()
				.loginPage("/login")
				.permitAll().successHandler(loginSuccessHandler); // <-- called when login Ok; can redirect
	}
	
	/**
	 * Declares a PasswordEncoder bean.
	 * 
	 * This allows you to write, in any part of Spring-managed code, 
	 * `@Autowired PasswordEncoder passwordEncoder`, and have it initialized
	 * with the result of this method. 
	 */
	@Bean
	public PasswordEncoder getPasswordEncoder() {
		// by default in Spring Security 5, a wrapped new BCryptPasswordEncoder();
		return PasswordEncoderFactories.createDelegatingPasswordEncoder(); 
	}	
	
	/**
	 * Declares a springDataUserDetailsService bean.
	 * 
	 * This is used to translate from Spring Security users to in-application users.
	 */
	@Bean
	public ArtiesUserDetailsService springDataUserDetailsService() {
		return new ArtiesUserDetailsService();
	} 
	
	/**
	 * Declares an AuthenticationManager bean.
	 * 
	 * This can be used to auto-login into the site after creating new users, for example.
	 */
	 @Bean
	 @Override
	 public AuthenticationManager authenticationManagerBean() throws Exception {
	     return super.authenticationManagerBean();
	 }
	 
	 @Autowired
	 private LoginSuccessHandler loginSuccessHandler;
}
