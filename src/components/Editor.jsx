import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import axios from 'axios';

const TextEditor = () => {
    const [value, setValue] = useState('');

    const handleChange = (content, delta, source, editor) => {
        setValue(content);
    };

    const sendToServer = () => {
        axios.post('http://your-backend-url.com/api/save', {
            text: value
        })
            .then(response => {
                console.log('Value sent to server successfully:', response.data);
                // Optionally, you can perform actions after successfully sending data to the server
            })
            .catch(error => {
                console.error('Error sending value to server:', error);
                // Optionally, you can handle errors here
            });
    };

    return (
        <div>
            <ReactQuill
                value={value}
                onChange={handleChange}
                theme="snow"
            />
            <button style={{ marginTop: '15px' }} className='upload-pic' onClick={sendToServer}>Paylaş</button>
        </div>
    );
};

export default TextEditor;
