import Container from "react-bootstrap/Container"
import micromark from "micromark"

interface AboutProps {
    article: string;
}

function About({article}: AboutProps) {
    console.log(article)
    return ( 
        <Container>
        </Container>
     );
}

export async function getStaticProps() {
    const markdown = await fetch("https://github.com/roiceee/organize/")
    return {
      props: {}, // will be passed to the page component as props
    }
  }

export default About;