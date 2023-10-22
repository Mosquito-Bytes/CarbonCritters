package mosquitobytes.carboncritters.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import mosquitobytes.carboncritters.model.LeaderBoard;
import mosquitobytes.carboncritters.model.Profile;
import mosquitobytes.carboncritters.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class LeaderBoardService {

    @Autowired
    private ProfileRepository profileRepository;

    public LeaderBoard getLeaderBoardUsers() throws JsonProcessingException {
        log.info("Inside LeaderBoardService.getLeaderBoardUsers method.");

        var request = PageRequest.of(0, 5, Sort.by("points").descending());
        Iterable<Profile> users = profileRepository.findAll(request);
        LeaderBoard leaderBoard = new LeaderBoard();

        for (Profile user : users) {
            leaderBoard.getUsers().add(user);
        }

        return leaderBoard;
    }

}
