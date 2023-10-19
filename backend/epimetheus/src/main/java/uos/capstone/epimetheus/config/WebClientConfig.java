package uos.capstone.epimetheus.config;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

@Configuration
public class WebClientConfig {

    HttpClient httpClient = HttpClient.create()
            .responseTimeout(Duration.ofSeconds(180))
            .tcpConfiguration(
                    client -> client.option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 50000)
                            .doOnConnected(
                                    conn -> conn.addHandlerFirst(new ReadTimeoutHandler(500))
                                            .addHandlerLast(new WriteTimeoutHandler(6000))
                            )
            );


    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }
}
