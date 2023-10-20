package uos.capstone.epimetheus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:/application.yml")
public class EpimetheusApplication {

	public static void main(String[] args) {
		SpringApplication.run(EpimetheusApplication.class, args);
	}

}
