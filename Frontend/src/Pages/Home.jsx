
import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getApiData = async () => {
    const response = await fetch(
     "http://0.0.0.0:8000/posts/?format=json"
    ).then((response) => response.json()).then(data => {
      setPosts(data)
    });
    console.log(posts);
    return response;
  };
  useEffect(() => {
    getApiData();
  }, []);

  return(
    <div className="Page">
      Посты
      <div>
        {posts.length > 0 && (
          <div>
            {posts.map(post => {
              <div>
                Name
                {post.description}
              </div>
            })}
          </div>
        )}        
      </div>
    </div>
  );
}
export default Home