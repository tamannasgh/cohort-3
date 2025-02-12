function Profile({name, age}){
    return <div>
      <h2>{name}</h2>
      {age && <h3>age is {age}.</h3>}
      {/* {age ? <h3>age is {age}.</h3> : null} */}
    </div>
}

export default Profile;