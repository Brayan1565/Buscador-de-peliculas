import { Link } from "react-router";

function NotFoundPage() {
    return (
        <div>
            <h1>404</h1>
            <p>Esta página no existe.</p>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
}

export default NotFoundPage;