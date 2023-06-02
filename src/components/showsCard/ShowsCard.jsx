import dayjs from "dayjs";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import Img from "../lazyLoadImage/Img";
import { useNavigate } from "react-router-dom";

const ShowsCard = ({ data }) => {
    const navigate = useNavigate();
    // console.log(data);
    const { genres, premiered, image, rating, name, id } = data?.show || {};
    const posterUrl = image ? image.original : PosterFallback;
    return (
        <div className="movieCard" onClick={() => navigate(`/show-details/${id}`)}>
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />

                <CircleRating rating={rating?.average} />
                <Genres data={genres} />
            </div>
            <div className="textBlock">
                <span className="title">{name}</span>
                <span className="date">{dayjs(premiered).format("MMM D, YYYY")}</span>
            </div>
        </div>
    );
};

export default ShowsCard;
