package mosquitobytes.carboncritters.config;

import mosquitobytes.carboncritters.handler.CustomWebSocketHandler;
import mosquitobytes.carboncritters.service.LeaderBoardService;
import mosquitobytes.carboncritters.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private CustomWebSocketHandler customWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(customWebSocketHandler(), "/").setAllowedOrigins("*");
    }

    public WebSocketHandler customWebSocketHandler() {
        return customWebSocketHandler;
    }
}
