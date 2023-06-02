import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import Modal from "react-modal";

import "./style.scss";
import Img from "../../components/lazyLoadImage/Img";
import CircleRating from "../../components/circleRating/CircleRating";
import Genres from "../../components/genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import axios from "axios";

const ShowDetails = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);

    // console.log(id);

    // single data fetching from API ------------------->
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    // single data fetching from API ------------------->

    // destructuring data---------------->
    const { name, image, genres, premiered, rating, summary, status } = data || {};

    // keeping rich text in a variable------------->
    const htmlContent = summary;

    // contert number type data to time ---------------->

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    // modal open and close------------->

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    // Modal styles
    const modalStyles = {
        content: {
            width: "90%",
            height: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: "999",
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        window.alert("successfully submitted data");
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    <React.Fragment>
                        <div className="content">
                            {/* shows image */}
                            <div className="left">
                                {image?.original ? (
                                    <Img className="posterImg" src={image?.original} />
                                ) : (
                                    <Img className="posterImg" src={PosterFallback} />
                                )}
                            </div>

                            {/* shows content */}
                            <div className="right">
                                <div className="title">
                                    {`${name} (${dayjs(premiered).format("YYYY")})`}
                                </div>
                                {/* <div className="subtitle">{data.tagline}</div> */}

                                <Genres data={genres} />

                                <div className="row">
                                    <CircleRating rating={rating?.average} />
                                </div>

                                <div className="overview">
                                    <div className="heading">Overview</div>
                                    <div
                                        className="description"
                                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                                    />
                                </div>

                                <div className="info">
                                    {status && (
                                        <div className="infoItem">
                                            <span className="text bold">Status: </span>
                                            <span className="text">{status}</span>
                                        </div>
                                    )}
                                    {premiered && (
                                        <div className="infoItem">
                                            <span className="text bold">Release Date: </span>
                                            <span className="text">
                                                {dayjs(premiered).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    )}
                                    {data.runtime && (
                                        <div className="infoItem">
                                            <span className="text bold">Runtime: </span>
                                            <span className="text">
                                                {toHoursAndMinutes(data.runtime)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <button className="button" onClick={openModal}>
                                    Book a ticket
                                </button>
                            </div>
                        </div>
                    </React.Fragment>
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    {/* skeleton */}
                    <div className="left skeleton"></div>
                    <div className="right">
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                    </div>
                </div>
            )}
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                ariaHideApp={false}
                className="modal"
            >
                <div className="container">
                    <div className="container-close" onClick={closeModal}>
                        &times;
                    </div>
                    <img src={image?.original} alt="image" />
                    <form className="container-text" onSubmit={handleSubmit}>
                        <h2>{name}</h2>
                        <p>Book the ticket to get first show and 15% off on all kind of buying.</p>
                        <input type="email" placeholder="Email address" required />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default ShowDetails;
