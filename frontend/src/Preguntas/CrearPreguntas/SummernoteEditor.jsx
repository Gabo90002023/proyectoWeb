import React, { useEffect, useRef } from 'react';
import './CrearPreguntaCK.css';

const SummernoteEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const $ = window.$;
    const editor = editorRef.current;

    $(editor).summernote({
      height: 180,
      placeholder: 'Escribe tu contenido aquí...',
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
        ['fontname', ['fontname']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph', 'height']],
        ['insert', ['link', 'picture', 'video', 'table', 'hr']],
        ['misc', ['fullscreen', 'codeview', 'help']],
      ],
      fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Segoe UI'],
      fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
      callbacks: {
        onChange: function(contents) {
          onChange(contents); // Actualiza el valor en el estado padre
        },
        onInit: function() {
          $(editor).summernote('code', value || '');
        }
      }
    });

    return () => {
      $(editor).summernote('destroy');
    };
  }, []);

  return <textarea ref={editorRef} />;
};

export default SummernoteEditor;
