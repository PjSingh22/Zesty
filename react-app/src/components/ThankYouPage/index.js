import aws from "../../assets/aws.png";
import css from "../../assets/css.png";
import html from "../../assets/html.png";
import postSQL from "../../assets/postgreSQL.png";
import python from "../../assets/python.png";
import flask from "../../assets/flask.png";
import reactpic from "../../assets/react.png";
import redux from "../../assets/redux.png";
import { useHistory } from "react-router-dom";
import "./thankyoupage.css"

function ThankYouPage() {
  const history = useHistory();
  return (
    <div className="thank-you-page">
      <h1>Thank you for your purchase!</h1>
      <div className="tools-used-container">
        <div className="tools-used">
          <img className="tech" src={python} alt="python" />
          <img className="tech" src={postSQL} alt="postSql" />
          <img className="tech" src={flask} alt="flask" />
          <img className="tech" src={reactpic} alt="react" />
          <img className="tech" src={redux} alt="redux" />
          <img className="tech" src={aws} alt="aws" />
          <img className="tech" src={css} alt="css" />
          <img className="tech" src={html} alt="html" />
        </div>
        <button onClick={() => history.push("/")} className="create-listing">Back To Home</button>
      </div>
    </div>
  )
}

export default ThankYouPage;
