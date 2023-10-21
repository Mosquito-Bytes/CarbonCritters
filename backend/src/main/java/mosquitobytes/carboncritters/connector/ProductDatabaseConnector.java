package mosquitobytes.carboncritters.connector;

import mosquitobytes.carboncritters.model.Product;

public interface ProductDatabaseConnector {

    Product getProduct(String code);

}
