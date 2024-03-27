import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './uploadFile.css'
import { useUploadMutation } from '../../features/api/bookApiSlice'
import { useDispatch, useSelector } from 'react-redux'

function UploadFile() {
    const [file, setFile] = useState()

    const dispatch = useDispatch()
    const [upload, { isLoading }] = useUploadMutation()

    function handleChange(e){
        setFile(e.target.files[0])
    }
    async function submitFile(e){
        e.preventDefault()
        const data = new FormData()
        data.append("book", file)
        try {
            console.log("before dispatching upload")
            const res = await upload(data).unwrap()
            console.log("after dispatching upload")
            setFile("")
        } catch(error) {
            console.log(error)

        }
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
            // value={file} 
            accept="application/pdf" 
            onChange={handleChange}/>
           { file && <button>Submit</button>}
    </form>
  )
}

export default UploadFile