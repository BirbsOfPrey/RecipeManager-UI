import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import StringResource from "../../resources/StringResource"
import { UserDetailView } from "../widgets/user/UserDetailView"

export const UserView = () => {
    var params = useParams()
    var [searchParams] = useSearchParams()
    var navigate = useNavigate()

    return (
        <div className="userview__container">
            <UserDetailView
                userId={params.userId}
                editable={searchParams.get(StringResource.Queries.Edit) === StringResource.Queries.EditOnValue || params.userId === undefined ? true : false}
                navigate={navigate}
            />
        </div>
    )
}