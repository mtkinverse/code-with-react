import React from 'react'

export default function About(props) {
    
  return (
    <>
    <div className='container my-3 text-dark'  >
      <h1 style={{backgroundColor : props.DarkLight.backgroundColor === 'white' ? 'white':'rgb(64 78 117)',color:props.DarkLight.backgroundColor === 'white' ? 'black' : 'white'}}>Something about <code>Text-Reformer</code> </h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item" >
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" style={{backgroundColor : props.DarkLight.backgroundColor === 'white' ? 'white':'rgb(131 145 183)',color:props.DarkLight.backgroundColor === 'white' ? 'black' : 'white'}}>
            Introduction
          </button>
        </h2>
        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body text-dark">This site was created with aim to resolve the text of users in their own way . Text-Reformer was inaugrated by {props.creator} in {props.creatingDate} with the collaboration and hard teaching of <a href='https://www.youtube.com/watch?v=kEvfVw5Sq5c&list=PLCZo59YnSsMaFGT2DHuxqUiyx_PFN3IOB&index=21'>CodeWithHarry</a> .</div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button style={{backgroundColor : props.DarkLight.backgroundColor === 'white' ? 'white':'rgb(131 145 183)',color:props.DarkLight.backgroundColor === 'white' ? 'black' : 'white'}}className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            Functionalities
          </button>
        </h2>
        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body">Text-Reformer is tasked to provide smooth navigation to users to manipulate user's text . At this time, the user can count words and characters, change the case of the text ,and enjoy the stated functionalities in two modes : light and dark, along with carrying their task</div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button style={{backgroundColor : props.DarkLight.backgroundColor === 'white' ? 'white':'rgb(131 145 183)',color:props.DarkLight.backgroundColor === 'white' ? 'black' : 'white'}} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            Feedback us
          </button>
        </h2>
        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body">It would be a humble request to all our users to provide us a feedback at the form below (will be available if not) .</div>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}
