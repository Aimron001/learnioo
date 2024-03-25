import "./book.css";
import BookPhoto from "../../assets/cardIcon.jpeg";

export default function Book({title}){
    return(
        <div className="book">
            <img src={BookPhoto} alt="Book photo" />
            <p>{title.length > 15 ? `${title.slice(0,15)}...` : title}</p>
        </div>
    )
}