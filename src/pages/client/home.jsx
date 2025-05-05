import FeaturedNews from "../../components/client/home/hom.featured.news"
import FeaturedProject from "../../components/client/home/hom.featured.projects"
import HomeList from "../../components/client/home/home.list"
import Banner from "../../components/client/layout/banner"
import Banner2 from "../../components/client/layout/banner2"

const HomePage = () => {

    return (
        <>
            <Banner />
            <HomeList />
            <FeaturedProject />
            <Banner2 />
            <FeaturedNews />
        </>
    )
}

export default HomePage