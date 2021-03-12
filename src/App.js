import React, { useState } from "react";
import axios from "axios";

import {
	Card,
    CardActionArea,
	CardContent,
	CardMedia,
	InputLabel,
	makeStyles,
	TextField,
    Typography,
} from "@material-ui/core";

const MainStyle = makeStyles({
	main: {
		margin: "0",
	},
	header: {
		backgroundColor: "#3f3f79",
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "calc(10px + 2vmin)",
		color: "white",
		"& .MuiTextField-root": {
			color: "#f4f3f1",
			"& ::selection": {
				color: " #0a090d",
				backgroundColor: "#fff",
			},
			"& :focus": {
				color: " #f1f4f5",
			},
		},
		"& .MuiInputLabel-root": {
			color: "#f1f1f1",
			margin: "1rem 0rem",
		},
	},
	card: {
        margin: '1.5rem 0rem',  
		maxWidth: "500px",

	},
    card_content:{
        display: "flex",
        flexDirection: "row",
        justifyContent:"center"
    }
});

const URL = "https://api.openweathermap.org/data/2.5/weather";
const APP_KEY = "38daa8655a3c4b49464dd837b5ef9c44";

const Fetcher = async (query) => {
	const { data } = await axios.get(URL, {
		params: {
			q: query,
			units: "metric",
			APPID: APP_KEY,
		},
	});

	return data;
};

function App() {
	const [query, setQuery] = useState("");
	const [data, setData] = useState("");
	const [card, setCard] = useState("");
	const styles = MainStyle();

	const handleChange = (e) => {
		setQuery(e);
	};
	const search = async (e) => {
		if (e.key === "Enter") {
			const data = await Fetcher(query);
			setData(data);
            if(data.weather[0].main === "Clouds"){
                setCard("/img/cloudy/favicon256.ico")
            }
            if(data.weather[0].main === "Clear"){
                setCard("/img/sunny/favicon256.ico")
            }
            if(data.weather[0].main === "Rain"){
                setCard("/img/raining/favicon256.ico")
            }
            console.log(data.weather[0])
            setQuery("")
		}
	};
	return (
		<div className={styles.header}>
			<section className={styles.search}>
				<InputLabel htmlFor='tempature'>
					Digite o Nome da Cidade:
				</InputLabel>
				<TextField
					value={query}
					name='tempature'
					variant='standard'
					onChange={(e) => handleChange(e.target.value)}
					onKeyPress={search}
				/>
			</section>
			<section>
				{data && (
                    
					<Card className={styles.card}>
                        <CardActionArea>
                            <CardMedia 
                                component='img'
                                alt="icon"
                                height="140"
                                width="240"
                                image={card}
                            />
                            <CardContent className={styles.card_content}>
                                <Typography variant={"h3"}>{Math.round(data.main.temp)}
                                </Typography>
                                <Typography variant={"h4"}><sup> <code>&deg;</code></sup></Typography>
                                <Typography variant={"h3"}>C</Typography>
                            </CardContent>
                        </CardActionArea>
					</Card>
				)}
			</section>
		</div>
	);
}

export default App;
