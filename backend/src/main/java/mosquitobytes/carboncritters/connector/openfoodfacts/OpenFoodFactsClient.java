package mosquitobytes.carboncritters.connector.openfoodfacts;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;

public interface OpenFoodFactsClient {

    @GetExchange("/api/v3/product/{id}")
    OpenFoodFactsResponse getProduct(@PathVariable("id") String id);

}
