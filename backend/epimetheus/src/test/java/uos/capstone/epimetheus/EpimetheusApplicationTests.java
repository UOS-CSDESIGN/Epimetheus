package uos.capstone.epimetheus;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EpimetheusApplicationTests {

	@Test
	void contextLoads() {
		Assertions.assertThat("Spring Boot Server Started");
	}

}
