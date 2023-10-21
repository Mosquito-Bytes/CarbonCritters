package mosquitobytes.carboncritters.connector.openfoodfacts;

import mosquitobytes.carboncritters.connector.ProductDatabaseConnector;
import mosquitobytes.carboncritters.model.Product;
import org.springframework.stereotype.Component;

@Component
public class OpenFoodFactsConnector implements ProductDatabaseConnector {

    private final OpenFoodFactsClient client;

    public OpenFoodFactsConnector(OpenFoodFactsClient client) {
        this.client = client;
    }

    @Override
    public Product getProduct(String code) {
        var response = client.getProduct(code);

        return toProduct(response);
    }

    private Product toProduct(OpenFoodFactsResponse response) {
        var code = response.code();
        var footprint = response.product().ecoscoreData().agribalyse().carbonTotal() * 100.0;

        return new Product(code, footprint);
    }
}
