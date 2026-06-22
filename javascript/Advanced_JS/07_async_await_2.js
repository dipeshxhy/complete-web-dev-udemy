function fetchPostData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Post data fetched successfully');
    }, 2000);
  });
}

function fetchCommentData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Comment data fetched successfully');
    }, 1000);
  });
}
const results = Promise.all([fetchPostData(), fetchCommentData()]);

async function getBlogData() {
  try {
    console.log('fetching blog data');
    const blogData = await Promise.all([fetchCommentData(), fetchPostData()]);
    console.log(blogData);
  } catch (error) {
    console.log('Error fetching blog data', error);
  }
}
getBlogData();
