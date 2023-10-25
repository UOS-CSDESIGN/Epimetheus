package uos.capstone.voice.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.handler.invocation.HandlerMethodArgumentResolver;
import org.springframework.messaging.handler.invocation.HandlerMethodReturnValueHandler;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.List;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketMessageBrokerConfig implements WebSocketMessageBrokerConfigurer {
    @Autowired
    private final StompHandler stompHandler;
    @Autowired
    private final HandshakeInterceptor sessionConnectInterceptor;
    //stomp endpoint 설정
    //stomp: Simple Text Oriented Messaging Protocol
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //socket 최초 연결시 endpoint
        //CONNECT: 연결요청을 거는거, CONNECTED: 연결 성공, ERROR: 연결실패
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .addInterceptors(sessionConnectInterceptor)
                .withSockJS();
    }
    //stomp message broker 설정
    //destination
    //simple broker(메모리 기반 메시지 브로커), application broker(메시지 핸들러로 라우팅)
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //server-to-client prefix
        registry.enableSimpleBroker("/sub");

        //client-to-server prefix
        registry.setApplicationDestinationPrefixes("/pub");
    }
    //stomp message 정보에 대한 설정
    //message size limit, buffer size, custom decoders and encoders
    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
        WebSocketMessageBrokerConfigurer.super.configureWebSocketTransport(registry);
    }
    //add interceptor at client inbound channel
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        WebSocketMessageBrokerConfigurer.super.configureClientInboundChannel(registration);
    }
    //add interceptor at client outbound channel
    @Override
    public void configureClientOutboundChannel(ChannelRegistration registration) {
        WebSocketMessageBrokerConfigurer.super.configureClientOutboundChannel(registration);
    }
    //add custom argument resolver
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        WebSocketMessageBrokerConfigurer.super.addArgumentResolvers(argumentResolvers);
    }
    //add custom return value handler
    @Override
    public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> returnValueHandlers) {
        WebSocketMessageBrokerConfigurer.super.addReturnValueHandlers(returnValueHandlers);
    }
    //add custom message converter
    @Override
    public boolean configureMessageConverters(List<MessageConverter> messageConverters) {
        return WebSocketMessageBrokerConfigurer.super.configureMessageConverters(messageConverters);
    }
}
