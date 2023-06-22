import ReactQuill from "react-quill";
import { useState } from "react";
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ]
}

const formats = [ 'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
'list', 'bullet', 'indent', 'link', 'image'
]

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
 
  function createNewPost(e) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    e.preventDefault();
    fetch('http://localhost:4000/post', {
      // post new blog entry
      method: 'POST',
      body: data,
    })
  }

  return (
    <form onSubmit={createNewPost}>
      <input 
        type="title" 
        placeholder="Title" 
        value={title} 
        onChange={e => setTitle(e.target.value)} />
      <input 
        type="summary" 
        placeholder="Summary"
        value={summary}
        onChange={e => setSummary(e.target.value)} />
      <input 
        type="file"
        onChange={e => setFiles(e.target.files)} />
      <ReactQuill 
        value={content} 
        onChange={newValue => setContent(newValue)} 
        modules={modules} 
        formats={formats} />
      <button style={{marginTop:'5px'}}>Create Post</button>
  </form>
  )
}

export default CreatePost;