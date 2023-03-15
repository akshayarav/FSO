const Total = ({ course }) => {
    const total= course.parts.reduce((acc, curr) => 
    acc+curr.exercises,0
    )
    return(
    <b>
        total of {total} exercises
    </b>
    )
}

export default Total