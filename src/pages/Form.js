


export default function Form({title, questions, players}) {
  
  

  return (
    <div className="form">
      <h2>{title}</h2>
      {questions.map((qn) => (
        <>
          <h3>{qn}</h3>
          {players.map((p) =>
        <label>
          <input
            type='radio'
            name='name'
            value={p}/>
            {p}
        </label>
          )}   
        </>
      ))
      }
  
     
              
    </div>
  )
}