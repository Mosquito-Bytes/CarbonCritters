package mosquitobytes.carboncritters.model;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;

@Entity
public record Critter(Long id, String name) {
}
