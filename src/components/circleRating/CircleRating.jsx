import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const CircleRating = ({ rating }) => {
    console.log(rating !== null);

    if (rating !== null)
        return (
            <div className="circleRating">
                <CircularProgressbar
                    value={rating}
                    maxValue={10}
                    text={rating}
                    styles={buildStyles({
                        pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                    })}
                />
            </div>
        );
};

export default CircleRating;