package mosquitobytes.carboncritters.service;

import mosquitobytes.carboncritters.connector.ProductDatabaseConnector;
import mosquitobytes.carboncritters.model.ConsumedProduct;
import mosquitobytes.carboncritters.repository.ConsumedProductRepository;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
public class ProductService {

    private final ConsumedProductRepository consumedProducts;

    private final ProductDatabaseConnector productDatabase;

    public ProductService(ConsumedProductRepository consumedProducts, ProductDatabaseConnector productDatabase) {
        this.consumedProducts = consumedProducts;
        this.productDatabase = productDatabase;
    }

    public void addProduct(Long consumerId, String productCode) {
        var product = productDatabase.getProduct(productCode);
        var consumedProduct = new ConsumedProduct(consumerId, product);

        consumedProducts.save(consumedProduct);
    }

}
