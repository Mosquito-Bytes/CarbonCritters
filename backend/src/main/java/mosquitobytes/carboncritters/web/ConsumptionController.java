package mosquitobytes.carboncritters.web;

import mosquitobytes.carboncritters.service.ProductService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/consume")
public class ConsumptionController {

    private final ProductService productService;

    public ConsumptionController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public void consumeProduct(@RequestBody ConsumptionRequest request) {
        productService.addProduct(request.consumerId(), request.productCode());
    }

}

record ConsumptionRequest(Long consumerId,  String productCode) {
}
