const BlogForm = (props) => {


    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={props.handleAddBlog}>
                <div>
                    <p>title: </p>
                    <input 
                    type='text'
                    value={props.title}
                    name='title'
                    onChange={({target}) => props.setTitle(target.value)}
                    /><br />
                    <p>author: </p>
                    <input 
                    type='text'
                    value={props.author}
                    name='author'
                    onChange={({target}) => props.setAuthor(target.value)}
                    /><br />
                    <p>url: </p>
                    <input 
                    type='text'
                    value={props.url}
                    name='url'
                    onChange={({target}) => props.setUrl(target.value)}
                    /><br /><br />
                    <button type='submit'>create</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm