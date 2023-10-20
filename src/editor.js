import Quill from "quill";
import theme from "./theme";

const editor = new Quill('.editor', {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [theme.palette.text, theme.palette.primary, theme.palette.secondary, theme.palette.error] }],
            [{ 'font': 'Montserrat' }]
        ]
    },
    theme: 'bubble',
});

export default editor;