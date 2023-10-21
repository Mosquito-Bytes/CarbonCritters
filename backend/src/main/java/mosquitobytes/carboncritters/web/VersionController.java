package mosquitobytes.carboncritters.web;

import com.google.cloud.spring.data.datastore.core.DatastoreTemplate;
import mosquitobytes.carboncritters.model.Profile;
import mosquitobytes.carboncritters.repository.ProfileRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/version")
public class VersionController {

    private final ProfileRepository profileRepository;

    public VersionController(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @GetMapping
    public Profile getVersion() {
        return profileRepository.findById(5644004762845184L).get();
    }

}
