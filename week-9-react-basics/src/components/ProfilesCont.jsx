import { useState } from "react";
import Profile from "./Profile";

function ProfileCont(){
   const [profiles, setProfiles] = useState([{name:"tamanna", age:"18"}, {name:"kanishka"}]);
     
    function addProfile(){
        setProfiles([...profiles, {name:"tamanna", age:"18"}]);
    }

    return (
        <>
            {profiles.map((profile, i) => <Profile key={i} name={profile.name} age={profile.age} />)}
            <button  onClick={addProfile}>add profile</button>
        </>
    );   
    
}

export default ProfileCont;