import React, {useState} from 'react'

const dateoption = {weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}

const JoinMenu = (props) => {
    const [selGame, setSelGame] = useState(null)
    const [clicked, setClicked] = useState('')
    var games
    var fID
    if(props.field){
        console.log(props.field)
        fID = props.field.fieldID
        games = props.field.games.map((game, i) =>(
            <li>
                <div className={`game-item${i}`} style={(clicked === `game-item${i}`)? ({backgroundColor: '#568203', width: '90%', borderRadius: '20px', padding: '10px', cursor: 'pointer', }) : {cursor: 'pointer', width: '90%', padding: '10px'} } onClick={(e) => {
                    setSelGame({fieldID: fID, time: Date(game.time)})
                    setClicked(`game-item${i}`)
                    }}>
                    <div className='game-time'>When: {/*game.time*/new Date(Date.parse(game.time)).toLocaleDateString('en-US', dateoption)}</div>
                    <div className='players-need'>Open Spots: {game.playersNeeded}</div>
                    <div className='ref-check'>Refs: <b>{game.refs ? 'YES':'NO'}</b></div>
                </div>
            </li>)
        )
    }
    else{
        games = (
            <li>
                <div className='game-item'>
                    <b><i>NO GAMES</i></b>
                </div>
            </li>
        )
    }
    
    return(
        <div className='popup-menu'>
            <div className='menu-title'>Join</div>
            <div className='join-game'>
                <ul className='join-list'>
                    {games}
                </ul>
            </div>
            <div className="menu-button" onClick={(e) => {
                props.setPopVis(false)
                props.joinGame(e,selGame)}}><b>Submit</b></div>
        </div>
    )
}

export default JoinMenu