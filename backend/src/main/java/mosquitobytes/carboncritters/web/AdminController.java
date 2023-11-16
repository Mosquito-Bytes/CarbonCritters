package mosquitobytes.carboncritters.web;

import mosquitobytes.carboncritters.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create-user")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createUser(@RequestBody CreateUserRequest request) {
        profileService.createProfile(request.userName(), request.critterName());
    }

    private record CreateUserRequest(
        String userName, String critterName
    )
    {}

}
