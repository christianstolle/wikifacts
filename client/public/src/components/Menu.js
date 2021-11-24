import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <ul>
            <li>OUR MISSION</li>
            <Link to="/participate">
                <li>PARTCIPATE</li>
            </Link>
        </ul>
    );
}
