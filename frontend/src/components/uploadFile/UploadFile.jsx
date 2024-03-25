import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './uploadFile.css'

function UploadFile() {
    const [file, setFile] = useState()


    function handleChange(e){
        setFile(e.target.files[0])
    }
    async function submitFile(e){
        e.preventDefault()
    }
  return (
    <form onSubmit={submitFile} className="file-container">
        <label htmlFor="file">
            <FontAwesomeIcon icon={faPlus} fade />
            <p>Upload files</p>
        </label>
        <input type="file" 
            id="file" 
            name="book" 
            accept="application/pdf" 
            onChange={handleChange}/>
           { file && <button>Submit</button>}
    </form>
  )
}

export default UploadFile