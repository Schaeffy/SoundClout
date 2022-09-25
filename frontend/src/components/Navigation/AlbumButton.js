import { NavLink } from "react-router-dom";
import './Navigation.css'

export default function AlbumButton({ user }) {
    return (
        <div>
            <NavLink exact to='/albums'>
                <button className="albumButton">
                    Albums
                </button>
            </NavLink>
        </div>
    );
}
