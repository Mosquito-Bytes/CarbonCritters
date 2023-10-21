package mosquitobytes.carboncritters.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;

@Getter
@Setter
@ToString
public class LeaderBoard {

    ArrayList<Profile> users = new ArrayList<>();

}
