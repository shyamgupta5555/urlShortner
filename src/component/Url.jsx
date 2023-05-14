import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxCopy } from "react-icons/rx";

function Url() {
  const [show, setShow] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [data, setData] = useState("");

  function handel(e) {
    e.preventDefault();
    if (data.length < 10)
      return window.alert("minimum at least 10 length url put");
    axios
      .post("http://localhost:4001/url/shorten", { longUrl: data })
      .then((res) => {
        console.log(res);
        setShortUrl(res.data.data.shortUrl);
        setShow(true);
      })
      .catch((err) => {
        console.log(err.message);
        setData("");
        window.alert(err.message);
      });
  }

  function clear() {
    setShow(false);
    setShortUrl("");
    setData("");
  }

  useEffect(() => {
    setShow(false);
    setShortUrl("");
  }, [data]);

  const copyToClipBoard = async (copyMe) => {
    await navigator.clipboard.writeText(copyMe);
  };

  return (
    <div
      className="container"
      style={{
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        marginTop: "80px",
        padding: "2rem",
        width: "500px",
        backgroundColor: "rgba(25, 153, 207, 0.87)",
      }}
    >
      <form>
        <div className="mb-3">
          <label className="form-label">
            Enter a long URL to make a TinyURL
          </label>
          <input
            type="text"
            required
            className="form-control"
            value={data}
            onChange={(e) => {
              setData(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">🪄 TinyURL</label>
          <input type="text" className="form-control" value={shortUrl}></input>
        </div>
      </form>
      {show ? (
        <>
          <button type="submit" className="btn btn-success" onClick={clear}>
            Shorten another
          </button>
          <button
            type="submit"
            className="btn btn-success"
            style={{
              marginLeft: "3rem",
            }}
            onClick={() => {
              copyToClipBoard(shortUrl);
            }}
          >
            <RxCopy /> Copy
          </button>
          <button
            className="btn btn-primary "
            style={{
              marginLeft: "1rem",
            }}
          >
            <a href={shortUrl} target="_blank" style={{ color: "white" }}>
              Redirect
            </a>
          </button>
        </>
      ) : (
        <>
          <button type="submit" className="btn btn-success" onClick={handel}>
            Make TinyURL !
          </button>
        </>
      )}
    </div>
  );
}

export default Url;
