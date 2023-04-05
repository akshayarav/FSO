import Person from './Person'

const Persons = ({namesToShow, delNum}) =>{
    return(
    <div>
    {namesToShow.map(person =>
    <Person key = {person.name} person = {person} delNum = {delNum}/>
    )}
    </div>
    )
}

export default Persons