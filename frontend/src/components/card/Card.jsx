import cardIcon from '../../assets/cardIcon.jpeg'
import "./card.css"
export default function Card(props){
    return (
        <div className="card-container">
            <h2>{props.title}</h2>
            <div className='card-content'>
                <img src={cardIcon} alt="card icon" />
                <h3>{props.subTitle}</h3>
                <p>{props.content}</p>
            </div>
        </div>
    )
}