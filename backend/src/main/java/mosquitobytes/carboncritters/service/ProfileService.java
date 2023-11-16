package mosquitobytes.carboncritters.service;

import lombok.extern.slf4j.Slf4j;
import mosquitobytes.carboncritters.handler.CustomWebSocketHandler;
import mosquitobytes.carboncritters.model.Critter;
import mosquitobytes.carboncritters.model.Profile;
import mosquitobytes.carboncritters.model.Score;
import mosquitobytes.carboncritters.repository.ProfileRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
public class ProfileService {

    private final CustomWebSocketHandler webSocketHandler;

    private final ProfileRepository profileRepository;

    public ProfileService(@Lazy CustomWebSocketHandler webSocketHandler, ProfileRepository profileRepository) {
        this.webSocketHandler = webSocketHandler;
        this.profileRepository = profileRepository;
    }

    public Profile getProfile(Long id) {
        log.info("Inside Profile.getProfile method.");

        return profileRepository.findById(id).orElse(null);
    }

    public void createProfile(String userName, String critterName) {
        var profile = new Profile(null, userName,
                0, new Score(0, 0),
                new Critter(1l, critterName));
        profileRepository.save(profile);
    }

    public void updateScore(Long id, double delta) {
        var profile = getProfile(id);
        var newScore = profile.score().total() + delta;

        var updatedProfile = new Profile(id, profile.userName(), newScore,
            new Score(newScore, delta), profile.critter());

        profileRepository.save(updatedProfile);
    }

    public void resetScore() {
        var profiles = profileRepository.findAll();

        profiles.forEach(this::resetScore);

        try {
            webSocketHandler.sendLeaderBoardToAllActiveSessions();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void resetScore(Profile profile) {
        var updatedProfile = new Profile(profile.id(), profile.userName(), 0.0,
            new Score(0.0, 0.0), profile.critter());

        profileRepository.save(updatedProfile);
    }

}
