import Book from "../../components/book/Book"
import "./workspace.css"
import BookPhoto from "../../assets/cardIcon.jpeg";
import UploadFile from "../../components/uploadFile/UploadFile";


export default function Workspace(){

    return (
        <main className="workspace">
            <div className="left">
                <h2>Happy reading</h2>
                <div className="documents">
                    <div className="reading">
                        <div className="profile">
                            <img src={BookPhoto} alt="" />
                            <p>Thursday</p>
                            <p>8 PM</p>
                        </div>
                        <div className="details">
                                <h2>Name</h2>
                            <div className="current-book">
                                <img src={BookPhoto} alt="" />
                                <p>Hardy Boys</p>
                            </div>
                                <p>Continue reading</p>
                        </div>
                    </div>
                <div className="books">
                    <Book title="Hardy Boys"/>
                    <UploadFile />
                </div>
                
            </div>
            </div>
            
            <div className="viewer">
                <div className="prompt-input">
                    <input type="text" placeholder="Ask AI anything about the book" />
                </div>
                <div className="pdf-viewer">
                {/* {ReactPDF.render(<MyDocument />, `${books[0]?.book}`)} */}
                    {/* <PDFViewer>
                        <MyDocument />
                    </PDFViewer> */}
                    {/* <div className="book-navigation">
                        <h4>Previous</h4>
                        <h4>Page 10</h4>
                        <h4>Next</h4>
                    </div> */}
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