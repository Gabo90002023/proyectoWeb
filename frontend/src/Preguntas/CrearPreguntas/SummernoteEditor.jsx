import React, { useEffect, useRef } from 'react';
import './CrearPreguntaCK.css';

const SummernoteEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const $ = window.$;
    const editor = editorRef.current;
    
    setTimeout(() => {
    if (editor) {
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

          // Corrige videos con parámetros extra
            const videoDialog = $(editor).summernote('module', 'videoDialog');
            const originalCreateVideoNode = videoDialog.createVideoNode;

            videoDialog.createVideoNode = function (url) {
              const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
              if (match && match[1]) {
                url = `https://www.youtube.com/embed/${match[1]}`;
              }
              return originalCreateVideoNode.call(this, url);
            };

          $(editor).summernote('code', value || '');
        }
      }
    });
  }
  }, 100);
    return () => {
      if (editor && $(editor).data('summernote')) {
        $(editor).summernote('destroy');
      }
    };

  }, []);

  return <textarea ref={editorRef} />;
};

export default SummernoteEditor;
