package mosquitobytes.carboncritters.repository;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import mosquitobytes.carboncritters.model.ConsumedProduct;
import mosquitobytes.carboncritters.model.Product;

public interface ConsumedProductRepository extends DatastoreRepository<ConsumedProduct, Long> {
}
