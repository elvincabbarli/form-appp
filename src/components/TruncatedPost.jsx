/* eslint-disable react/prop-types */

const TruncatedPost = ({ content }) => {
  if (content?.length > 200) {
    const truncatedContent = content.substring(0, 200) + '...';
    return <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />
      ;
  } else {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
};

export default TruncatedPost;
