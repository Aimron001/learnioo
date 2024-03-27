import Card from "../../components/card/Card";
import './home.css'
const cardsData = [
    {
        id: 1, 
        title: "Plan your reading",
        cardIcon: "cardIcon url",
        subTitle:"Schedule",
        content:"Worried you never stick to reading? Track your progress efficiently"
    },
    {
        id: 2,
        title: "AI study buddy",
        cardIcon: "cardIcon url",
        subTitle:"Resources",
        content:"Ask AI any question about anything."
    },
    {
        id: 3,
        title: "Upload your own",
        cardIcon: "cardIcon url",
        subTitle:"Documents",
        content:"Want your own documents? No worries. Upload yours easily."
    },
]
export default function Home(){
    const cards = cardsData.map((card) => {
        return <Card title={card.title} subTitle={card.subTitle} cardIcon={card.cardIcon} content={card.content} key={card.id} />
    })
    return (
        <div className="home">
            <h1>Learn.ioo</h1>
            <div className="container">
                {cards}
            </div>
        </div>
    )
}