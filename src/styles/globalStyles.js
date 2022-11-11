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

	:root {
		color-scheme: dark;
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
		@media screen and (max-width: 600px) {
			width: 0.4rem;
			height: 0.4rem;
		}
	}

	.swiper-button-next,
	.swiper-button-prev {
    color: white !important;
		padding-bottom: 20px;
	}

	.swiper-wrapper{
		padding-bottom: 30px;
		@media screen and (max-width: 600px) {
			padding-bottom: 40px;
		}
	}

	.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
    bottom: 0px !important;
	}

	@media only screen and (max-width: 600px) {
		.plyr button {
			font-size: 0.8rem;
		}
	}

	.skip-button {
		padding: 0.3rem 1rem;
		position: absolute;
		top: -1.5rem;
		right: 3rem;
		border-radius: 0.3rem;
		border: 1px solid rgba(255, 255, 255, 0.4);
		outline: none;
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.6);
		color: white;
	}
`;

export default GlobalStyle;
