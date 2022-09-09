import { Link } from 'react-router-dom'
import StringResource from '../../resources/StringResource'
import { UserList } from '../widgets/user/UserList'

export const UserListView = () => {
    return (
        <div className="UserListView__container">
            <Link className="UserListView__createUser" to={StringResource.Routes.User}>
                <button>{StringResource.General.CreateUser}</button>
            </Link>
            <UserList/>
        </div>
    )
}