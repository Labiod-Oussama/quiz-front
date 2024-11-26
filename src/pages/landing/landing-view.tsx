import { Box } from "@mui/material";
import MainLayout from "src/layout/home-layout";
import HomeHero from "./home-hero";
import HomeAbout from "./home-about";


export default function LandingView() {
    return (
        <MainLayout>

            <div id="Home" />
            <HomeHero/>
            <Box
                sx={{
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: 'background.default',
                }}
            >
                <HomeAbout />

            </Box>
        </MainLayout>
    )
}

