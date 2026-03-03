


import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.min.css';

// Assets CSS Imports
import "../../public/assets/css/animate.css";
import "../../public/assets/css/all.css";
import "../../public/assets/css/boxicons.min.css";
import "../../public/assets/css/bootstrap-icons.css";
import "../../public/assets/css/swiper-bundle.css";
import "../../public/assets/css/style.css";
import '../styles/globals.css'; 
// Components Imports
import Layout from "../components/layout/Layout";
import DisclaimerPopup from "../components/DisclaimerPopup";
import "react-quill/dist/quill.snow.css";
function MyApp({ Component, pageProps }) {
  // Layout Logic
  const getLayout = Component.getLayout || ((page) => (
    <Layout>
      <DisclaimerPopup />
      {page}
    </Layout>
  ));
  
  return (
    <>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;