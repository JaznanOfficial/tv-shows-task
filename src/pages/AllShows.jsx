import { useEffect, useState } from "react";
import Spinner from "../components/spinner/Spinner";
import ShowsCard from "../components/showsCard/ShowsCard";
import axios from "axios";
import "./style.scss";

const AllShows = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    // const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.tvmaze.com/search/shows?q=all");
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="explorePage">
            <div className="pageHeader">
                <div className="pageTitle">Explore TV Shows</div>
            </div>
            {loading && <Spinner initial={true} />}
            <div className="content">
                {!loading && (
                    <>
                        {data?.map((singleShow) => {
                            // console.log(singleShow);
                            return <ShowsCard key={singleShow.show.id} data={singleShow} />;
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default AllShows;
