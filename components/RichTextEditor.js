import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'blockquote', 'link']
  ],
};

const RichTextEditor = ({handleChange, value}) => {
  return (
    <ReactQuill value={value} onChange={handleChange} modules={modules} formats={[
      'link'
    ]}/>
  );
};

export default RichTextEditor;
