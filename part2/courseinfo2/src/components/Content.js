import Part from './Part'

const Content = ({ parts }) => {
    return(
  <>
    {parts.map(part =>
    <Part key={part.id+8} part={part} /> 
    )}    
  </>
    )
}

export default Content