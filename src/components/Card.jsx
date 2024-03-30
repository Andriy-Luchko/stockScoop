import "./Card.css";

function Card({ text, data }) {
  return (
    <div className="Card">
      <h2>{data}</h2>
      <h4>{text}</h4>
    </div>
  );
}

export default Card;
