import PostContent from "./post-detail/post-content";
import {getPostData, getPostsFiles} from '../../lib/posts-util'
import Head from "next/head";
function PostDetailsPage(props){
    return <>
    <Head>
    <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
    </Head>
    <PostContent post={props.post}/></>
}

export function getStaticProps(context) {
    const {params} = context;
    const { slug } = params;

    const postData = getPostData(slug);

    return {
        props: {
            post: postData
        },
        revalidate: 1800

    }
}

export function getStaticPaths(){
    const postFilenames = getPostsFiles();

    const slugs = postFilenames.map(fileName => fileName.replace(/\.md$/, ''));
    return {
        paths: slugs.map(slug => ({params: {slug: slug}})),
        fallback: false,
    }
}

export default PostDetailsPage;