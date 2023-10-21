package mosquitobytes.carboncritters.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity
public record Profile(@Id @JsonProperty("userId") Long id,
                      @JsonProperty("name") String userName,
                      double points,
                      Score score) {
}
