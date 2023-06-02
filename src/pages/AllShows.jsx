import { useEffect, useState } from "react";
import Spinner from "../components/spinner/Spinner";
import ShowsCard from "../components/showsCard/ShowsCard";
import axios from "axios";
import "./style.scss";

const AllShows = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    // Data fetching from API------------------>
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
    // Data fetching from API------------------>

    return (
        <div className="explorePage">
            {/* Page title */}
            <div className="pageHeader">
                <div className="pageTitle">Explore TV Shows</div>
            </div>

            {/* Loading content */}
            {loading && <Spinner initial={true} />}
            
            {/* main content */}
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
