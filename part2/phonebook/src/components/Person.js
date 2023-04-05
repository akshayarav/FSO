const Person = ({ person, delNum }) => {
    return(
    <div>
    {console.log(person)}
        {person.name} {person.number} 
        <button onClick = {delNum(person)}>delete</button>
    </div>
    )
}

export default Person