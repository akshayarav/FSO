import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => {

    return(
    <>
    <Header course = {course.name} />
    <Content parts = {course.parts} /> 
    <Total course = {course} />
    </>
    )
}

export default Course