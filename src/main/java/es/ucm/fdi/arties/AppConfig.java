package es.ucm.fdi.arties;

import java.io.File;
import java.time.LocalDate;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import es.ucm.fdi.arties.model.DB.DBLessonsHandler;
import es.ucm.fdi.arties.model.Lesson;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
/**
 * General configuration for a Spring app.
 * 
 * Declares multiple beans (which can later be accessed anywhere) via
 * Spring magic. 
 */
@Configuration	
@EnableScheduling
public class AppConfig {

	
    private static final Logger log = LogManager.getLogger(AppConfig.class);

	@Autowired
    private EntityManager em;
	private DBLessonsHandler dbLessons = new DBLessonsHandler();

	@Autowired
	private Environment env;

	@Autowired
	private TaskScheduler taskScheduler;
	
	/**
	 * Declares a LocalData bean.
	 * 
	 * This allows you to write, in any part of Spring-managed code, 
	 * `@Autowired LocalData localData`, and have it initialized
	 * with the result of this method. 
	 */	
    @Bean(name="localData")
    public LocalData getLocalData() {
    	return new LocalData(new File(env.getProperty("es.ucm.fdi.base-path")));
    } 
    
	/**
	 * Declares a MessageSource Spring bean.
	 * 
	 * This will be used to fill in internationalized (i18n for short) messages
	 * in your web templates.  
	 */    
    @Bean
    public ResourceBundleMessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("Messages");
        return messageSource;
    }

/* 
	 @PostConstruct
	@Transactional
	public void initializeEvents()
	{
		log.info("registrando evento");
		TaskScheduler taskScheduler = new ConcurrentTaskScheduler();
		CronTrigger trigger = new CronTrigger("0 0 0 * * ?");
		Runnable task = () -> {
			log.info("Tarea programada ejecutandose");
			LocalDate actualDate = LocalDate.now();
			LocalDate date = actualDate.plusDays(30-1);	
			log.info("dia a sumar "+ date);
			dbLessons.createNewSessionsInDay(em,date);
			log.info("Tarea programada ejecutada");
		};
		taskScheduler.schedule(task, trigger);
	}  */

	/* @PostConstruct
	@Transactional
    public void initialize() {
        // Aquí colocas el código que deseas que se ejecute una sola vez
		log.info("codigo a ejecutar una unica vez");
		Lesson l = dbLessons.getLesson(em, 1);

		log.info("lesson name: " + l.getName());

		
		LocalDate actualDate = LocalDate.now();
		LocalDate date = actualDate;
		for (int i = 1; i <= 30; i++) {
			
			  log.info("date: "+ date.toString());
			  dbLessons.createNewSessionsInDay(em,date);
			  date = actualDate.plusDays(i);		   
		}
    } */
}
