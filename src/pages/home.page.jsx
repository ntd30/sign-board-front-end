import FeaturedProject from "../components/home/hom.featured.projects"
import HomeList from "../components/home/home.list"
import Banner from "../components/layout/banner"

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