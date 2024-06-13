import { MainSection } from "@/sections/MainSection";
import { Grid } from "@mui/material";

export default function Home() {
	return (
		<main>
			<Grid container>
				<Grid sm={1}></Grid>
				<Grid sm={10}>
					<MainSection />
				</Grid>
				<Grid sm={1}></Grid>
			</Grid>
		</main>
	);
}

