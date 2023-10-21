package mosquitobytes.carboncritters.repository;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import mosquitobytes.carboncritters.model.Profile;

import java.util.List;

public interface ProfileRepository extends DatastoreRepository<Profile, Long> {

}
