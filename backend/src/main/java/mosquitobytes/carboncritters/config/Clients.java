package mosquitobytes.carboncritters.config;

import mosquitobytes.carboncritters.connector.openfoodfacts.OpenFoodFactsClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class Clients {

    @Bean
    OpenFoodFactsClient openFoodFactsClient() {
        var client = WebClient.builder().baseUrl("https://world.openfoodfacts.net/").build();
        var factory = HttpServiceProxyFactory.builder(WebClientAdapter.forClient(client)).build();

        return factory.createClient(OpenFoodFactsClient.class);
    }

}
