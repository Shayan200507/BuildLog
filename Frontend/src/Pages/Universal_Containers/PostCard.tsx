import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import heartOutline from "../../assets/like-icons/heart-outline.svg";
import heartFilled from "../../assets/like-icons/heart-filled.svg";
import "./PostCard.css";

export  type PostCardData = {
  blog_id: number;
  post_id: number;
  title: string;
  imgurl: string | null;
  name: string;
  tags: string[];
};

type LikeResponse = {
  like_count: number | string;
  likedByUser?: boolean;
};

export function PostCard({ post }: { post: PostCardData }) {
  const navigate = useNavigate();
  const [likeInfo, setLikeInfo] = useState({
    like_count: 0,
    likedByUser: false,
  });

  useEffect(() => {
    let cancelled = false;

    fetch(
      `http://localhost:8000/api/content/postsLikeInfo/${post.post_id}`,
      {
        method: "GET",
        credentials: "include",
      },
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch like information");
        }

        return res.json();
      })
      .then((data: LikeResponse) => {
        if (!cancelled) {
          setLikeInfo({
            like_count: Number(data.like_count),
            likedByUser: Boolean(data.likedByUser),
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      cancelled = true;
    };
  }, [post.post_id]);

  return (
    <li className="postsListElement">
      <button
        type="button"
        className="navigateBtn"
        onClick={() => navigate(`/readPost/${post.blog_id}/${post.post_id}`)}
      >
        <img src={post.imgurl ?? ""} alt={post.title} />
        <div className="elementDetails">
          <h1>{post.title}</h1>
          <p>{post.name}</p>
          <div className="subrowContainer">
            <ul className="tagsList">
              {post.tags.map((tag) => (
                <li className="tagElement" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
            <span className="postLikeInfo">
              <img
                className="likeimg"
                src={likeInfo.likedByUser ? heartFilled : heartOutline}
                alt=""
              />
              {likeInfo.like_count}
            </span>
          </div>
        </div>
      </button>
    </li>
  );
}
