const FeaturedPost = (props) => {
    const {featuredPost} = props
    if(!featuredPost)
        return <div className="featured">Nada</div>
    console.log(featuredPost)
    return (
        <div className="featured">
            <h2>{featuredPost.title}</h2>
        </div>
    )
}

export default FeaturedPost