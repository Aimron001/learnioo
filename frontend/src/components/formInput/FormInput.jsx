import './formInput.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
export default function FormInput(props){
    return (
        <div className="form-input">
            <FontAwesomeIcon icon={props.iconName} />
            <input type={props.type} name={props.name} id={props.id} placeholder={props.placeHolder} value={props.value} onChange={props.onChange}/>
        </div>
    )
}