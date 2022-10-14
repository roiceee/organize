import HeadWrapper from "../src/components/head-wrapper";

function Fallback() {
    return ( 
        <div>
            <HeadWrapper/>
            <h1>You may be offline.</h1>
        </div>
     );
}

export default Fallback;