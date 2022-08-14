import React, { useEffect, useState } from "react";
import "./MyProfile.scss";
import CoverImg from "../../assets/images/cover.jpg";
import LogoImg from "../../assets/images/logo.jpg";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { ApiService } from "../../services/apiService";
import { NewsApiPost } from "../../store/auth/types";
const MyProfile = () => {
  const authUser = useSelector((state: any) => state.auth.user);
  const [latestNews, setLatestNews] = useState([] as NewsApiPost[]);

  const fetchLatestNews = async () => {
    //https://newsapi.org/
    try {
      const res: any = await ApiService.get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fab5e337e2f54ecaa77ff86f3a921a5e"
      );
      console.log(res?.articles);
      setLatestNews(res?.articles);
    } catch (error) {}
  };

  useEffect(() => {
    fetchLatestNews();
  }, []);
  const date = (date: any) => {
    const data = new Date(date);
    const result = data.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });

    return result.replace(",", " ");
  };

  return (
    <div className="my-profile">
      <div className="my-profile__card">
        <div
          className="my-profile__card--cover"
          style={{ background: `url('${CoverImg}')` }}
        ></div>
        <div className="my-profile__card--header">
          <div
            className="my-profile__card--profile-img"
            style={{ background: `url('${LogoImg}')` }}
          ></div>
          <div className="my-profile__card--header--name">
            <h3>{authUser?.name + " " + authUser?.lastName}</h3>
            <span>{authUser?.city}</span>
          </div>{" "}
          <div className="my-profile__card--header--email">
            <h3>{authUser?.email}</h3>
            <span>Email</span>
          </div>
        </div>
        <button className="my-profile__card--header--btn">Settings</button>
      </div>

      <div className="my-profile__content">
        <div className="my-profile__content--left"></div>
        <div className="my-profile__content--right">
          {latestNews?.map(post => (
            <div className="my-profile__content--right--post">
              <img
                className="my-profile__content--right--post--img"
                src={post?.urlToImage}
                width={150}
                height={150}
                alt=""
              ></img>
              <div className="my-profile__content--right--post--content">
                <h3>
                  {post?.title} <span> {date(post?.publishedAt)}</span>
                </h3>

                <p>{post?.description}</p>
                <p>{post?.content}</p>
                {post?.author && (
                  <span style={{ color: "#68ea" }}>
                    Author : {post?.author}
                  </span>
                )}
                <br />
                <a href={post?.url} target="_">
                  See full link{" "}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
