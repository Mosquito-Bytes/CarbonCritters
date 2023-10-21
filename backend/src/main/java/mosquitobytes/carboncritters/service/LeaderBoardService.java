package mosquitobytes.carboncritters.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import mosquitobytes.carboncritters.model.LeaderBoard;
import mosquitobytes.carboncritters.model.Profile;
import mosquitobytes.carboncritters.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class LeaderBoardService {

    @Autowired
    private ProfileRepository profileRepository;

    public LeaderBoard getLeaderBoardUsers() throws JsonProcessingException {
        log.info("Inside LeaderBoardService.getLeaderBoardUsers method.");

        Iterable<Profile> users = profileRepository.findAll();
        LeaderBoard leaderBoard = new LeaderBoard();

        for (Profile user : users) {
            leaderBoard.getUsers().add(user);
        }

        return leaderBoard;
    }

}
