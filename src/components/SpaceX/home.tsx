import Grid from "@mui/material/Grid2";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { LaunchDetails } from "../types";
import { fetchApi } from "../../requests";
import Spinner from "../Spinner";
import { TextField } from "@mui/material";

const LaunchItem = lazy(() => import("./launchitem"));

const Home: React.FC = () => {
  const [spacex, setSpacex] = useState<LaunchDetails[]>([]);
  const [visibleData, setVisibleData] = useState<LaunchDetails[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const loader = useRef<HTMLDivElement | null>(null);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi();
      console.log(data);
      setSpacex(data);
      setVisibleData(data.slice(0, ITEMS_PER_PAGE));
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loader, loading, visibleData]);

  const filteredData = searchTerm
    ? spacex.filter((item) =>
        item.mission_name.toLowerCase().includes(searchTerm)
      )
    : spacex;

  const loadMoreItems = () => {
    setLoading(true);
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const moreItems = filteredData.slice(start, end);

    if (moreItems.length > 0) {
      setVisibleData((prev) => [...prev, ...moreItems]);
      setPage(nextPage);
    }

    setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setPage(1);
    const filtered = spacex.filter((item) =>
      item.mission_name.toLowerCase().includes(value)
    );
    setVisibleData(filtered.slice(0, ITEMS_PER_PAGE)); // First page of search result
  };

  return (
    <Grid className="h-[90vh] w-[500px] overflow-auto scrollbar-hide">
      <Grid size={12}>
        <div className="m-2">
          <TextField
            onChange={handleChange}
            id="outlined-basic"
            label="Search..."
            variant="outlined"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
              },
              input: {
                color: "white",
              },
              label: {
                color: "white",
              },
            }}
          />
        </div>
        <Suspense fallback={<Spinner />}>
          {visibleData.map((item) => (
            <LaunchItem key={item.flight_number} launch={item} />
          ))}
        </Suspense>
      </Grid>

      <div
        ref={loader}
        className="h-10 w-full flex justify-center items-center"
      >
        {loading ? (
          <Spinner />
        ) : visibleData.length >= filteredData.length ? (
          <span className="text-white">End of List</span>
        ) : null}
      </div>
    </Grid>
  );
};

export default Home;
