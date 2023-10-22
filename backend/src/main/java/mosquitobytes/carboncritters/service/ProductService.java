package mosquitobytes.carboncritters.service;

import mosquitobytes.carboncritters.connector.ProductDatabaseConnector;
import mosquitobytes.carboncritters.handler.CustomWebSocketHandler;
import mosquitobytes.carboncritters.model.ConsumedProduct;
import mosquitobytes.carboncritters.repository.ConsumedProductRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ProductService {

    public static final double BASELINE = 200.0;
    private final ConsumedProductRepository consumedProducts;

    private final ProfileService profileService;

    private final ProductDatabaseConnector productDatabase;

    private final CustomWebSocketHandler webSocketHandler;

    public ProductService(ConsumedProductRepository consumedProducts, ProfileService profileService, ProductDatabaseConnector productDatabase, CustomWebSocketHandler webSocketHandler) {
        this.consumedProducts = consumedProducts;
        this.profileService = profileService;
        this.productDatabase = productDatabase;
        this.webSocketHandler = webSocketHandler;
    }

    public void addProduct(Long consumerId, String productCode) {
        var product = productDatabase.getProduct(productCode);
        var consumedProduct = new ConsumedProduct(consumerId, product);

        consumedProducts.save(consumedProduct);

        var footprint = consumedProduct.product().footprint();
        var score = BASELINE - footprint;
        profileService.updateScore(consumerId, (int) score);

        try {
            webSocketHandler.sendLeaderBoardToAllActiveSessions();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
