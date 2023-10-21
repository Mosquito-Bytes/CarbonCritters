package mosquitobytes.carboncritters.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CustomWebSocketResponse<E> {

    private String type;
    private E payload;

}
