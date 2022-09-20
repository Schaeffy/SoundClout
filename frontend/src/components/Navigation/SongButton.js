import { NavLink } from "react-router-dom";
import '../Navigation/Navigation.css'

export default function SongButton({ user }) {
    return (
        <div>
            <NavLink exact to='/songs'>
                <button className="songButton">
                    Songs
                </button>
            </NavLink>
        </div>
    );
}
