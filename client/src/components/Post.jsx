import { format } from "date-fns";

const Post = ({title, summary, cover, content, createdAt}) => {
  return (
    <div className="post">
        <div className="image">
          <img src="https://jamesclear.com/wp-content/uploads/2016/07/five-step-creative-process-700x450.jpg" alt=""/>
        </div>
        <div className="texts">
          <h2>{title}</h2>
          <p className="info">
            <a className="author">Brenda Moran</a>
            <time>{format(new Date(createdAt), 'MMM d yyyy HH:mm')}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
  )
}
export default Post;