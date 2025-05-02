import FeaturedProject from "../../components/client/home/hom.featured.projects"
import HomeList from "../../components/client/home/home.list"
import Banner from "../../components/client/layout/banner"

const HomePage = () => {

    return (
        <>
            <Banner />
            <HomeList />
            <FeaturedProject />
        </>
    )
}

export default HomePage