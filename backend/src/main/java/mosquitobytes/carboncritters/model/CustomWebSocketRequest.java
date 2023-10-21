package mosquitobytes.carboncritters.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CustomWebSocketRequest {
    private String type;
    private String payload;
}
