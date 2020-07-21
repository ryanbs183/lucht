import React, {useState} from 'react'

const ScheduleMenu = (props) => {

  const [players, setPlayers] = useState(1)
  const [time, setTime] = useState(Date.now())
  const [referees, setReferees] = useState(false)

  return(
    <div className='popup-menu'>
      <div className='menu-title'>Schedule</div>
      <form>
        <ul>
          <h3> WHEN: </h3>
          <input id="time" type="datetime-local" min={Date.now().toLocaleString()} onChange={(e) => {setTime(Date(e.target.value))}}/>
          <h3> PLAYERS: </h3>
          <input id="players" type="number" placeHolder="Players" min={1} onChange={(e) => {setPlayers(e.target.value)}}/>
          <label className='ref-button'><h3>REFS:</h3>
            <input id='ref' type='checkbox' disabled onChange={(e) => {setReferees(e.target.value)}}/>
            <span className="checkmark"></span>
          </label>
        </ul>
        <div className="menu-button" onClick={(e) => {
          props.setPopVis(false)
          props.postGame(e,{
          location: props.loc,
          players: players,
          ref: referees,
          time: time,
          fieldID: props.fieldID
        })}}><b>Submit</b></div>
      </form>
    </div>
  )
}

export default ScheduleMenu
