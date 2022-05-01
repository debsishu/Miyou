import { createGlobalStyle } from "styled-components";

// font-family: 'Gilroy-Bold', sans-serif;
// font-family: 'Gilroy-Heavy', sans-serif;
// font-family: 'Gilroy-Light', sans-serif;
// font-family: 'Gilroy-Medium', sans-serif;
// font-family: 'Gilroy-Regular', sans-serif;

const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	body {
		background-color: #1A1927;
		font-family: 'Gilroy-Regular', sans-serif;
	}

	::placeholder {
		color: black;
		opacity: 0.3;
	}

	.swiper-pagination-bullet-active {
    background-color: #6969FF !important;
	}
	.swiper-pagination-bullet {
		background-color: #C8C8FF;
	}

	.swiper-button-next,
	.swiper-button-prev {
    color: white !important;
		padding-bottom: 20px;
	}

	.swiper-wrapper{
    padding-bottom: 30px;
	}

	.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
    bottom: 0px !important;
	}
`;

export default GlobalStyle;
