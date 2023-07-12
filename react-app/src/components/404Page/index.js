import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./404page.css"

function ErrorPage() {
    const history = useHistory();
    return (
        <div className="error-page">
            <h1>404 No snacks here 😢</h1>
            <button onClick={() => history.push("/")} className="create-listing">Back To Home</button>
        </div>
    )
}

export default ErrorPage;
