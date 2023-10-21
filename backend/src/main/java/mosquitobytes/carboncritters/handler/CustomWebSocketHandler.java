package mosquitobytes.carboncritters.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import mosquitobytes.carboncritters.model.CustomWebSocketResponse;
import mosquitobytes.carboncritters.model.LeaderBoard;
import mosquitobytes.carboncritters.model.Profile;
import mosquitobytes.carboncritters.service.LeaderBoardService;
import mosquitobytes.carboncritters.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.MultiValueMap;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
@Slf4j
public class CustomWebSocketHandler implements WebSocketHandler {

    private final Map<String, WebSocketSession> activeSessions = new HashMap<>();

    @Autowired
    private LeaderBoardService leaderBoardService;

    @Autowired
    private ProfileService profileService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.debug("afterConnectionEstablished: {}", session.getId());
        this.activeSessions.put(session.getId(), session);

        // Get the query parameters from the connection url of the session
        MultiValueMap<String, String> parameters =
                UriComponentsBuilder.fromUriString(session.getUri().toString()).build().getQueryParams();
        List<String> userId = parameters.get("userId");

        // Send the user back to the client
        CustomWebSocketResponse<Profile> response = new CustomWebSocketResponse<Profile>();
        response.setType("ws/server/user");
        response.setPayload(this.profileService.getProfile(Long.parseLong(userId.get(0))));
        session.sendMessage(new TextMessage(convertToJson(response)));

        sendLeaderBoard(session);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        log.info("handleMessage: {}", session.getId());
        TextMessage textMessage = (TextMessage) message;
        String requestPayload = (String) textMessage.getPayload();
    }

    public void sendLeaderBoardToAllActiveSessions() throws IOException {
        for (WebSocketSession activeSession : this.activeSessions.values()) {
            sendLeaderBoard(activeSession);
        }
    }

    public void sendLeaderBoard(WebSocketSession session) throws IOException {
        CustomWebSocketResponse<LeaderBoard> response = new CustomWebSocketResponse<LeaderBoard>();
        response.setType("ws/server/leaderBoard");
        response.setPayload(this.leaderBoardService.getLeaderBoardUsers());
        session.sendMessage(new TextMessage(convertToJson(response)));
    }

    private String convertToJson(CustomWebSocketResponse response) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(response);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.info("handleTransportError: {}, {}", exception.getMessage(), session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        log.info("afterConnectionClosed: {}, {}", closeStatus.getCode(), session.getId());
        this.activeSessions.remove(session.getId());
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
