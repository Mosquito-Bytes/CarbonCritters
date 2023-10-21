package mosquitobytes.carboncritters.connector.openfoodfacts;

import com.fasterxml.jackson.annotation.JsonProperty;

public record OpenFoodFactsResponse(String code, Product product) {

    record Product(@JsonProperty("ecoscore_data") EcoscoreData ecoscoreData) {

    }

    record EcoscoreData(Agribalyse agribalyse) {

    }

    record Agribalyse(@JsonProperty("co2_total") Double carbonTotal) {

    }
}
