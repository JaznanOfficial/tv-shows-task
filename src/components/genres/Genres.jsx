import "./style.scss";

const Genres = ({ data }) => {
    console.log(data);

    return (
        <div className="genres">
            {data?.map((genre) => {
                return (
                    <div key={genre} className="genre">
                        {genre}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;
