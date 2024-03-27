import Book from "../../components/book/Book"
import "./workspace.css"
import BookPhoto from "../../assets/cardIcon.jpeg";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRetrieveQuery } from '../../features/api/bookApiSlice'
import { setBooksDetails } from '../../features/books/bookSlice'
import BookViewer from "../../components/bookViewer/BookViewer";
import UploadFile from "../../components/uploadFile/UploadFile";
import Prompt from "../../components/prompt/Prompt";
// import ReactPDF from '@react-pdf/renderer';
// import { PDFViewer } from '@react-pdf/renderer';


export default function Workspace(){

    const {userInfo} = useSelector(state => state.auth)
    const data = useSelector(state => state.book)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data: books, isLoading, isError } = useRetrieveQuery();
    dispatch(setBooksDetails({...books}))
    
    useEffect(()=>{
        if (!userInfo) {
            navigate('../login')
        }
        async function getBooks(){
            // const res = await retrieve()
        }
        
        getBooks()
        
        
        
    }, [navigate, books])
    const booksElements = books?.map((book) => {
        return <Book key={book._id} title={book.bookname}/>
    })
    return (
        <main className="workspace">
            <div className="left">
                <h2>Happy reading {userInfo?.firstname}</h2>
                <div className="documents">
                    <div className="reading">
                        <div className="profile">
                            <img src={BookPhoto} alt="" />
                            <p>Thursday</p>
                            <p>8 PM</p>
                        </div>
                        <div className="details">
                                <h2>{`${userInfo?.firstname} ${userInfo?.lastname}`}</h2>
                            <div className="current-book">
                                <img src={BookPhoto} alt="" />
                                <p>Hardy Boys</p>
                            </div>
                                <p>Continue reading</p>
                        </div>
                    </div>
                <div className="books">
                    { booksElements }
                    <UploadFile />
                </div>
                
            </div>
            </div>
            
            <div className="viewer">
                <div className="prompt-input">
                    <Prompt content="A semiconductor is a material between conductor and insulator"/>
                </div>
                <div className="pdf-viewer">
                    <BookViewer />
                </div>                
            </div>
            {/* <div className="synopsis-details">
                <h2>Hardy Boys</h2>
                <div className="synopsis">
                    <img src={BookPhoto} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor voluptas, eligendi delectus suscipit temporibus commodi esse nostrum velit laboriosam</p>
                    <div className="reading-stats">
                        <p>CHART</p>
                        <p>SREAK</p>
                    </div>
                </div>
            </div> */}
        </main>
    )
}