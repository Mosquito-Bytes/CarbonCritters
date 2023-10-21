package mosquitobytes.carboncritters.model;

import com.google.cloud.Timestamp;
import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity
public record ConsumedProduct(
        @Id Long id,
        Long consumerId,
        Timestamp time,
        Product product
) {

    public ConsumedProduct(Long consumerId, Product product) {
        this(null, consumerId, Timestamp.now(), product);
    }

}
