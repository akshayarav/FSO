import Person from './Person'

const Persons = ({namesToShow}) =>{
    return(
    <div>
    {namesToShow.map(person =>
    <Person key = {person.name} person = {person}/>
    )}
    </div>
    )
}

export default Persons