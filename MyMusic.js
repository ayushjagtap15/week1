import { useState, useEffect } from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";

const MyMusic = () => {
    const [songData, setSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/song/get/mysongs"
            );
            setSongData(response.data);
        };
        getData();
    }, []);

    // Inline styles for the component
    const styles = {
        header: {
            color: "#ffffff",
            fontSize: "1.5rem",
            fontWeight: "bold",
            padding: "1rem 0.5rem",
            backgroundColor: "#1db954", // Spotify green
            borderRadius: "0.5rem",
            textAlign: "center",
        },
        listContainer: {
            margin: "1rem",
            padding: "1rem",
            backgroundColor: "#121212", // Dark background
            borderRadius: "0.5rem",
            maxHeight: "60vh",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#1db954 #121212",
        },
        emptyState: {
            color: "#b3b3b3",
            textAlign: "center",
            fontSize: "1.2rem",
            marginTop: "2rem",
        },
    };

    return (
        <LoggedInContainer curActiveScreen="myMusic">
            <div style={styles.header}>
                My Songs
            </div>
            <div style={styles.listContainer}>
                {songData.length === 0 ? (
                    <div style={styles.emptyState}>No songs available. Add some!</div>
                ) : (
                    songData.map((item) => {
                        return <SingleSongCard info={item} playSound={() => {}} />;
                    })
                )}
            </div>
        </LoggedInContainer>
    );
};

export default MyMusic;