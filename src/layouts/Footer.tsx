import Link from "next/link";
import { AppBar, Container, Toolbar } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className='flex justify-end p-1'>
          <div className="flex justify-between w-24">
            <Link href="#"><LinkedInIcon /></Link>
            <Link href="#"><FacebookIcon /></Link>
            <Link href="#"><TwitterIcon /></Link>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}