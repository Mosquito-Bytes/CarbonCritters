package mosquitobytes.carboncritters.web;

import mosquitobytes.carboncritters.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final ProfileService profileService;

    public AdminController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/reset-score")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void resetScore() {
        profileService.resetScore();
    }

}
