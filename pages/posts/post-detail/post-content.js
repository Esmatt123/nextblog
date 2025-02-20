import PostHeader from "./post-header"
import ReactMarkdown from "react-markdown"
import classes from "./post-content.module.css"
import Image from "next/image";
import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter'
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('css', css)


function PostContent(props) {
   

    const { post } = props;
    
    const imagePath = `/images/posts/${post?.slug}/${post?.image}`

    const customRenderers = {
        p(paragraph) {
            const { node } = paragraph;
            const image = node.children[0]
            if (image.type === 'element' && image.tagName === "img") {
                const image = node.children[0]

                return <div className={classes.image}>
                    <Image src={`/images/posts/${post?.slug}/${image.properties.src}`} alt={image.properties.alt} width={600} height={300} />
                </div>
            }
            return <p>{paragraph.children}</p>
        },
        code(code){
            const { children, className} = code;
            const language = className.split('-')[1]
            return <SyntaxHighlighter style={atomDark} language={language}
            >{children}</SyntaxHighlighter>
        }
    };
    return <article className={classes.content}>
        <PostHeader title={post?.title} image={imagePath} />
        <ReactMarkdown components={customRenderers}>{post?.content}</ReactMarkdown>
    </article>
}

export default PostContent