import React, { useState } from "react";
import axios from "axios";

import {
	Card,
	CardActionArea,
	CardContent,
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
		background:
			"linear-gradient(108deg, rgba(131,58,180,1) 7%, rgba(253,29,29,1) 47%, rgba(252,176,69,1) 95%)",
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
		margin: "1.5rem 0rem",
		maxWidth: "500px",
	},
	card_header:{
		display:"flex",
		justifyContent: "center",
		alignItems:"center",
		border: "2px solid",
		background:"linear-gradient(177deg, rgba(255,255,255,1) 0%, rgba(157,157,157,1) 65%, rgba(121,121,121,1) 100%)"
	},
	card_content: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
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
	const styles = MainStyle();

	const handleChange = (e) => {
		setQuery(e);
	};
	const search = async (e) => {
		if (e.key === "Enter") {
			const data = await Fetcher(query);
			if(data.status === "404"){
				alert("Falha ao encontrar a cidade. Digite sem acentuação e/ou verifique o nome digitado")
			}
			setData(data);
			setQuery("");
		}
	};
	return (
		<div className={styles.header}>
			<section className={styles.search}>
				<InputLabel htmlFor='temperature'>
					Digite o Nome da Cidade (sem acentuação):
				</InputLabel>
				<TextField
					fullWidth
					id="temperature"
					value={query}
					name='temperature'
					variant='standard'
					onChange={(e) => handleChange(e.target.value)}
					onKeyPress={search}
				/>
			</section>
			<section>
				{data && (
					<Card className={styles.card}>
						<CardActionArea>
							<CardContent>
								<div className={styles.card_header}>
									<img
										src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
										alt={data.weather[0].description}
									/>
								</div>
							</CardContent>
							<CardContent className={styles.card_content}>
								<Typography variant={"h3"}>
									{Math.round(data.main.temp)}
								</Typography>
								<Typography variant={"h4"}>
									<sup>
										<code>&deg;</code>
									</sup>
								</Typography>
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
