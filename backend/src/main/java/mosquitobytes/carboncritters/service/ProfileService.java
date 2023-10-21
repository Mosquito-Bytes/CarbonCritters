package mosquitobytes.carboncritters.service;

import lombok.extern.slf4j.Slf4j;
import mosquitobytes.carboncritters.model.Profile;
import mosquitobytes.carboncritters.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;
    public Profile getProfile(Long id) {
        log.info("Inside Profile.getProfile method.");

        return profileRepository.findById(id).orElse(null);
    }

}
