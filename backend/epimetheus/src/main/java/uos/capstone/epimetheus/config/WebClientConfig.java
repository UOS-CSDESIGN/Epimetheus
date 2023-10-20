package uos.capstone.epimetheus.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

@Configuration
public class WebClientConfig {

    HttpClient httpClient = HttpClient.create()
            .responseTimeout(Duration.ofSeconds(180));


    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }

    @Value("${sector}")
    private String corsUrls;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry corsRegistry){
                corsRegistry.addMapping("/**").allowedOrigins(corsUrls.split(","));
            }
        };
    }
}
