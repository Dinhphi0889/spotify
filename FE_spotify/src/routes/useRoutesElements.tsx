import { useRoutes } from "react-router-dom"
import HomePage from "../modules/UserModule/homePageLayout/HomePage"
import UserLayout from "../layouts/UserLayout"
import DetailArtists from "../modules/UserModule/detailArtists/DetailArtists"

const useRoutesElements = () => {
    const element = useRoutes([
        {
            path: '',
            element: <UserLayout />,
            children: [
                {
                    path: '',
                    element: <HomePage />
                },
                {
                    path: 'detail-artists/:id',
                    element: <DetailArtists />
                }
            ]
        }
    ])
    return element
}
export default useRoutesElements