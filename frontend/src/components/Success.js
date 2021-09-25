import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getSession } from '../reducers/sessionReducer'

const Success = () => {
    const dispatch = useDispatch()

    const session = useSelector(state => state.session)
    const content = useSelector(state => state.content)

    const session_id = {
        siteid: content.id,
        sessionid: window.location.href.split('=')[1],
    }

    if (session.length === 0 && content.id) {
        dispatch(getSession(session_id))
    }

    return (
        <div>
            Success
        </div>
    )
}

export default Success