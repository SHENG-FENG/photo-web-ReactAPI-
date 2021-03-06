import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";
const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f917000010000011770bc193a4e41ccade521dbdab1c500";
  const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parsedDate = await dataFetch.json();
    setData(parsedDate.photos);
    setCurrentSearch(input);
  };

  //Load more picture
  const morepicture = async () => {
    let newURL;
    if (input === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parsedDate = await dataFetch.json();
    setData(data.concat(parsedDate.photos));
  };

  useEffect(() => {
    search(intialURL);
  }, []);

  useEffect(() => {
    if (currentSearch === "") {
      search(intialURL);
    } else {
      search(searchURL);
    }
    search(searchURL);
  }, [currentSearch]);

  return (
    <div className="homePage">
      <Search
        search={() => {
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture key={d.id} data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morepicture}>????????????</button>
      </div>
    </div>
  );
};

export default Homepage;
