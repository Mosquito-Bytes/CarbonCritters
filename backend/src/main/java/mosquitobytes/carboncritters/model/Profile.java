package mosquitobytes.carboncritters.model;


import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity
public record Profile(@Id Long id, float score) {
}
