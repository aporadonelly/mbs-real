import React from 'react';
import ReactQuill from 'react-quill-2';
import 'react-quill-2/dist/quill.snow.css';

const WysiwygField = ({ name, value, onChange, className }) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link']
        ],
        clipboard: {
            matchVisual: false
        }
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link'
    ];

    return (
        <ReactQuill
            data-testid="textField"
            className={className}
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="Write requirement description here..."
            name={name}
            value={value}
            onChange={onChange}
        />
    );
};

export default WysiwygField;
