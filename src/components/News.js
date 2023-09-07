import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import './News.css'

const News = (props) => {
    // State for managing news articles, loading state, current page, and total results.
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // Mock Data Of News Articles
    const newsData = {
        Home: {
            status: "ok",
            totalResults: 38,
            articles: [
                {
                    "source": {
                        "id": null,
                        "name": "Hindustan Times"
                    },
                    "author": "HT Tech",
                    "title": "Asteroid 2020 GE to make close approach to Earth; Speed, size, proximity revealed by NASA - HT Tech",
                    "description": "NASA has revealed that a massive bus-size asteroid is on its way towards Earth and it will make a very close approach on September 8, 2023. It has been named Asteroid 2020 GE.",
                    "url": "https://tech.hindustantimes.com/photos/asteroid-2020-ge-to-make-close-approach-to-earth-speed-size-proximity-revealed-by-nasa-71693916084621.html",
                    "urlToImage": "https://images.hindustantimes.com/tech/img/2023/09/05/1600x900/5_1693479151047_1693916122092.jpg",
                    "publishedAt": "2023-09-05T12:18:06Z",
                    "content": "Top SectionsExplore Tech\r\nCopyright © HT Media Limited All rights reserved."
                },
                {
                    "source": {
                        "id": null,
                        "name": "NDTV News"
                    },
                    "author": "NDTV Sports Desk",
                    "title": "\"Concerns Related To Security, Economic Situation...\": Jay Shah On Why Asia Cup Was Moved Out Of Pa.. - NDTV Sports",
                    "description": "Jay Shah opened up about the decision taken by the Asian Cricket Council to move the Asia Cup 2023 out of Pakistan.",
                    "url": "https://sports.ndtv.com/asia-cup-2023/concerns-related-to-security-economic-situation-jay-shah-on-why-asia-cup-was-moved-out-of-pakistan-4361889",
                    "urlToImage": "https://c.ndtvimg.com/2022-10/5gn8prd_jay-shah-650_650x400_19_October_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675",
                    "publishedAt": "2023-09-05T11:52:08Z",
                    "content": "The Asia Cup 2023 was supposed to take place in Pakistan but the BCCI was not in favour of the arrangement and after extensive talks, a hybrid model was agreed upon where Pakistan would host four mat… [+2246 chars]"
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TOI Sports Desk",
                    "title": "'You have to make tough choices...': Who is saying what about India's ODI World Cup squad - Times of India",
                    "description": "Cricket News:  Waiting for an ICC trophy for more than a decade, India on Tuesday announced a 15-member squad led by skipper Rohit Sharma for the upcoming ICC ODI W",
                    "url": "https://timesofindia.indiatimes.com/sports/cricket/icc-world-cup/you-have-to-make-tough-choices-who-is-saying-what-about-indias-odi-world-cup-squad/articleshow/103394808.cms",
                    "urlToImage": "https://static.toiimg.com/thumb/msid-103395088,width-1070,height-580,imgsize-57328,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
                    "publishedAt": "2023-09-05T11:30:00Z",
                    "content": "Asia Cup: India, Pakistan blockbuster ends in no result\r\nasia-cup-rain-plays-spoilsport-as-india-pakistan-blockbuster-ends-in-no-result"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Hindustan Times"
                    },
                    "author": "HT Entertainment Desk",
                    "title": "Fukrey 3 trailer: Richa Chadha fights it out with Pulkit Samrat and gang. Watch - Hindustan Times",
                    "description": "Fukrey 3 trailer: Richa Chadha, Pulkit Samrat, Pankaj Tripathi, Varun Sharma and Manjot Singh are back with the latest film in the hit franchise.  | Bollywood",
                    "url": "https://www.hindustantimes.com/entertainment/bollywood/fukrey-3-trailer-richa-chadha-wants-her-old-life-back-but-pulkit-samrat-and-gang-go-all-out-to-fight-her-in-elections-101693889514510.html",
                    "urlToImage": "https://www.hindustantimes.com/ht-img/img/2023/09/05/1600x900/richa_1693912144217_1693912162225.png",
                    "publishedAt": "2023-09-05T11:16:28Z",
                    "content": "Six years after the second installment in the comedy film franchise, Fukrey 3 is finally set to hit the big screen. The Fukrey 3 trailer brought back the quirky group of Pulkit Samrat as Hunny, Manjo… [+1934 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Hindustan Times"
                    },
                    "author": "Aniruddha Dhar",
                    "title": "G20 Summit traffic FAQs: Will Delhi Metro remain shut? Will cars be allowed? - Hindustan Times",
                    "description": "G20 Summit traffic restrictions: The Delhi Police has issued a slew of curbs to ensure a smooth flow of traffic in the national capital. | Latest News India",
                    "url": "https://www.hindustantimes.com/india-news/g20-summit-traffic-faqs-will-delhi-metro-remain-closed-will-cars-be-allowed-101693907124624.html",
                    "urlToImage": "https://www.hindustantimes.com/ht-img/img/2023/09/05/1600x900/G20-Prep-5_1693910288293_1693910320830.jpg",
                    "publishedAt": "2023-09-05T10:40:51Z",
                    "content": "Come September 9 and 10, the world's top leaders will be gathering at Delhi's sprawling Pragati Maidan for the G20 Summit. To maintain foolproof security arrangements during the G20 Summit, the Delhi… [+5701 chars]"
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TIMESOFINDIA.COM",
                    "title": "Garena delays the launch of 'Free Fire India' - Times of India",
                    "description": "Singapore-based online games developer and publisher, Garena, has postponed the relaunch of the popular mobile game, Free Fire India. The company init",
                    "url": "https://timesofindia.indiatimes.com/gadgets-news/garena-delays-the-launch-of-free-fire-india/articleshow/103392541.cms",
                    "urlToImage": "https://static.toiimg.com/thumb/msid-103392513,width-1070,height-580,imgsize-547312,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
                    "publishedAt": "2023-09-05T10:36:00Z",
                    "content": "Boult launches Astra TWS earbuds: Price, Specs and more"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Livemint"
                    },
                    "author": "Shashank Mattoo",
                    "title": "Uncertainty over Joe Biden's participation in G20 summit | Mint - Mint",
                    "description": "First lady Jill Biden has tested positive for Covid-19, but there has been no comment thus far on what this means for the US President’s participation in the New Delhi G20 Summit this week",
                    "url": "https://www.livemint.com/news/india/uncertainty-over-joe-bidens-participation-in-g20-summit-11693909742125.html",
                    "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/AP06-22-2023-000303B-0_1687444128198_1693909877077.jpg",
                    "publishedAt": "2023-09-05T10:32:39Z",
                    "content": "A cloud of uncertainty seems to be looming over US President Joe Bidens participation in the upcoming G20 Summit, to be held on 9-10 September in New Delhi. This came after First Lady Jill Biden test… [+1666 chars]"
                },
                {
                    "source": {
                        "id": "espn-cric-info",
                        "name": "ESPN Cric Info"
                    },
                    "author": "Firdose Moonda",
                    "title": "De Kock to retire from ODIs after World Cup in India - ESPNcricinfo",
                    "description": "De Kock's availability for South Africa had also become an issue after he signed up for the BBL recently",
                    "url": "https://www.espncricinfo.com/story/quinton-de-kock-to-retire-from-odis-after-world-cup-in-india-1396382",
                    "urlToImage": "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/353400/353493.6.jpg",
                    "publishedAt": "2023-09-05T10:31:22Z",
                    "content": "NewsDe Kock's availability for South Africa had also become an issue after he signed up for the BBL recently\r\nFirdose Moonda is ESPNcricinfo's correspondent for South Africa and women's cricket"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Bar & Bench - Indian Legal News"
                    },
                    "author": "Debayan Roy",
                    "title": "These judges have signed statement urging CJI to act against Udhayanidhi Stalin for remarks on Sanatan Dharma - Bar & Bench - Indian Legal News",
                    "description": "A letter has been addressed to Chief Justice of India (CJI) DY Chandrachud by 262 eminent persons including 14 retired High Court judges seeking suo motu action",
                    "url": "https://www.barandbench.com/news/these-judges-signed-statement-urging-cji-act-udhayanidhi-stalin-sanatan-dharma",
                    "urlToImage": "https://gumlet.assettype.com/barandbench%2F2023-09%2F9f144163-b947-4bad-a3a0-2d6d0f12fc56%2FBOMBAY__WEB_PAGE_1600x900__rrr_copy.jpg?w=1200&auto=format%2Ccompress&ogImage=true&enlarge=true",
                    "publishedAt": "2023-09-05T09:20:53Z",
                    "content": "The controversial remarks that triggered the letter were made by Stalin at a press conference, where the Dravida Munnetra Kazhagam (DMK) leader commented that Sanatan Dharma should be eradicated. \r\nF… [+366 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Thewire.in"
                    },
                    "author": "Snigdhendu Bhattacharya",
                    "title": "How Scientists Meghnad Saha, J.V. Narlikar Rubbished Claim of Vedic Roots of Modern Science - The Wire Science",
                    "description": "Saha, and later Narlikar, studied Sanskrit texts and debunked claims that are now being popularised by the linked of ISRO helmsman S. Somanath.",
                    "url": "https://science.thewire.in/the-sciences/how-scientists-meghnad-saha-j-v-narlikar-rubbished-claim-of-vedic-roots-of-modern-science/",
                    "urlToImage": "https://cdn.thewire.in/wp-content/uploads/2023/09/05143349/SB-collage.jpg",
                    "publishedAt": "2023-09-05T09:07:00Z",
                    "content": "(L-R) Meghnad Saha, S. Somanath and J.V. Narlikar. Photos: Wikimedia Commons\r\nKolkata: Indian Space Research Organisation (ISRO) helmsman S. Somanaths recent comments claiming Vedic roots to modern s… [+9592 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "NDTV News"
                    },
                    "author": null,
                    "title": "Amitabh Bachchan's \"Bharat Mata\" Post Divides Internet After G20 Invite Sparks Buzz - NDTV",
                    "description": "An online post by superstar Amitabh Bachchan's divided the internet today with social media users linking it to the latest political row over a G20 dinner invite.",
                    "url": "https://www.ndtv.com/india-news/amitabh-bachchans-bharat-mata-post-divides-internet-after-g20-invite-sparks-buzz-4361129",
                    "urlToImage": "https://c.ndtvimg.com/2023-08/35rtjv3_amitabh-bachchan_625x300_26_August_23.jpg",
                    "publishedAt": "2023-09-05T08:59:58Z",
                    "content": "\"Bharat Maata Ki Jai,\" Amitabh Bachchan posted on X.\r\nMumbai: An online post by superstar Amitabh Bachchan's divided the internet today with social media users linking it to the latest political row … [+1458 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Livemint"
                    },
                    "author": "Livemint",
                    "title": "Global Fintech Fest: FM Sitharaman asks financial entities to ensure customers nominate heirs | Mint - Mint",
                    "description": "Finance Minister asks banks and financial entities to encourage customers to nominate heirs to reduce unclaimed money.",
                    "url": "https://www.livemint.com/industry/banking/global-fintech-fest-in-mumbai-fm-nirmala-sitharaman-asks-financial-entities-to-ensure-customers-nominate-heirs-11693899478462.html",
                    "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/Nirmala_Sitharaman_1693899982340_1693899996608.jpg",
                    "publishedAt": "2023-09-05T08:10:42Z",
                    "content": "Union Finance Minister Nirmala Sitharaman on Tuesday asked banks and other financial entities to ensure that their customers nominate hiers which can help reduce the quantum of unclaimed money. Finan… [+2190 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "PINKVILLA"
                    },
                    "author": "Anushka Solanki",
                    "title": "'Are they together or not?: Fans confused after Kylie Jenner and Timothée Chalamet appear at Beyonce's Renaissance tour - PINKVILLA",
                    "description": "Kylie Jenner And Timothée Chalamet Certainly Turned Heads When These Two Announced That They Were Dating. And Now, The Two Made Their First Pubic Appearance At Beyonce's Show",
                    "url": "https://www.pinkvilla.com/entertainment/hollywood/are-they-together-or-not-fans-confused-after-kylie-jenner-and-timothee-chalamet-appear-at-beyonces-renaissance-tour-1241031",
                    "urlToImage": "https://www.pinkvilla.com/images/2023-09/1562762335_kylie-and-timothee-1.jpg",
                    "publishedAt": "2023-09-05T07:52:10Z",
                    "content": "Amid all the breakup rumors, Kylie Jenner and Timothée Chalemet hit back with the biggest surprise. Well, with Beyoncé performing from city to city, there have been quite a lot of significant celebri… [+2095 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Livemint"
                    },
                    "author": "Karishma Pranav Bhavsar",
                    "title": "Bharat vs India: G20 dinner invite stirs debate with mention of ‘President of Bharat’ | Mint - Mint",
                    "description": "BJP sparks controversy by using 'Bharat' instead of 'India' in G20 summit dinner invites, leading to opposition backlash.",
                    "url": "https://www.livemint.com/politics/news/bjp-vs-india-bloc-g20-dinner-invite-stirs-debate-as-bharat-replaces-india-11693897872121.html",
                    "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/INDIA_alliance_1693548995505_1693897894091.jpg",
                    "publishedAt": "2023-09-05T07:50:26Z",
                    "content": "The BJP has been attacking the new opposition bloc INDIA (Indian National Developmental Inclusive Alliance) by repeatedly declaring that the name 'India' is a remnant of a colonial past. Now, a fresh… [+4322 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "YouTube"
                    },
                    "author": null,
                    "title": "New Covid variant 'Pirola' sparks alarm in many countries | WION Newspoint - WION",
                    "description": "An article published in the Yale Medicine Review on August 31 has noted the rise of Covid-19 infections in multiple countries, driven by a new Coronavirus va...",
                    "url": "https://www.youtube.com/watch?v=0YPvSLbKmHI",
                    "urlToImage": "https://i.ytimg.com/vi/0YPvSLbKmHI/maxresdefault.jpg",
                    "publishedAt": "2023-09-05T07:43:36Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "The Indian Express"
                    },
                    "author": "Express Web Desk",
                    "title": "Bypolls 2023 Live Updates: Voting underway in 6 states; 26% votes polled in Kerala’s Puthupally; 40.5% turnout in Tripura’s Boxanagar till 11 am - The Indian Express",
                    "description": "Bypolls 2023 Today Live Updates: The bypolls at Dumri in Jharkhand, Puthuppally in Kerala, Boxanagar and Dhanpur in Tripura, Bageshwar in Uttarakhand, Ghosi in Uttar Pradesh, and Dhupguri in West Bengal began at 7 am. The counting of votes will take place on …",
                    "url": "https://indianexpress.com/article/india/bypolls-2023-live-updates-voting-india-bloc-jharkhand-tripura-kerala-bengal-uttarakhand-uttar-pradesh-8924867/",
                    "urlToImage": "https://images.indianexpress.com/2023/09/tripura-bypoll.jpg",
                    "publishedAt": "2023-09-05T07:41:13Z",
                    "content": "Bypolls LIVE: Amid allegations of violence and fake voting, Tripuras Dhanpur and Boxanagar saw a voter turnout of 81.34% and 85.52%, respectively. (Express photo by Debraj Deb)Bypolls In Six States T… [+1428 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Livemint"
                    },
                    "author": "Shashank Mattoo",
                    "title": "Mint Explainer: Why did Xi Jinping decide to skip the G20 Summit in New Delhi? | Mint - Mint",
                    "description": "The move has been seen by some analysts as a snub aimed at India, especially since the Chinese President did attend the BRICS Summit in South Africa just weeks ago",
                    "url": "https://www.livemint.com/politics/mint-explainer-xi-decides-to-skip-the-g20-summit-in-new-delhi-11693897802637.html",
                    "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/G20-SUMMIT-PREVIEW-0_1693877186059_1693897971687.JPG",
                    "publishedAt": "2023-09-05T07:17:46Z",
                    "content": "Chinas foreign ministry has announced that Premier Li Qiang, not President Xi Jinping, will represent China at the G20 Leaders Summit in New Delhi on September 9 and 10. This comes just weeks after X… [+2378 chars]"
                },
                {
                    "source": {
                        "id": "reuters",
                        "name": "Reuters"
                    },
                    "author": "Stephen Nellis",
                    "title": "Qualcomm to supply BMW and Mercedes with chips for displays, voice features - Reuters",
                    "description": "U.S. semiconductor company Qualcomm <a href=\"https://www.reuters.com/markets/companies/QCOM.O\" target=\"_blank\">(QCOM.O)</a> on Tuesday said it will supply chips to power in-car infotainment systems to luxury automakers Mercedes <a href=\"https://www.reuters.co…",
                    "url": "https://www.reuters.com/business/autos-transportation/qualcomm-supply-bmw-mercedes-with-chips-displays-voice-features-2023-09-05/",
                    "urlToImage": "https://www.reuters.com/resizer/od1wRqwFAMw2t9DrM5OcgMUEnxQ=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/WEKWG6KYFVL3TL3LXFST2475DY.jpg",
                    "publishedAt": "2023-09-05T07:13:40Z",
                    "content": "SAN FRANCISCO/MUNICH, Sept 5 (Reuters) - U.S. semiconductor company Qualcomm (QCOM.O) on Tuesday said it will supply chips to power in-car infotainment systems to luxury automakers Mercedes (MBGn.DE)… [+1790 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "DAWN.com"
                    },
                    "author": "AFP",
                    "title": "2 held after using excavator to dig hole in Great Wall of China - DAWN.com",
                    "description": "State media says suspects admitted they used a digger to create a shortcut in the wall in a bid to reduce local travel time.",
                    "url": "https://www.dawn.com",
                    "urlToImage": "https://i.dawn.com/large/2023/09/05121004609bd43.jpg?r=121043",
                    "publishedAt": "2023-09-05T07:11:45Z",
                    "content": "Two people have been detained after using an excavator to dig a hole in the Great Wall of China, state broadcaster CCTV said.\r\nPolice in Shanxi province followed tracks made by machinery used to dig … [+1174 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Livemint"
                    },
                    "author": "Livemint",
                    "title": "Apple's future iPhone lineup: iPhone 16 Ultra may feature Vision Pro's 3D capturing | Mint - Mint",
                    "description": "Rumors suggest that the upcoming iPhone Ultra models may incorporate Vision Pro's 3D capture technology, enhancing the user experience.",
                    "url": "https://www.livemint.com/technology/gadgets/apples-future-iphone-lineup-iphone-16-ultra-may-feature-vision-pros-3d-capturing-11693891345335.html",
                    "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/AFP_1NP7HM_1579664517272_1693892112885.jpg",
                    "publishedAt": "2023-09-05T05:35:41Z",
                    "content": "Apple's iPhone 16 series is already generating buzz, with rumors suggesting the existence of an iPhone 15 Ultra. While the iPhone 15's Vision Pro features might not materialize, leaks hint at 3D capt… [+2011 chars]"
                }
            ]
        },

        business: {
            "status": "ok",
                "totalResults": 70,
                "articles": [
                    {
                        "source": {
                            "id": null,
                            "name": "CarToq.com"
                        },
                        "author": "Ajeesh Kuttan, Vikas Kaul",
                        "title": "Tata Nexon EV Facelift: New teaser video released before launch - CarToq.com",
                        "description": "empty",
                        "url": "https://www.cartoq.com/tata-nexon-ev-facelift-new-teaser-video-released-before-launch/",
                        "urlToImage": "https://www.cartoq.com/wp-content/uploads/2023/09/tata-nexon-ev-teaser-featured.jpg",
                        "publishedAt": "2023-09-05T11:42:46Z",
                        "content": "Tata is one of the leading car manufacturers in the country, known for its build quality. Tata is also a leading electric car manufacturer in India now, currently offering the Nexon, Tigor, and Tiago… [+2950 chars]"
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "CNBCTV18"
                        },
                        "author": "Yash Jain",
                        "title": "SEBI may implement one-hour settlement of trades by March 2024, instantaneous settlement by Oct 2024 - CNBCTV18",
                        "description": "These proposed changes signify a major shift in the Indian stock market landscape, with an emphasis on reducing settlement times and enhancing investor convenience.",
                        "url": "https://www.cnbctv18.com/market/stocks/sebi-to-implement-one-hour-settlement-of-trades-by-march-2024-instantaneous-by-oct-2024-17722631.htm",
                        "urlToImage": "https://images.cnbctv18.com/wp-content/uploads/2023/02/Stock-markets-exchange-data-960x573.jpg",
                        "publishedAt": "2023-09-05T10:33:04Z",
                        "content": "empty"
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "Entrackr"
                        },
                        "author": "Entrackr",
                        "title": "Pepperfry names new CEO, raises $23 Mn in recent funding - Entrackr",
                        "description": null,
                        "url": "https://entrackr.com/2023/09/pepperfry-names-new-ceo-raises-23-mn-in-recent-funding/",
                        "urlToImage": null,
                        "publishedAt": "2023-09-05T10:06:49Z",
                        "content": null
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "Moneycontrol"
                        },
                        "author": "Sunil Shankar Matkar",
                        "title": "Ratnaveer Precision Engineering IPO | Issue subscribed 21.8 times on day 2 - Moneycontrol",
                        "description": "The stainless steel-based products manufacturer aims to mop up Rs 165.03 crore via public offering, at the upper price band.",
                        "url": "https://www.moneycontrol.com/news/business/ipo/ratnaveer-precision-engineering-ipo-day-2-investors-bought-15-88-times-the-issue-size-11314921.html",
                        "urlToImage": "https://images.moneycontrol.com/static-mcnews/2021/08/bearnings-1-770x433.jpg",
                        "publishedAt": "2023-09-05T09:37:46Z",
                        "content": "Ratnaveer Precision Engineering IPO remained on investors' radar as they put in bids for 25.69 crore equity shares, which were 21.8 times the issue size of 1.17 crore on September 5, the second day o… [+1639 chars]"
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "Livemint"
                        },
                        "author": "Fareha Naaz",
                        "title": "Dunzo delays salary further, opts for batch payments amid fundraising challenges | Mint - Mint",
                        "description": "Dunzo, a Bengaluru-based grocery delivery startup, is facing delays in salary disbursements and will pay in batches due to fundraising challenges.",
                        "url": "https://www.livemint.com/companies/dunzo-delays-salary-further-opts-for-batch-payments-amid-fundraising-challenges-11693896792860.html",
                        "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/Dunzo-had-last-raised--240-million-in-January-_1680760752267_1693903091322.jpg",
                        "publishedAt": "2023-09-05T09:23:32Z",
                        "content": "Dunzo, Bengaluru-based a quick grocery delivery service start-up backed by Reliance and Google, is facing delays in salary disbursements due to fundraising challenges, has opted to pay salaries in ba… [+2177 chars]"
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "Business Standard"
                        },
                        "author": "Business Standard",
                        "title": "These two PSU stocks have zoomed 50% in last three days on heavy volumes - Business Standard",
                        "description": null,
                        "url": "https://www.business-standard.com/markets/news/this-2-psu-stocks-has-zoomed-50-in-past-three-trading-days-on-heavy-volume-123090500577_1.html",
                        "urlToImage": null,
                        "publishedAt": "2023-09-05T09:19:42Z",
                        "content": null
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "YouTube"
                        },
                        "author": null,
                        "title": "2023 Royal Enfield Bullet 350 Review | Too Similar To The Classic 350? | BikeWale - BikeWale",
                        "description": "We have tested the new Royal Enfield Bullet 350, and came away quite impressed with its performance. With the 2023 update, the new Bullet 350 has became quit...",
                        "url": "https://www.youtube.com/watch?v=uFMJYt2SjU4",
                        "urlToImage": "https://i.ytimg.com/vi/uFMJYt2SjU4/maxresdefault.jpg",
                        "publishedAt": "2023-09-05T08:50:48Z",
                        "content": null
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "Business Standard"
                        },
                        "author": "Business Standard",
                        "title": "Cyient surges 140% so far in CY23; Cyient DLM zooms 179% over issue price - Business Standard",
                        "description": null,
                        "url": "https://www.business-standard.com/markets/news/cyient-surges-140-so-far-in-cy23-cyient-dlm-zooms-179-over-issue-price-123090500470_1.html",
                        "urlToImage": null,
                        "publishedAt": "2023-09-05T08:11:26Z",
                        "content": null
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "Livemint"
                        },
                        "author": "Livemint",
                        "title": "Global Fintech Fest: FM Sitharaman asks financial entities to ensure customers nominate heirs | Mint - Mint",
                        "description": "Finance Minister asks banks and financial entities to encourage customers to nominate heirs to reduce unclaimed money.",
                        "url": "https://www.livemint.com/industry/banking/global-fintech-fest-in-mumbai-fm-nirmala-sitharaman-asks-financial-entities-to-ensure-customers-nominate-heirs-11693899478462.html",
                        "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/Nirmala_Sitharaman_1693899982340_1693899996608.jpg",
                        "publishedAt": "2023-09-05T08:10:42Z",
                        "content": "Union Finance Minister Nirmala Sitharaman on Tuesday asked banks and other financial entities to ensure that their customers nominate hiers which can help reduce the quantum of unclaimed money. Finan… [+2190 chars]"
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "News18"
                        },
                        "author": "Aparna Deb",
                        "title": "IDBI Bank Shares Rally 7% To Hit 5-Year High Today; Here's Why Is It Rising - News18",
                        "description": "In the past two trading days, the stock has rallied 16 per cent as the government invited bids to appoint an asset valuer for IDBI Bank's divestment.",
                        "url": "https://www.news18.com/business/markets/idbi-bank-shares-rally-7-to-hit-5-year-high-today-heres-why-is-it-rising-8564609.html",
                        "urlToImage": "https://images.news18.com/ibnlive/uploads/2023/04/idbi-bank-168138216616x9.jpg",
                        "publishedAt": "2023-09-05T07:55:48Z",
                        "content": "Shares of IDBI Bank rose 7.86 per cent to Rs 70 apiece to hit the highest level in more than five years on the BSE in Tuesdays intra-day trade. The stock hit its highest level since April 2018, on th… [+2604 chars]"
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "Zee Business"
                        },
                        "author": "ZeeBiz WebTeam",
                        "title": "Raymond has given 100% returns in 1 year; analysts suggest buying the stock, say valuations compelling - Zee Business",
                        "description": "Raymond share price: In the opening deals, the stock hit an all-time high level of Rs 2,151.20 on the BSE.",
                        "url": "https://www.zeebiz.com/markets/stocks/news-raymond-share-price-nse-bse-sensex-nifty-jefferies-motilal-oswal-initiate-coverage-buy-252077",
                        "urlToImage": "https://cdn.zeebiz.com/sites/default/files/2023/09/05/259204-raymond-1.jpg",
                        "publishedAt": "2023-09-05T07:51:24Z",
                        "content": "Raymond share price: Shares of Raymond, the established apparel brand in India, hit a record high on Tuesday (September 5), after global brokerage Jefferies and domestic broking firm Motilal Oswal Se… [+3772 chars]"
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "Moneycontrol"
                        },
                        "author": "Dipti Sharma",
                        "title": "More steam left in rail stocks; RVNL, Railtel rally over 20% in one week - Moneycontrol",
                        "description": "Shares of Rail Vikas Nigam Ltd (RVNL), Titagarh Rail Systems, Jupiter Wagons, Texmaco Rail and Engineering, IRCTC, Railtel Corporation of India and RITES have risen 5-24 percent in the past one week.",
                        "url": "https://www.moneycontrol.com/news/business/markets/rail-stocks-chug-into-bull-zone-rvnl-railtel-gain-over-20-in-one-week-11313551.html",
                        "urlToImage": "https://images.moneycontrol.com/static-mcnews/2023/08/Konkan-Railway-Sharavati-Bridge.jpg",
                        "publishedAt": "2023-09-05T07:36:43Z",
                        "content": "Railway stocks have seen a significant upswing over the past week, indicating a renewed sense of optimism in the sector. Despite the recent run-up, some market participants are worried that railway s… [+2890 chars]"
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "CNBCTV18"
                        },
                        "author": "https://www.cnbctv18.com",
                        "title": "Stock Market LIVE Update: Nifty 50 eases gains, Infosys leads, HDFC Bank drags - CNBCTV18",
                        "description": "Stock Market LIVE Updates: The final hour of trade has begun and Nifty 50 is showing some recovery. It has crossed the 19,550 mark and is inching towards 19,600. Sensex too is showing recovery, trading above 65,700. Nifty Bank is hovering around 44,500. Cyien…",
                        "url": "https://www.cnbctv18.com/market/stock-market-live-update-nifty-50-key-levels-sensex-today-banks-irfc-rvnl-cipla-hero-iex-shares-17717611.htm",
                        "urlToImage": "https://images.cnbctv18.com/wp-content/uploads/2023/08/markets-live-blog-2-1019x573.jpg",
                        "publishedAt": "2023-09-05T07:28:57Z",
                        "content": "Stock Market LIVE Updates | Nifty 50 At 19,549.45\r\nFinancials, auto, power, cement and telecom stocks are contributing towards Nifty50's downside, while FMCG, Oil and Gas, IT, capital goods and pharm… [+39 chars]"
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "Moneycontrol"
                        },
                        "author": "Moneycontrol News",
                        "title": "Reliance Jio offers extra data, special benefits and more on its 7th anniversary - Moneycontrol",
                        "description": "These offers will be valid on Rs 299, Rs 749 and Rs 2999 plans, the company said.",
                        "url": "https://www.moneycontrol.com/news/business/reliance-jio-offers-extra-data-special-benefits-and-more-on-its-7th-anniversary-11313951.html",
                        "urlToImage": "https://images.moneycontrol.com/static-mcnews/2023/01/Jio-770x433.png",
                        "publishedAt": "2023-09-05T07:23:29Z",
                        "content": "As part of its 7th anniversary celebration, Reliance Jio is offering extra data and vouchers on recharges done between September 5-30.\r\nThese offers will be valid on Rs 299, Rs 749 and Rs 2999 plans,… [+1432 chars]"
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "Livemint"
                        },
                        "author": "Krishna Yadav",
                        "title": "NCLT asks SpiceJet to resolve issues with lessors | Mint - Mint",
                        "description": "On Monday, SpiceJet said it will allot 48.1 million shares on a preferential basis to nine of its aircraft lessors to clear dues worth  ₹231 crore",
                        "url": "https://www.livemint.com/companies/news/nclt-asks-spicejet-to-resolve-issues-with-lessors-11693897415604.html",
                        "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/SPICEJET-RESULTS--0_1692861718098_1693898502579.JPG",
                        "publishedAt": "2023-09-05T07:22:17Z",
                        "content": "New Delhi: The National Company Law Tribunal on Tuesday asked SpiceJet to resolve its issues with lessors, while hearing the insolvency plea filed by Celestial Aviation. The court, which also verball… [+1878 chars]"
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "YouTube"
                        },
                        "author": null,
                        "title": "George Soros who attacks Modi govt is no global supervillain, but he can't buy a better world - ThePrint",
                        "description": "Ever since he took on Prime Minister Narendra Modi and the Adanis, hedge-fund billionaire George Soros has been cast as an enemy of India. The truth is more ...",
                        "url": "https://www.youtube.com/watch?v=Z1GwwHZlNj4",
                        "urlToImage": "https://i.ytimg.com/vi/Z1GwwHZlNj4/maxresdefault.jpg",
                        "publishedAt": "2023-09-05T07:16:48Z",
                        "content": null
                    },
                    {
                        "source": {
                            "id": "reuters",
                            "name": "Reuters"
                        },
                        "author": "Stephen Nellis",
                        "title": "Qualcomm to supply BMW and Mercedes with chips for displays, voice features - Reuters",
                        "description": "U.S. semiconductor company Qualcomm <a href=\"https://www.reuters.com/markets/companies/QCOM.O\" target=\"_blank\">(QCOM.O)</a> on Tuesday said it will supply chips to power in-car infotainment systems to luxury automakers Mercedes <a href=\"https://www.reuters.co…",
                        "url": "https://www.reuters.com/business/autos-transportation/qualcomm-supply-bmw-mercedes-with-chips-displays-voice-features-2023-09-05/",
                        "urlToImage": "https://www.reuters.com/resizer/od1wRqwFAMw2t9DrM5OcgMUEnxQ=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/WEKWG6KYFVL3TL3LXFST2475DY.jpg",
                        "publishedAt": "2023-09-05T07:13:40Z",
                        "content": "SAN FRANCISCO/MUNICH, Sept 5 (Reuters) - U.S. semiconductor company Qualcomm (QCOM.O) on Tuesday said it will supply chips to power in-car infotainment systems to luxury automakers Mercedes (MBGn.DE)… [+1790 chars]"
                    },
                    {
                        "source": {
                            "id": null,
                            "name": "Dsij.in"
                        },
                        "author": "Vaishnavi Chauhan",
                        "title": "Stock below Rs 100: Highest block deals witnessed; stock jumps more than 30 per cent in just 2 days! - Dalal Street Investment Journal",
                        "description": "These block deals reflect a surge in investor interest in MMTC Ltd, and the substantial trading volumes could potentially influence the stock's performance in the market.",
                        "url": "https://www.dsij.in/dsijarticledetail/stock-below-rs-100-highest-block-deals-witnessed-stock-jumps-more-than-30-per-cent-in-just-2-days-33028-1",
                        "urlToImage": "https://www.dsij.in/Portals/0/EasyDNNnews/33028/image_3126.jpg",
                        "publishedAt": "2023-09-05T07:11:24Z",
                        "content": "This stock has seen remarkable buying activity, surging over 239 per cent in the last three years.\r\nMMTC Limited is a government-owned enterprise established in 1963 plays a pivotal role in India's f… [+3152 chars]"
                    },
                    {
                        "source": {
                            "id": "the-times-of-india",
                            "name": "The Times of India"
                        },
                        "author": "TIMESOFINDIA.COM",
                        "title": "Nifty could gain 1,000 points in September; 20,432 on the cards: JM Financial - Times of India",
                        "description": "India Business News: The brokerage identifies Punjab National Bank (PNB), Hindalco, LTI Mindtree, GAIL, and ONGC as the ‘thrust’ stocks.",
                        "url": "https://timesofindia.indiatimes.com/business/india-business/nifty-could-gain-1000-points-in-september-20432-on-the-cards-jm-financial/articleshow/103381762.cms",
                        "urlToImage": "https://static.toiimg.com/thumb/msid-103382365,width-1070,height-580,imgsize-8030,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
                        "publishedAt": "2023-09-05T06:44:00Z",
                        "content": "FD Calculator\r\nWhen investing in a fixed deposit, the amount you deposit earns interest as per the prevailing...\r\nCalculate Now"
                    },
                    {
                        "source": {
                            "id": "techcrunch",
                            "name": "TechCrunch"
                        },
                        "author": "Manish Singh",
                        "title": "Telecom companies in India want tech firms to pay for network usage - TechCrunch",
                        "description": "Telecom operators in India, the second largest wireless market, would like internet companies to compensate for using their networks, a recommendation Telecom operators in India are urging internet companies to compensate for using their networks, a recommend…",
                        "url": "https://techcrunch.com/2023/09/04/telecom-operators-in-india-want-tech-companies-to-pay-for-network-usage/",
                        "urlToImage": "https://techcrunch.com/wp-content/uploads/2020/05/GettyImages-1203053789.jpg?resize=1200,777",
                        "publishedAt": "2023-09-05T06:30:25Z",
                        "content": "Telecom operators in India, the second largest wireless market, would like internet companies to compensate for using their networks, a recommendation they’ve made to the local regulatory body, echoi… [+5493 chars]"
                    }
                ]
            },

        entertainment: {
            "status": "ok",
            "totalResults": 70,
            "articles": [
                {
                    "source": {
                        "id": null,
                        "name": "PINKVILLA"
                    },
                    "author": "Harshika Bhatia",
                    "title": "Anupamaa written update, September 5: Anupamaa confronts Adhik about framing Romil - PINKVILLA",
                    "description": "Anupamaa Written Update 5th September, Anupamaa Consoles Romil, Pakhi Shouts At Anupamaa, And Anuj Finds The Truth About Adhik Framing Romil.",
                    "url": "https://www.pinkvilla.com/tv/news/anupamaa-written-update-september-5-anupamaa-confronts-adhik-about-framing-romil-1241149",
                    "urlToImage": "https://www.pinkvilla.com/images/2023-09/399368346_fotojet-2023-09-05t172025-122-1.jpg",
                    "publishedAt": "2023-09-05T11:54:44Z",
                    "content": "After the fight, everyone exits from the hall. Adhik takes a moment to confront Romil, warning him that he narrowly avoided jail this time, but there's no guarantee he won't end up there soon. Romil … [+3362 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Hindustan Times"
                    },
                    "author": "HT Entertainment Desk",
                    "title": "Fukrey 3 trailer: Richa Chadha fights it out with Pulkit Samrat and gang. Watch - Hindustan Times",
                    "description": "Fukrey 3 trailer: Richa Chadha, Pulkit Samrat, Pankaj Tripathi, Varun Sharma and Manjot Singh are back with the latest film in the hit franchise.  | Bollywood",
                    "url": "https://www.hindustantimes.com/entertainment/bollywood/fukrey-3-trailer-richa-chadha-wants-her-old-life-back-but-pulkit-samrat-and-gang-go-all-out-to-fight-her-in-elections-101693889514510.html",
                    "urlToImage": "https://www.hindustantimes.com/ht-img/img/2023/09/05/1600x900/richa_1693912144217_1693912162225.png",
                    "publishedAt": "2023-09-05T11:16:28Z",
                    "content": "Six years after the second installment in the comedy film franchise, Fukrey 3 is finally set to hit the big screen. The Fukrey 3 trailer brought back the quirky group of Pulkit Samrat as Hunny, Manjo… [+1934 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Gulte"
                    },
                    "author": "B.H Prasad",
                    "title": "One Viral Song & Salaar Date; Will It Favour? - Gulte",
                    "description": "One sudden entrant into the September release fray is none other than short films to silver screen fame Kiran Abbavaram's \"Rules Ranjann\". As the young hero's previous films bitten dust majorly at the box office, there was no buzz around this movie until a vi…",
                    "url": "https://www.gulte.com/movienews/257659/one-viral-song-will-it-favour",
                    "urlToImage": "https://cdn.gulte.com/wp-content/uploads/2023/09/Rules-Ranjan-1.webp",
                    "publishedAt": "2023-09-05T10:44:13Z",
                    "content": "One sudden entrant into the September release fray is none other than short films to silver screen fame Kiran Abbavaram’s “Rules Ranjann”. As the young hero’s previous films bitten dust majorly at th… [+1129 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Hindustan Times"
                    },
                    "author": "HT Entertainment Desk",
                    "title": "Rashmika wins hearts as she attends her assistant’s wedding, pics go viral - Hindustan Times",
                    "description": "Rashmika Mandanna recently attended her assistant's wedding, which took place in Hyderabad. Many on social media praised the actor's 'beautiful' look.",
                    "url": "https://www.hindustantimes.com/entertainment/telugu-cinema/rashmika-mandanna-attends-assistant-wedding-viral-pics-video-101693908939275.html",
                    "urlToImage": "https://www.hindustantimes.com/ht-img/img/2023/09/05/1600x900/Rashmika_Mandanna_1693909785081_1693909815490.jpg",
                    "publishedAt": "2023-09-05T10:43:26Z",
                    "content": "Rashmika Mandanna stole the show with her simple look as she attended her assistant's wedding, which reportedly took place on Sunday. Rashmika's pictures from the recent festivities in Hyderabad are … [+2203 chars]"
                },
                {
                    "source": {
                        "id": "google-news",
                        "name": "Google News"
                    },
                    "author": "Hindustan Times",
                    "title": "Ameesha Patel says Sanjay Dutt wants to do her kanyadaan - Hindustan Times",
                    "description": null,
                    "url": "https://news.google.com/rss/articles/CBMipgFodHRwczovL3d3dy5oaW5kdXN0YW50aW1lcy5jb20vZW50ZXJ0YWlubWVudC9ib2xseXdvb2QvYW1lZXNoYS1wYXRlbC1zYXlzLXNhbmpheS1kdXR0LXdhbnRzLXRvLWRvLWhlci1rYW55YWRhYW4taGUtaXMtYWx3YXlzLXRyeWluZy10by1ob29rLW1lLXVwLTEwMTY5MzkwNjM0NjYzOS5odG1s0gGqAWh0dHBzOi8vd3d3LmhpbmR1c3RhbnRpbWVzLmNvbS9lbnRlcnRhaW5tZW50L2JvbGx5d29vZC9hbWVlc2hhLXBhdGVsLXNheXMtc2FuamF5LWR1dHQtd2FudHMtdG8tZG8taGVyLWthbnlhZGFhbi1oZS1pcy1hbHdheXMtdHJ5aW5nLXRvLWhvb2stbWUtdXAtMTAxNjkzOTA2MzQ2NjM5LWFtcC5odG1s?oc=5",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T10:00:13Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "Gulte"
                    },
                    "author": "Satya B",
                    "title": "800 Trailer: Greatness of Muralitharan & controversies - Gulte",
                    "description": "https://www.youtube.com/watch?v=iNp9cBWwcBE ‘800’, the biopic of iconic Sri Lankan cricketer Muttiah Muralitharan, is up for a grand theatrical release in Telugu, Tamil, Hindi, and English in the month of October. Its trailer is out. \"Are you a Tamilian or a …",
                    "url": "https://www.gulte.com/movienews/257580/800-trailer-greatness-of-muralitharan-controversies",
                    "urlToImage": "https://cdn.gulte.com/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-3.15.30-PM.jpg",
                    "publishedAt": "2023-09-05T09:54:17Z",
                    "content": "800, the biopic of iconic Sri Lankan cricketer Muttiah Muralitharan, is up for a grand theatrical release in Telugu, Tamil, Hindi, and English in the month of October. Its trailer is out.\r\n“Are you a… [+1038 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Bollywood Life"
                    },
                    "author": "Sanskruti Nemane",
                    "title": "Yeh Rishta Kya Kehlata Hai: How Harshad Chopda, Pranali Rathod aka Abhimanyu, Akshara changed and grew with e - Bollywood Life",
                    "description": "Harshad Chopda and Pranali Rathod's Yeh Rishta Kya Kehlata Hai is reportedly heading for a leap. Before the new story begins, here's a look at the changes that happened after the previous leaps in the show.",
                    "url": "https://www.bollywoodlife.com/tv/yeh-rishta-kya-kehlata-hai-how-harshad-chopda-pranali-rathod-aka-abhimanyu-akshara-changed-and-grew-with-each-leap-entertainment-news-tv-news-2581710/",
                    "urlToImage": "https://st1.bollywoodlife.com/wp-content/uploads/2023/09/Yeh-Rishta-Kya-Kehlata-Hai-9-600x315.jpg",
                    "publishedAt": "2023-09-05T09:46:27Z",
                    "content": "Rajan Shahis Yeh Rishta Kya Kehlata Hai is the longest running show on television. The first episode of the show aired on January 12, 2009. The story of the show began with Akshara and Naitiks love s… [+4649 chars]"
                },
                {
                    "source": {
                        "id": "google-news",
                        "name": "Google News"
                    },
                    "author": "Hindustan Times",
                    "title": "Step inside Esha Deol's massive Juhu bungalow with traditional dance room, lots of pics of Hema Malini and Dharmendra - Hindustan Times",
                    "description": null,
                    "url": "https://news.google.com/rss/articles/CBMimwFodHRwczovL3d3dy5oaW5kdXN0YW50aW1lcy5jb20vZW50ZXJ0YWlubWVudC9ib2xseXdvb2QvZXNoYS1kZW9sLW1hc3NpdmUtanVodS1ob21lLWhlbWEtbWFsaW5pLWRoYXJtZW5kcmEtaW5zaWRlLXBpY3MtaG91c2UtdG91ci12aWRlby0xMDE2OTM5MDM2ODMzMDQuaHRtbNIBAA?oc=5",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T09:17:12Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "NDTV News"
                    },
                    "author": null,
                    "title": "Jaane Jaan Trailer: The Curious Case Of Kareena Kapoor, Vijay Varma And Jaideep Ahlawat - NDTV Movies",
                    "description": "The Jaane Jaan mystery unravels on September 21",
                    "url": "https://www.ndtv.com/entertainment/jaane-jaan-trailer-the-curious-case-of-kareena-kapoor-vijay-varma-and-jaideep-ahlawat-4361066",
                    "urlToImage": "https://c.ndtvimg.com/2023-09/0bn9p8n8_jaane-jaan_625x300_05_September_23.jpg",
                    "publishedAt": "2023-09-05T08:41:23Z",
                    "content": "Jaane Jaan: A still from the trailer. (courtesy: YouTube)\r\nNew Delhi: Welcome to the the mysterious world of Maya D'Souza (played by Kareena Kapoor), whose life is changed after a knock on the door f… [+1656 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "123telugu.com"
                    },
                    "author": null,
                    "title": "Chiranjeevi reviews Anushka’s Miss Shetty Mr Polishetty - 123telugu",
                    "description": "Telugu cinema news, Telugu Movies Updates, Latest Movie reviews in Telugu, Telugu cinema reviews, telugu movie reviews, Tollywood, Box office collections, Telugu Movie show times, Theater List, telugu cinema tickets",
                    "url": "https://www.123telugu.com/mnews/chiranjeevi-reviews-anushkas-miss-shetty-mr-polishetty.html",
                    "urlToImage": "https://www.123telugu.com/content/wp-content/themes/123telugu/images/logo.gif",
                    "publishedAt": "2023-09-05T08:33:00Z",
                    "content": "Miss Shetty Mr. Polishetty is an upcoming pan-South movie featuring Anushka Shetty and Naveen Polishetty as the lead pair, with Mahesh Babu P directing. The film is set to release worldwide this Thur… [+913 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Koimoi"
                    },
                    "author": "Koimoi",
                    "title": "Shah Rukh Khan’s Jawan Set To Beat Adipurush’s 26.50 Crores Today, Let’s See Its Current Position In Films With Highest Advance Booking In Post-Covid Era Topped By KGF Chapter 2’s 80 Crores - Koimoi",
                    "description": null,
                    "url": "https://www.koimoi.com/box-office/shah-rukh-khans-jawan-set-to-beat-adipurushs-26-50-crores-today-lets-see-its-current-position-in-films-with-highest-advance-booking-in-post-covid-era-topped-by-kgf-chapter-2s-80-crores/",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T08:32:04Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "The Siasat Daily"
                    },
                    "author": "Rasti Amena",
                    "title": "Shah Rukh Khan's tweet on Tolichowki, Hyderabad goes viral - The Siasat Daily",
                    "description": "Hyderabad: Shah Rukh Khan aka King Khan of Bollywood, shares a special bond with Hyderabad, and this connection is well-known to his fans. He has always openly expressed his fondness for the city. For the unversed, SRK's mother, Lateef Fatima Khan, hailed fro…",
                    "url": "https://www.siasat.com/shah-rukh-khans-tweet-on-tolichowki-hyderabad-goes-viral-2686751/",
                    "urlToImage": "https://cdn.siasat.com/wp-content/uploads/2023/09/shah-rukh-khan-hyd.jpg",
                    "publishedAt": "2023-09-05T08:28:33Z",
                    "content": "Hyderabad: Shah Rukh Khan aka King Khan of Bollywood, shares a special bond with Hyderabad, and this connection is well-known to his fans. He has always openly expressed his fondness for the city.\r\nF… [+2177 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "PINKVILLA"
                    },
                    "author": "Yash Singh",
                    "title": "Gadar 2 star Ameesha Patel says THIS is the reason why she never worked with Sanjay Leela Bhansali and YRF - PINKVILLA",
                    "description": "Ameesha Patel Never Worked With Big Studios Or Directors In Her Long Career. Recently, She Revealed The Shocking Reason Behind It",
                    "url": "https://www.pinkvilla.com/entertainment/news/gadar-2-star-ameesha-patel-says-this-is-the-reason-why-she-never-worked-with-sanjay-leela-bhansali-and-yrf-1241039",
                    "urlToImage": "https://www.pinkvilla.com/images/2023-09/1327316245_ameesha-patel.jpg",
                    "publishedAt": "2023-09-05T08:16:26Z",
                    "content": "Ameesha Patel started out in Bollywood with Hrithik Roshan in Kaho Naa...Pyaar Hai. The film was a massive blockbuster and both Ameesha and Hrithik turned into overnight stars. However, things were n… [+2016 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "PINKVILLA"
                    },
                    "author": "Lubna Khan",
                    "title": "Ranbir Kapoor showers love on cousin Karisma Kapoor; Alia Bhatt is all smiles in PIC from New York vacay - PINKVILLA",
                    "description": "Alia Bhatt And Ranbir Kapoor Joined Karisma Kapoor In New York. Lolo Has Now Shared Pictures From Their Fun Night Out; Take A Look!",
                    "url": "https://www.pinkvilla.com/entertainment/news/ranbir-kapoor-showers-love-on-cousin-karisma-kapoor-alia-bhatt-is-all-smiles-in-pic-from-new-york-vacay-1241045",
                    "urlToImage": "https://www.pinkvilla.com/images/2023-09/1997286365_ranbir-kapoor-showers-love-on-cousin-karisma-kapoor-alia-bhatt-is-all-smiles-in-pic-from-new-york-v.jpg",
                    "publishedAt": "2023-09-05T07:52:33Z",
                    "content": "Alia Bhatt and Ranbir Kapoor are currently in New York with their daughter Raha. They took a break from work, and headed to New York for a vacay. Pictures of the Brahmastra couple posing with their f… [+1772 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "PINKVILLA"
                    },
                    "author": "Anushka Solanki",
                    "title": "'Are they together or not?: Fans confused after Kylie Jenner and Timothée Chalamet appear at Beyonce's Renaissance tour - PINKVILLA",
                    "description": "Kylie Jenner And Timothée Chalamet Certainly Turned Heads When These Two Announced That They Were Dating. And Now, The Two Made Their First Pubic Appearance At Beyonce's Show",
                    "url": "https://www.pinkvilla.com/entertainment/hollywood/are-they-together-or-not-fans-confused-after-kylie-jenner-and-timothee-chalamet-appear-at-beyonces-renaissance-tour-1241031",
                    "urlToImage": "https://www.pinkvilla.com/images/2023-09/1562762335_kylie-and-timothee-1.jpg",
                    "publishedAt": "2023-09-05T07:52:10Z",
                    "content": "Amid all the breakup rumors, Kylie Jenner and Timothée Chalemet hit back with the biggest surprise. Well, with Beyoncé performing from city to city, there have been quite a lot of significant celebri… [+2095 chars]"
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TIMESOFINDIA.COM",
                    "title": "Sunny Deol's 'sanskari' son Rajveer Deol touches Shah Rukh Khan's feet to seek blessings, internet gets impressed with the gesture - Times of India",
                    "description": "The 'Gadar 2' success party was attended by Bollywood's elite, including the Khans and the Kapoors, who gathered to celebrate Sunny Deol and Ameesha Patel's achievement. While countless photographs and videos from the event have gone viral, one touch",
                    "url": "https://timesofindia.indiatimes.com/videos/etimes/bollywood/sunny-deols-sanskari-son-rajveer-deol-touches-shah-rukh-khans-feet-to-seek-blessings-internet-gets-impressed-with-the-gesture/videoshow/103385015.cms",
                    "urlToImage": "https://timesofindia.indiatimes.com/photo/msid-103385015,imgsize-34822.cms",
                    "publishedAt": "2023-09-05T07:47:22Z",
                    "content": "Sep 05, 2023, 06:54PM ISTSource: etimes.inThe 'Gadar 2' success party was attended by Bollywood's elite, including the Khans and the Kapoors, who gathered to celebrate Sunny Deol and Ameesha Patel's … [+245 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Hindustan Times"
                    },
                    "author": "HT Entertainment Desk",
                    "title": "Vicky Kaushal says dad Sham Kaushal cried to mom after being called 'just a stuntman' on film set - Hindustan Times",
                    "description": "Vicky Kaushal's father is stunt director Sham Kaushal. In a new interview, the actor recalled how Sham taught him not being ashamed of one's emotions. | Bollywood",
                    "url": "https://www.hindustantimes.com/entertainment/bollywood/vicky-kaushal-says-dad-sham-kaushal-cried-after-being-called-just-a-stuntman-on-film-set-101693897866884.html",
                    "urlToImage": "https://www.hindustantimes.com/ht-img/img/2023/09/05/1600x900/vicky_kaushal_1693898164112_1693898164360.png",
                    "publishedAt": "2023-09-05T07:43:25Z",
                    "content": "Actor Vicky Kaushal has opened up about the healthy idea of masculinity his father Sham Kaushal taught him and his brother Sunny when they were young. In a new interview with We Are Yuvaa, Vicky ment… [+2073 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "123telugu.com"
                    },
                    "author": null,
                    "title": "Impressive: Recent Bollywood super hit selected for Busan Film Festival - 123telugu",
                    "description": "Telugu cinema news, Telugu Movies Updates, Latest Movie reviews in Telugu, Telugu cinema reviews, telugu movie reviews, Tollywood, Box office collections, Telugu Movie show times, Theater List, telugu cinema tickets",
                    "url": "https://www.123telugu.com/mnews/impressive-recent-bollywood-super-hit-selected-for-busan-film-festival.html",
                    "urlToImage": "https://www.123telugu.com/content/wp-content/themes/123telugu/images/logo.gif",
                    "publishedAt": "2023-09-05T07:33:00Z",
                    "content": "The recent Bollywood super hit Rocky Aur Rani Kii Prem Kahaani, starring Ranveer Singh and Alia Bhatt and directed by Karan Johar, is once again making headlines.\r\nThis romantic comedy has crossed th… [+854 chars]"
                },
                {
                    "source": {
                        "id": "google-news",
                        "name": "Google News"
                    },
                    "author": "Hindustan Times",
                    "title": "Nushrratt Bharuccha's floral anarkali is every ethnic lover's dream - Hindustan Times",
                    "description": null,
                    "url": "https://news.google.com/rss/articles/CBMihgFodHRwczovL3d3dy5oaW5kdXN0YW50aW1lcy5jb20vcGhvdG9zL2xpZmVzdHlsZS9udXNocnJhdHQtYmhhcnVjY2hhcy1mbG9yYWwtYW5hcmthbGktaXMtZXZlcnktZXRobmljLWxvdmVycy1kcmVhbS0xMDE2OTM4OTQ0ODQzNzYuaHRtbNIBigFodHRwczovL3d3dy5oaW5kdXN0YW50aW1lcy5jb20vcGhvdG9zL2xpZmVzdHlsZS9udXNocnJhdHQtYmhhcnVjY2hhcy1mbG9yYWwtYW5hcmthbGktaXMtZXZlcnktZXRobmljLWxvdmVycy1kcmVhbS0xMDE2OTM4OTQ0ODQzNzYtYW1wLmh0bWw?oc=5",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T07:31:39Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "The Indian Express"
                    },
                    "author": "The Indian Express",
                    "title": "‘Imtiaz Ali has spent more time with my daughter than I have’: Anurag Kashyap on life’s biggest regret, says ‘it’s too late to apologise’ - The Indian Express",
                    "description": null,
                    "url": "https://indianexpress.com/article/entertainment/bollywood/anurag-kashyap-biggest-regret-not-spending-time-daughter-aaliyah-8924949/",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T07:00:07Z",
                    "content": null
                }
            ]
        },

        general: {
            "status": "ok",
            "totalResults": 38,
            "articles": [
                {
                    "source": {
                        "id": null,
                        "name": "Hindustan Times"
                    },
                    "author": "HT Tech",
                    "title": "Asteroid 2020 GE to make close approach to Earth; Speed, size, proximity revealed by NASA - HT Tech",
                    "description": "NASA has revealed that a massive bus-size asteroid is on its way towards Earth and it will make a very close approach on September 8, 2023. It has been named Asteroid 2020 GE.",
                    "url": "https://tech.hindustantimes.com/photos/asteroid-2020-ge-to-make-close-approach-to-earth-speed-size-proximity-revealed-by-nasa-71693916084621.html",
                    "urlToImage": "https://images.hindustantimes.com/tech/img/2023/09/05/1600x900/5_1693479151047_1693916122092.jpg",
                    "publishedAt": "2023-09-05T12:18:06Z",
                    "content": "Top SectionsExplore Tech\r\nCopyright © HT Media Limited All rights reserved."
                },
                {
                    "source": {
                        "id": null,
                        "name": "NDTV News"
                    },
                    "author": "NDTV Sports Desk",
                    "title": "\"Concerns Related To Security, Economic Situation...\": Jay Shah On Why Asia Cup Was Moved Out Of Pa.. - NDTV Sports",
                    "description": "Jay Shah opened up about the decision taken by the Asian Cricket Council to move the Asia Cup 2023 out of Pakistan.",
                    "url": "https://sports.ndtv.com/asia-cup-2023/concerns-related-to-security-economic-situation-jay-shah-on-why-asia-cup-was-moved-out-of-pakistan-4361889",
                    "urlToImage": "https://c.ndtvimg.com/2022-10/5gn8prd_jay-shah-650_650x400_19_October_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675",
                    "publishedAt": "2023-09-05T11:52:08Z",
                    "content": "The Asia Cup 2023 was supposed to take place in Pakistan but the BCCI was not in favour of the arrangement and after extensive talks, a hybrid model was agreed upon where Pakistan would host four mat… [+2246 chars]"
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TOI Sports Desk",
                    "title": "'You have to make tough choices...': Who is saying what about India's ODI World Cup squad - Times of India",
                    "description": "Cricket News:  Waiting for an ICC trophy for more than a decade, India on Tuesday announced a 15-member squad led by skipper Rohit Sharma for the upcoming ICC ODI W",
                    "url": "https://timesofindia.indiatimes.com/sports/cricket/icc-world-cup/you-have-to-make-tough-choices-who-is-saying-what-about-indias-odi-world-cup-squad/articleshow/103394808.cms",
                    "urlToImage": "https://static.toiimg.com/thumb/msid-103395088,width-1070,height-580,imgsize-57328,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
                    "publishedAt": "2023-09-05T11:30:00Z",
                    "content": "Asia Cup: India, Pakistan blockbuster ends in no result\r\nasia-cup-rain-plays-spoilsport-as-india-pakistan-blockbuster-ends-in-no-result"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Hindustan Times"
                    },
                    "author": "HT Entertainment Desk",
                    "title": "Fukrey 3 trailer: Richa Chadha fights it out with Pulkit Samrat and gang. Watch - Hindustan Times",
                    "description": "Fukrey 3 trailer: Richa Chadha, Pulkit Samrat, Pankaj Tripathi, Varun Sharma and Manjot Singh are back with the latest film in the hit franchise.  | Bollywood",
                    "url": "https://www.hindustantimes.com/entertainment/bollywood/fukrey-3-trailer-richa-chadha-wants-her-old-life-back-but-pulkit-samrat-and-gang-go-all-out-to-fight-her-in-elections-101693889514510.html",
                    "urlToImage": "https://www.hindustantimes.com/ht-img/img/2023/09/05/1600x900/richa_1693912144217_1693912162225.png",
                    "publishedAt": "2023-09-05T11:16:28Z",
                    "content": "Six years after the second installment in the comedy film franchise, Fukrey 3 is finally set to hit the big screen. The Fukrey 3 trailer brought back the quirky group of Pulkit Samrat as Hunny, Manjo… [+1934 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Hindustan Times"
                    },
                    "author": "Aniruddha Dhar",
                    "title": "G20 Summit traffic FAQs: Will Delhi Metro remain shut? Will cars be allowed? - Hindustan Times",
                    "description": "G20 Summit traffic restrictions: The Delhi Police has issued a slew of curbs to ensure a smooth flow of traffic in the national capital. | Latest News India",
                    "url": "https://www.hindustantimes.com/india-news/g20-summit-traffic-faqs-will-delhi-metro-remain-closed-will-cars-be-allowed-101693907124624.html",
                    "urlToImage": "https://www.hindustantimes.com/ht-img/img/2023/09/05/1600x900/G20-Prep-5_1693910288293_1693910320830.jpg",
                    "publishedAt": "2023-09-05T10:40:51Z",
                    "content": "Come September 9 and 10, the world's top leaders will be gathering at Delhi's sprawling Pragati Maidan for the G20 Summit. To maintain foolproof security arrangements during the G20 Summit, the Delhi… [+5701 chars]"
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TIMESOFINDIA.COM",
                    "title": "Garena delays the launch of 'Free Fire India' - Times of India",
                    "description": "Singapore-based online games developer and publisher, Garena, has postponed the relaunch of the popular mobile game, Free Fire India. The company init",
                    "url": "https://timesofindia.indiatimes.com/gadgets-news/garena-delays-the-launch-of-free-fire-india/articleshow/103392541.cms",
                    "urlToImage": "https://static.toiimg.com/thumb/msid-103392513,width-1070,height-580,imgsize-547312,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
                    "publishedAt": "2023-09-05T10:36:00Z",
                    "content": "Boult launches Astra TWS earbuds: Price, Specs and more"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Livemint"
                    },
                    "author": "Shashank Mattoo",
                    "title": "Uncertainty over Joe Biden's participation in G20 summit | Mint - Mint",
                    "description": "First lady Jill Biden has tested positive for Covid-19, but there has been no comment thus far on what this means for the US President’s participation in the New Delhi G20 Summit this week",
                    "url": "https://www.livemint.com/news/india/uncertainty-over-joe-bidens-participation-in-g20-summit-11693909742125.html",
                    "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/AP06-22-2023-000303B-0_1687444128198_1693909877077.jpg",
                    "publishedAt": "2023-09-05T10:32:39Z",
                    "content": "A cloud of uncertainty seems to be looming over US President Joe Bidens participation in the upcoming G20 Summit, to be held on 9-10 September in New Delhi. This came after First Lady Jill Biden test… [+1666 chars]"
                },
                {
                    "source": {
                        "id": "espn-cric-info",
                        "name": "ESPN Cric Info"
                    },
                    "author": "Firdose Moonda",
                    "title": "De Kock to retire from ODIs after World Cup in India - ESPNcricinfo",
                    "description": "De Kock's availability for South Africa had also become an issue after he signed up for the BBL recently",
                    "url": "https://www.espncricinfo.com/story/quinton-de-kock-to-retire-from-odis-after-world-cup-in-india-1396382",
                    "urlToImage": "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/353400/353493.6.jpg",
                    "publishedAt": "2023-09-05T10:31:22Z",
                    "content": "NewsDe Kock's availability for South Africa had also become an issue after he signed up for the BBL recently\r\nFirdose Moonda is ESPNcricinfo's correspondent for South Africa and women's cricket"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Bar & Bench - Indian Legal News"
                    },
                    "author": "Debayan Roy",
                    "title": "These judges have signed statement urging CJI to act against Udhayanidhi Stalin for remarks on Sanatan Dharma - Bar & Bench - Indian Legal News",
                    "description": "A letter has been addressed to Chief Justice of India (CJI) DY Chandrachud by 262 eminent persons including 14 retired High Court judges seeking suo motu action",
                    "url": "https://www.barandbench.com/news/these-judges-signed-statement-urging-cji-act-udhayanidhi-stalin-sanatan-dharma",
                    "urlToImage": "https://gumlet.assettype.com/barandbench%2F2023-09%2F9f144163-b947-4bad-a3a0-2d6d0f12fc56%2FBOMBAY__WEB_PAGE_1600x900__rrr_copy.jpg?w=1200&auto=format%2Ccompress&ogImage=true&enlarge=true",
                    "publishedAt": "2023-09-05T09:20:53Z",
                    "content": "The controversial remarks that triggered the letter were made by Stalin at a press conference, where the Dravida Munnetra Kazhagam (DMK) leader commented that Sanatan Dharma should be eradicated. \r\nF… [+366 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Thewire.in"
                    },
                    "author": "Snigdhendu Bhattacharya",
                    "title": "How Scientists Meghnad Saha, J.V. Narlikar Rubbished Claim of Vedic Roots of Modern Science - The Wire Science",
                    "description": "Saha, and later Narlikar, studied Sanskrit texts and debunked claims that are now being popularised by the linked of ISRO helmsman S. Somanath.",
                    "url": "https://science.thewire.in/the-sciences/how-scientists-meghnad-saha-j-v-narlikar-rubbished-claim-of-vedic-roots-of-modern-science/",
                    "urlToImage": "https://cdn.thewire.in/wp-content/uploads/2023/09/05143349/SB-collage.jpg",
                    "publishedAt": "2023-09-05T09:07:00Z",
                    "content": "(L-R) Meghnad Saha, S. Somanath and J.V. Narlikar. Photos: Wikimedia Commons\r\nKolkata: Indian Space Research Organisation (ISRO) helmsman S. Somanaths recent comments claiming Vedic roots to modern s… [+9592 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "NDTV News"
                    },
                    "author": null,
                    "title": "Amitabh Bachchan's \"Bharat Mata\" Post Divides Internet After G20 Invite Sparks Buzz - NDTV",
                    "description": "An online post by superstar Amitabh Bachchan's divided the internet today with social media users linking it to the latest political row over a G20 dinner invite.",
                    "url": "https://www.ndtv.com/india-news/amitabh-bachchans-bharat-mata-post-divides-internet-after-g20-invite-sparks-buzz-4361129",
                    "urlToImage": "https://c.ndtvimg.com/2023-08/35rtjv3_amitabh-bachchan_625x300_26_August_23.jpg",
                    "publishedAt": "2023-09-05T08:59:58Z",
                    "content": "\"Bharat Maata Ki Jai,\" Amitabh Bachchan posted on X.\r\nMumbai: An online post by superstar Amitabh Bachchan's divided the internet today with social media users linking it to the latest political row … [+1458 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Livemint"
                    },
                    "author": "Livemint",
                    "title": "Global Fintech Fest: FM Sitharaman asks financial entities to ensure customers nominate heirs | Mint - Mint",
                    "description": "Finance Minister asks banks and financial entities to encourage customers to nominate heirs to reduce unclaimed money.",
                    "url": "https://www.livemint.com/industry/banking/global-fintech-fest-in-mumbai-fm-nirmala-sitharaman-asks-financial-entities-to-ensure-customers-nominate-heirs-11693899478462.html",
                    "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/Nirmala_Sitharaman_1693899982340_1693899996608.jpg",
                    "publishedAt": "2023-09-05T08:10:42Z",
                    "content": "Union Finance Minister Nirmala Sitharaman on Tuesday asked banks and other financial entities to ensure that their customers nominate hiers which can help reduce the quantum of unclaimed money. Finan… [+2190 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "PINKVILLA"
                    },
                    "author": "Anushka Solanki",
                    "title": "'Are they together or not?: Fans confused after Kylie Jenner and Timothée Chalamet appear at Beyonce's Renaissance tour - PINKVILLA",
                    "description": "Kylie Jenner And Timothée Chalamet Certainly Turned Heads When These Two Announced That They Were Dating. And Now, The Two Made Their First Pubic Appearance At Beyonce's Show",
                    "url": "https://www.pinkvilla.com/entertainment/hollywood/are-they-together-or-not-fans-confused-after-kylie-jenner-and-timothee-chalamet-appear-at-beyonces-renaissance-tour-1241031",
                    "urlToImage": "https://www.pinkvilla.com/images/2023-09/1562762335_kylie-and-timothee-1.jpg",
                    "publishedAt": "2023-09-05T07:52:10Z",
                    "content": "Amid all the breakup rumors, Kylie Jenner and Timothée Chalemet hit back with the biggest surprise. Well, with Beyoncé performing from city to city, there have been quite a lot of significant celebri… [+2095 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Livemint"
                    },
                    "author": "Karishma Pranav Bhavsar",
                    "title": "Bharat vs India: G20 dinner invite stirs debate with mention of ‘President of Bharat’ | Mint - Mint",
                    "description": "BJP sparks controversy by using 'Bharat' instead of 'India' in G20 summit dinner invites, leading to opposition backlash.",
                    "url": "https://www.livemint.com/politics/news/bjp-vs-india-bloc-g20-dinner-invite-stirs-debate-as-bharat-replaces-india-11693897872121.html",
                    "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/INDIA_alliance_1693548995505_1693897894091.jpg",
                    "publishedAt": "2023-09-05T07:50:26Z",
                    "content": "The BJP has been attacking the new opposition bloc INDIA (Indian National Developmental Inclusive Alliance) by repeatedly declaring that the name 'India' is a remnant of a colonial past. Now, a fresh… [+4322 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "YouTube"
                    },
                    "author": null,
                    "title": "New Covid variant 'Pirola' sparks alarm in many countries | WION Newspoint - WION",
                    "description": "An article published in the Yale Medicine Review on August 31 has noted the rise of Covid-19 infections in multiple countries, driven by a new Coronavirus va...",
                    "url": "https://www.youtube.com/watch?v=0YPvSLbKmHI",
                    "urlToImage": "https://i.ytimg.com/vi/0YPvSLbKmHI/maxresdefault.jpg",
                    "publishedAt": "2023-09-05T07:43:36Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "The Indian Express"
                    },
                    "author": "Express Web Desk",
                    "title": "Bypolls 2023 Live Updates: Voting underway in 6 states; 26% votes polled in Kerala’s Puthupally; 40.5% turnout in Tripura’s Boxanagar till 11 am - The Indian Express",
                    "description": "Bypolls 2023 Today Live Updates: The bypolls at Dumri in Jharkhand, Puthuppally in Kerala, Boxanagar and Dhanpur in Tripura, Bageshwar in Uttarakhand, Ghosi in Uttar Pradesh, and Dhupguri in West Bengal began at 7 am. The counting of votes will take place on …",
                    "url": "https://indianexpress.com/article/india/bypolls-2023-live-updates-voting-india-bloc-jharkhand-tripura-kerala-bengal-uttarakhand-uttar-pradesh-8924867/",
                    "urlToImage": "https://images.indianexpress.com/2023/09/tripura-bypoll.jpg",
                    "publishedAt": "2023-09-05T07:41:13Z",
                    "content": "Bypolls LIVE: Amid allegations of violence and fake voting, Tripuras Dhanpur and Boxanagar saw a voter turnout of 81.34% and 85.52%, respectively. (Express photo by Debraj Deb)Bypolls In Six States T… [+1428 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Livemint"
                    },
                    "author": "Shashank Mattoo",
                    "title": "Mint Explainer: Why did Xi Jinping decide to skip the G20 Summit in New Delhi? | Mint - Mint",
                    "description": "The move has been seen by some analysts as a snub aimed at India, especially since the Chinese President did attend the BRICS Summit in South Africa just weeks ago",
                    "url": "https://www.livemint.com/politics/mint-explainer-xi-decides-to-skip-the-g20-summit-in-new-delhi-11693897802637.html",
                    "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/G20-SUMMIT-PREVIEW-0_1693877186059_1693897971687.JPG",
                    "publishedAt": "2023-09-05T07:17:46Z",
                    "content": "Chinas foreign ministry has announced that Premier Li Qiang, not President Xi Jinping, will represent China at the G20 Leaders Summit in New Delhi on September 9 and 10. This comes just weeks after X… [+2378 chars]"
                },
                {
                    "source": {
                        "id": "reuters",
                        "name": "Reuters"
                    },
                    "author": "Stephen Nellis",
                    "title": "Qualcomm to supply BMW and Mercedes with chips for displays, voice features - Reuters",
                    "description": "U.S. semiconductor company Qualcomm <a href=\"https://www.reuters.com/markets/companies/QCOM.O\" target=\"_blank\">(QCOM.O)</a> on Tuesday said it will supply chips to power in-car infotainment systems to luxury automakers Mercedes <a href=\"https://www.reuters.co…",
                    "url": "https://www.reuters.com/business/autos-transportation/qualcomm-supply-bmw-mercedes-with-chips-displays-voice-features-2023-09-05/",
                    "urlToImage": "https://www.reuters.com/resizer/od1wRqwFAMw2t9DrM5OcgMUEnxQ=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/WEKWG6KYFVL3TL3LXFST2475DY.jpg",
                    "publishedAt": "2023-09-05T07:13:40Z",
                    "content": "SAN FRANCISCO/MUNICH, Sept 5 (Reuters) - U.S. semiconductor company Qualcomm (QCOM.O) on Tuesday said it will supply chips to power in-car infotainment systems to luxury automakers Mercedes (MBGn.DE)… [+1790 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "DAWN.com"
                    },
                    "author": "AFP",
                    "title": "2 held after using excavator to dig hole in Great Wall of China - DAWN.com",
                    "description": "State media says suspects admitted they used a digger to create a shortcut in the wall in a bid to reduce local travel time.",
                    "url": "https://www.dawn.com",
                    "urlToImage": "https://i.dawn.com/large/2023/09/05121004609bd43.jpg?r=121043",
                    "publishedAt": "2023-09-05T07:11:45Z",
                    "content": "Two people have been detained after using an excavator to dig a hole in the Great Wall of China, state broadcaster CCTV said.\r\nPolice in Shanxi province followed tracks made by machinery used to dig … [+1174 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Livemint"
                    },
                    "author": "Livemint",
                    "title": "Apple's future iPhone lineup: iPhone 16 Ultra may feature Vision Pro's 3D capturing | Mint - Mint",
                    "description": "Rumors suggest that the upcoming iPhone Ultra models may incorporate Vision Pro's 3D capture technology, enhancing the user experience.",
                    "url": "https://www.livemint.com/technology/gadgets/apples-future-iphone-lineup-iphone-16-ultra-may-feature-vision-pros-3d-capturing-11693891345335.html",
                    "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/AFP_1NP7HM_1579664517272_1693892112885.jpg",
                    "publishedAt": "2023-09-05T05:35:41Z",
                    "content": "Apple's iPhone 16 series is already generating buzz, with rumors suggesting the existence of an iPhone 15 Ultra. While the iPhone 15's Vision Pro features might not materialize, leaks hint at 3D capt… [+2011 chars]"
                }
            ]
        },

        health: {
            "status": "ok",
            "totalResults": 70,
            "articles": [
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TIMESOFINDIA.COM",
                    "title": "Head, neck cancer: New genes that make patients resistant to chemotherapy identified - Times of India",
                    "description": "Chemoresistance in cancer refers to the phenomenon where cancer cells become resistant to the effects of chemotherapy drugs. Chemotherapy is a common",
                    "url": "https://timesofindia.indiatimes.com/life-style/health-fitness/health-news/head-neck-cancer-new-genes-that-make-patients-resistant-to-chemotherapy-identified/articleshow/103395100.cms",
                    "urlToImage": "https://static.toiimg.com/thumb/msid-103395106,width-1070,height-580,imgsize-1219418,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
                    "publishedAt": "2023-09-05T12:30:00Z",
                    "content": "Job insecurity, low wages are risk factors for premature death, finds studyIts the same as saying that the risk of early death is higher if one keeps working in jobs without a secure employment contr… [+171 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Cureus.com"
                    },
                    "author": null,
                    "title": "Dengue and Hypokalemic Paralysis: A Rare Association - Cureus",
                    "description": "Dengue is one of the most common mosquito-borne viral illnesses in tropical areas, including Pakistan. Presentation varies from a self-limiting flu-like illness to life-threatening conditions like hemorrhagic shock and multi-organ dysfunction leading to death…",
                    "url": "https://www.cureus.com/articles/134261-dengue-and-hypokalemic-paralysis-a-rare-association",
                    "urlToImage": "https://assets.cureus.com/uploads/figure/file/539794/article_river_2f3ca4a0961011eda2bb59bfba73025a-screenshot.png",
                    "publishedAt": "2023-09-05T12:20:32Z",
                    "content": "Enter your email address to receive your free PDF download.\r\nPlease note that by doing so you agree to be added to our monthly email newsletter distribution list."
                },
                {
                    "source": {
                        "id": null,
                        "name": "YouTube"
                    },
                    "author": null,
                    "title": "Prostate cancer signs and screening recommendations - WFAA",
                    "description": "Multiple factors can play into when men should start getting screened for prostate cancer.",
                    "url": "https://www.youtube.com/watch?v=Jbip03ckBYc",
                    "urlToImage": "https://i.ytimg.com/vi/Jbip03ckBYc/hqdefault.jpg",
                    "publishedAt": "2023-09-05T12:10:36Z",
                    "content": null
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "ET HealthWorld",
                    "title": "1 in 3 men worldwide are infected with genital HPV: Lancet - ETHealthWorld",
                    "description": "Almost one in three men over the age of 15 are infected with at least one genital human papillomavirus (HPV) type, according to a new study published in The Lancet Global Health.",
                    "url": "https://health.economictimes.indiatimes.com/news/diagnostics/1-in-3-men-worldwide-are-infected-with-genital-hpv-lancet/103395339",
                    "urlToImage": "https://etimg.etb2bimg.com/thumb/msid-103395339,imgsize-78492,width-1200,height=765,overlay-ethealth/diagnostics/1-in-3-men-worldwide-are-infected-with-genital-hpv-lancet.jpg",
                    "publishedAt": "2023-09-05T11:40:38Z",
                    "content": "Geneva: Almost one in three men over the age of 15 are infected with at least one genital human papillomavirus (HPV) type, according to a new study published in The Lancet Global Health.The findings … [+1934 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Etvbharat.com"
                    },
                    "author": "ETV Bharat",
                    "title": "Dengue cases are on the rise in parts of the country; Karnataka, Bihar, and Uttarakhand among the affected states - ETV Bharat",
                    "description": "There has been a surge of cases of dengue in the some states of the country, including Bihar and Karnataka. Dengue cases have also increased in Jharkhand.",
                    "url": "https://www.etvbharat.com/english/bharat/dengue-cases-on-the-rise-in-parts-of-country-updates/na20230905170752917917589",
                    "urlToImage": "https://etvbharatimages.akamaized.net/etvbharat/prod-images/05-09-2023/1200-675-19436731-418-19436731-1693912483572.jpg",
                    "publishedAt": "2023-09-05T11:37:54Z",
                    "content": "Hyderabad: There is a surge of dengue cases in the some parts of the country. The cases have increased in Karnataka, particularly its capital and in Bihar. There has been surge in cases in Uttarakhan… [+4167 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "CNBCTV18"
                    },
                    "author": "PTI",
                    "title": "Indian study debunks heart attack risk linked to COVID-19 vaccines - CNBCTV18",
                    "description": "A recent observational study conducted at GB Pant Hospital in Delhi, India, found no association between COVID-19 vaccines (Covishield and Covaxin) and an increased risk of heart attacks.",
                    "url": "https://www.cnbctv18.com/healthcare/heart-attack-risk-covid-19-vaccine-indian-study-gb-pant-hospital-coronavirus-17723841.htm",
                    "urlToImage": "https://images.cnbctv18.com/wp-content/uploads/2021/01/covaxin-1019x573.jpg",
                    "publishedAt": "2023-09-05T11:32:28Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "WION"
                    },
                    "author": "Kirtika Katira",
                    "title": "9 Tips and Tricks to Maintain a Healthy Thyroid - WION",
                    "description": "9 Tips and Tricks to Maintain a Healthy Thyroid",
                    "url": "https://www.wionews.com/web-stories/entertainment/lifestyle/9-tips-and-tricks-to-maintain-a-healthy-thyroid-1693912902009",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T11:30:12Z",
                    "content": "Optimal Diet: Nurture your thyroid health with a balanced diet that includes whole foods, lean proteins, healthy fats, and a colourful array of fruits and vegetables. Prioritise foods rich in iodine,… [+55 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "WION"
                    },
                    "author": "Kirtika Katira",
                    "title": "Discover the Marvels of Papaya: It's Not Just Sweet But Healthy Too - WION",
                    "description": "Discover the Marvels of Papaya: It's Not Just Sweet But Healthy Too",
                    "url": "https://www.wionews.com/web-stories/entertainment/lifestyle/discover-the-marvels-of-papaya-its-not-just-sweet-but-healthy-too-1693912368114",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T11:20:40Z",
                    "content": "The benefits are not confined to its luscious pulp; its leaves boast a plethora of healing properties. Among its impressive attributes, the leaves shine as champions for bolstering platelet count and… [+43 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Moneycontrol"
                    },
                    "author": "Namita S Kalla",
                    "title": "What to eat: A low-fat diet is good for weight loss and heart health, but only if you make the right choices - Moneycontrol",
                    "description": "A low-fat diet will help you lose weight, keep heart healthy and reduces risk of cancer. Here's why  you must include fruits, vegetables, lean proteins, and whole grains, and avoid saturated and trans fats, sugary foods, and processed snacks for overall healt…",
                    "url": "https://www.moneycontrol.com/news/health-and-fitness/what-to-eat-a-low-fat-diet-is-good-for-weight-loss-and-heart-health-but-only-if-you-make-the-right-choices-11315151.html",
                    "urlToImage": "https://images.moneycontrol.com/static-mcnews/2023/09/Benefits-of-whole-grains-770x433.jpg",
                    "publishedAt": "2023-09-05T11:18:43Z",
                    "content": "The surge in lifestyle-related ailments, such as weight issues, heart problems and cancer, often stems from dietary choices. Familiarising with the world of low-fat diets can be a game-changer for yo… [+4296 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "News-Medical.Net"
                    },
                    "author": null,
                    "title": "What is Carney Complex? - News-Medical.Net",
                    "description": "Carney complex (CNC) is a rare familial lentiginosis syndrome caused due to mutations in the PRKAR1A gene.",
                    "url": "https://www.news-medical.net/health/What-is-Carney-Complex.aspx",
                    "urlToImage": "https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_23835_16939116718445229.jpg",
                    "publishedAt": "2023-09-05T10:51:00Z",
                    "content": "Causes and symptomsProtein kinase A (PKA)EpidemiologyDiagnosis and treatmentReferencesFurther reading\r\nCarney complex (CNC) is a rare familial lentiginosis syndrome caused due to mutations in the PRK… [+7761 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "India.com"
                    },
                    "author": "Tanya Dutt",
                    "title": "High Blood Sugar: Understanding Pomegranate`s Role In Diabetes Management- Check Pros And Cons - Zee News",
                    "description": "Is this vibrant fruit a friend or foe? This article will delve into the pros and cons of incorporating pomegranate into a diabetic diet to help individuals make informed choices for their health. Nutritional Facts of Pomegranate - The pomegranate is a good so…",
                    "url": "https://zeenews.india.com/health/high-blood-sugar-understanding-pomegranates-role-in-diabetes-management-check-pros-and-cons-2658178",
                    "urlToImage": "https://english.cdn.zeenews.com/sites/default/files/2023/09/05/1275534-pomegranate-diabetes.png",
                    "publishedAt": "2023-09-05T09:49:46Z",
                    "content": "Patients with diabetes have always been flooded with dietary recommendations. A diabetic is constantly aware of what they eat. A diabetic must avoid refined sugar and carbohydrates in their diet. The… [+2853 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "[Removed]"
                    },
                    "author": null,
                    "title": "[Removed]",
                    "description": "[Removed]",
                    "url": "https://removed.com",
                    "urlToImage": null,
                    "publishedAt": "1970-01-01T00:00:00Z",
                    "content": "[Removed]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "The Indian Express"
                    },
                    "author": "The Indian Express",
                    "title": "What’s causing cancer in those under 50? How early should we start screening? New study raises red flags - The Indian Express",
                    "description": null,
                    "url": "https://indianexpress.com/article/health-wellness/cancer-under-50-screening-study-8925601/",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T09:23:11Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "Etvbharat.com"
                    },
                    "author": "ETV Bharat",
                    "title": "Study reveals why men, wealthy people are more likely to develop skin cancer - ETV Bharat",
                    "description": "The researchers compared UV exposure and behaviors among different groups in Atlantic Canada based on income, education, and gender, among other factors.",
                    "url": "https://www.etvbharat.com/english/sukhibhava/sukhibhava-news/men-and-wealthy-people-are-more-likely-to-develop-skin-cancer/na20230905142842591591514",
                    "urlToImage": "https://etvbharatimages.akamaized.net/etvbharat/prod-images/05-09-2023/1200-675-19435146-56-19435146-1693904194358.jpg",
                    "publishedAt": "2023-09-05T08:58:44Z",
                    "content": "Washington DC: A new study sponsored by McGill University investigates why persons living in Atlantic regions are more likely to develop melanoma than other Canadians, providing lessons on skin cance… [+4076 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "India.com"
                    },
                    "author": "Shawn Dass",
                    "title": "10 Easy Weight Loss Tips If You're Lazy - India.com",
                    "description": "If you're someone who prefers a more relaxed approach to weight loss, here are 10 easy tips that can help you shed those extra pounds without putting in too much effort.",
                    "url": "https://www.india.com/webstories/health/10-easy-weight-loss-tips-if-youre-lazy-6291619/",
                    "urlToImage": "https://static.india.com/wp-content/uploads/2023/09/10-Easy-Weight-Loss-Tips-If-Youre-Lazy.png",
                    "publishedAt": "2023-09-05T08:43:32Z",
                    "content": "1. Eating in small portions and avoiding unhealthy foods can help you loose weight.\r\n2. Adding Lentils to your diet can give you the sensation of eating less. Pulses like chickpeas are a great source… [+944 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Cureus.com"
                    },
                    "author": null,
                    "title": "Clinicopathological Profile of Appendicular Disease in Children: A Tertiary Health Care Center Study - Cureus",
                    "description": "Background\r\n\r\nAcute appendicitis (AA) is the most common surgical emergency worldwide. Delay in diagnosis of disease often leads to serious complications such as perforation appendicitis (PA) and gangrenous appendicitis (GA).\r\n\r\nAims and objectives\r\n\r\nThe pur…",
                    "url": "https://www.cureus.com/articles/182205-clinicopathological-profile-of-appendicular-disease-in-children-a-tertiary-health-care-center-study",
                    "urlToImage": "https://assets.cureus.com/uploads/figure/file/720328/article_river_c438bac03a9e11eeaf8dcd9328844cd5-Final-image-1-2.png",
                    "publishedAt": "2023-09-05T08:40:30Z",
                    "content": "Enter your email address to receive your free PDF download.\r\nPlease note that by doing so you agree to be added to our monthly email newsletter distribution list."
                },
                {
                    "source": {
                        "id": "google-news",
                        "name": "Google News"
                    },
                    "author": "DNA India",
                    "title": "7 Japanese techniques to overcome laziness7 Japanese techniques to overcome laziness - DNA India",
                    "description": null,
                    "url": "https://news.google.com/rss/articles/CBMiZ2h0dHBzOi8vd3d3LmRuYWluZGlhLmNvbS93ZWItc3Rvcmllcy9saWZlc3R5bGUvNy1qYXBhbmVzZS10ZWNobmlxdWVzLXRvLW92ZXJjb21lLWxhemluZXNzLTE2OTM4OTk1ODE5ODfSAWdodHRwczovL3d3dy5kbmFpbmRpYS5jb20vd2ViLXN0b3JpZXMvbGlmZXN0eWxlLzctamFwYW5lc2UtdGVjaG5pcXVlcy10by1vdmVyY29tZS1sYXppbmVzcy0xNjkzODk5NTgxOTg3?oc=5",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T08:05:02Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "India.com"
                    },
                    "author": "Tanya Dutt",
                    "title": "Sudden Hunger Pangs? 7 Healthy Tips To Keep Your Appetite In Check When On A Weight Loss Diet - Zee News",
                    "description": "Healthy Diet: 4 Must-Have Weight Loss Snacks To Add To Your Grocery List Today! 3. Choose High-Fiber Foods Fiber-rich foods like whole grains, fruits, and vegetables can keep you feeling full for longer. Incorporating these into your meals can help you manage…",
                    "url": "https://zeenews.india.com/health/sudden-hunger-pangs-7-healthy-tips-to-keep-your-appetite-in-check-when-on-a-weight-loss-diet-2658113",
                    "urlToImage": "https://english.cdn.zeenews.com/sites/default/files/2023/09/05/1275347-binge-hunger.png",
                    "publishedAt": "2023-09-05T08:03:39Z",
                    "content": "Hunger pangs are a common challenge when striving for a healthy diet, but they can be managed with these smart tips. By practicing mindful eating, staying hydrated, and making wise food choices, you … [+2461 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "YouTube"
                    },
                    "author": null,
                    "title": "New Covid variant 'Pirola' sparks alarm in many countries | WION Newspoint - WION",
                    "description": "An article published in the Yale Medicine Review on August 31 has noted the rise of Covid-19 infections in multiple countries, driven by a new Coronavirus va...",
                    "url": "https://www.youtube.com/watch?v=0YPvSLbKmHI",
                    "urlToImage": "https://i.ytimg.com/vi/0YPvSLbKmHI/maxresdefault.jpg",
                    "publishedAt": "2023-09-05T07:43:36Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "The Weather Channel"
                    },
                    "author": "The Weather Channel",
                    "title": "China's Mutating Avian Flu Virus Raises Pandemic Concerns, Warns Study | Weather.com - The Weather Channel",
                    "description": "Using laboratory mice and ferrets as models for human infection, the study found that the H3N8 avian influenza virus (AIV) has undergone several adaptive changes to cause severe animal infections making it transmissible by the airborne route.",
                    "url": "https://weather.com/en-IN/india/health/news/2023-09-05-chinas-mutating-avian-flu-virus-raises-pandemic-concerns-warns-study",
                    "urlToImage": "https://s.w-x.co/in-bird%20flu.jpg",
                    "publishedAt": "2023-09-05T07:31:38Z",
                    "content": "A subtype of avian flu virus, endemic in poultry farms in China, is undergoing mutational changes, which could increase the risk of the disease being passed on to humans, warns a study.\r\nResearchers … [+3025 chars]"
                }
            ]
        },

        science: {
            "status": "ok",
            "totalResults": 46,
            "articles": [
                {
                    "source": {
                        "id": null,
                        "name": "Hindustan Times"
                    },
                    "author": "HT Tech",
                    "title": "Asteroid 2020 GE to make close approach to Earth; Speed, size, proximity revealed by NASA - HT Tech",
                    "description": "NASA has revealed that a massive bus-size asteroid is on its way towards Earth and it will make a very close approach on September 8, 2023. It has been named Asteroid 2020 GE.",
                    "url": "https://tech.hindustantimes.com/photos/asteroid-2020-ge-to-make-close-approach-to-earth-speed-size-proximity-revealed-by-nasa-71693916084621.html",
                    "urlToImage": "https://images.hindustantimes.com/tech/img/2023/09/05/1600x900/5_1693479151047_1693916122092.jpg",
                    "publishedAt": "2023-09-05T12:18:06Z",
                    "content": "Top SectionsExplore Tech\r\nCopyright © HT Media Limited All rights reserved."
                },
                {
                    "source": {
                        "id": null,
                        "name": "YouTube"
                    },
                    "author": null,
                    "title": "Lab grown muscles for rehab | The Royal Society - The Royal Society",
                    "description": "Roma Agrawal and Fran Scott meet rehabilitation experts at the Summer Science Exhibition 2023 to find out what axolotls can teach us about rehabilitation and...",
                    "url": "https://www.youtube.com/watch?v=51TUW_a4TvM",
                    "urlToImage": "https://i.ytimg.com/vi/51TUW_a4TvM/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGB8gQyh_MA8=&rs=AOn4CLBAYYxKvA2hzfm_afDtvWOFqMsTBQ",
                    "publishedAt": "2023-09-05T10:00:06Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "YouTube"
                    },
                    "author": null,
                    "title": "Rare blue supermoon dazzles stargazers around the world - AP Archive",
                    "description": "(31 Aug 2023) RESTRICTION SUMMARY:ASSOCIATED PRESSCape Sounion, Greece - 30 August 20231. STILL of supermoon rising behind the ancient temple of PoseidonHEAD...",
                    "url": "https://www.youtube.com/watch?v=xzc1MU5iRZ0",
                    "urlToImage": "https://i.ytimg.com/vi/xzc1MU5iRZ0/maxresdefault.jpg",
                    "publishedAt": "2023-09-05T09:46:28Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "Thewire.in"
                    },
                    "author": "Snigdhendu Bhattacharya",
                    "title": "How Scientists Meghnad Saha, J.V. Narlikar Rubbished Claim of Vedic Roots of Modern Science - The Wire Science",
                    "description": "Saha, and later Narlikar, studied Sanskrit texts and debunked claims that are now being popularised by the linked of ISRO helmsman S. Somanath.",
                    "url": "https://science.thewire.in/the-sciences/how-scientists-meghnad-saha-j-v-narlikar-rubbished-claim-of-vedic-roots-of-modern-science/",
                    "urlToImage": "https://cdn.thewire.in/wp-content/uploads/2023/09/05143349/SB-collage.jpg",
                    "publishedAt": "2023-09-05T09:07:00Z",
                    "content": "(L-R) Meghnad Saha, S. Somanath and J.V. Narlikar. Photos: Wikimedia Commons\r\nKolkata: Indian Space Research Organisation (ISRO) helmsman S. Somanaths recent comments claiming Vedic roots to modern s… [+9592 chars]"
                },
                {
                    "source": {
                        "id": "google-news",
                        "name": "Google News"
                    },
                    "author": "India Today",
                    "title": "When climate change wiped out nearly 99% of our human ancestors - India Today",
                    "description": null,
                    "url": "https://news.google.com/rss/articles/CBMieWh0dHBzOi8vd3d3LmluZGlhdG9kYXkuaW4vc2NpZW5jZS9zdG9yeS93aGVuLWNsaW1hdGUtY2hhbmdlLXdpcGVkLW91dC1uZWFybHktOTktb2Ytb3VyLWh1bWFuLWFuY2VzdG9ycy0yNDMxMjQ0LTIwMjMtMDktMDXSAX1odHRwczovL3d3dy5pbmRpYXRvZGF5LmluL2FtcC9zY2llbmNlL3N0b3J5L3doZW4tY2xpbWF0ZS1jaGFuZ2Utd2lwZWQtb3V0LW5lYXJseS05OS1vZi1vdXItaHVtYW4tYW5jZXN0b3JzLTI0MzEyNDQtMjAyMy0wOS0wNQ?oc=5",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T09:06:04Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "NDTV News"
                    },
                    "author": null,
                    "title": "Mysterious Earth-Like Planet Hiding In The Solar System, Says Study - NDTV",
                    "description": "According to scientists, the possibility exists that an Earth-like planet may be concealed within the Kuiper Belt.",
                    "url": "https://www.ndtv.com/science/mysterious-earth-like-planet-hiding-in-the-solar-system-says-study-4361091",
                    "urlToImage": "https://c.ndtvimg.com/2023-09/d9cv08r_earthlike-planet-solar-system-study-solar-system-planet-nine_625x300_05_September_23.jpg",
                    "publishedAt": "2023-09-05T08:48:30Z",
                    "content": "This potential new planet would be estimated to be 1.5 to 3 times the size of Earth.\r\nThe search for Earth-like planets is a fundamental aspect of astronomy and planetary science. Scientists are high… [+1738 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "NDTV News"
                    },
                    "author": null,
                    "title": "Video Captures The Moment NASA Astronauts Splash Down On Earth After 6 Months In Space - NDTV",
                    "description": "The astronauts splashed down safely in a SpaceX Dragon spacecraft off the coast of Jacksonville, Florida early Monday morning.",
                    "url": "https://www.ndtv.com/world-news/video-captures-the-moment-nasa-astronauts-splash-down-on-earth-after-6-months-in-space-4360860",
                    "urlToImage": "https://c.ndtvimg.com/2023-09/j89rkc2o_nasas-crew6-astronauts-_625x300_05_September_23.jpg",
                    "publishedAt": "2023-09-05T07:52:02Z",
                    "content": "The international crew of four spent a total of 186 days in orbit.\r\nAn international crew of four astronauts safely returned to Earth on Monday after a successful six-month stay on the International … [+2258 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "India Today"
                    },
                    "author": "India Today Science Desk",
                    "title": "Webb Telescope looks at star explosion in deep space that was first seen in 1987 - India Today",
                    "description": "The images reveal a central structure resembling a keyhole, filled with clumpy gas and dust ejected by the supernova explosion.",
                    "url": "https://www.indiatoday.in/science/story/webb-telescope-looks-at-star-explosion-in-deep-space-that-was-first-seen-in-1987-2431184-2023-09-05",
                    "urlToImage": "https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/supernova-053525-16x9.jpg?VersionId=YqJ7waT39Jay.bnIsZhRdCwUDNb.YfdA",
                    "publishedAt": "2023-09-05T07:44:22Z",
                    "content": "Nasa's James Webb Space Telescope (JWST) has begun a groundbreaking study of the renowned supernova, SN 1987A. \r\nLocated in the Large Magellanic Cloud, approximately 1,68,000 light-years from Earth, … [+2546 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Digital Trends"
                    },
                    "author": "Trevor Mogg",
                    "title": "Watch NASA’s cinematic trailer for its asteroid mission’s homecoming - Digital Trends",
                    "description": "Watch NASA's trailer highlighting its remarkable OSIRIS-REx mission that's about to drop off asteroid samples that it collected three years ago.",
                    "url": "https://www.digitaltrends.com/space/watch-nasas-trailer-for-the-climax-of-its-asteroid-mission/",
                    "urlToImage": "https://www.digitaltrends.com/wp-content/uploads/2020/09/9-2020_new_tag_beauty_shot_16x9_150_dpi_png_-_small1.jpg?resize=1200%2C630&p=1",
                    "publishedAt": "2023-09-05T06:55:37Z",
                    "content": "It’s seven years since NASA launched the OSIRIS-REx mission from Cape Canaveral in Florida, and in just a few weeks’ time all the hard work will culminate in a special delivery to Earth in the form o… [+1913 chars]"
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TIMESOFINDIA.COM",
                    "title": "Chandrayaan-3's Vikram lander detects lunar surface movements for the first time - Times of India",
                    "description": "Trending News: The Vikram lander of India's Chandrayaan-3 mission has detected seismic events on the lunar surface,",
                    "url": "https://timesofindia.indiatimes.com/etimes/trending/chandrayaan-3s-vikram-lander-detects-lunar-surface-movements-for-the-first-time/articleshow/103382839.cms",
                    "urlToImage": "https://static.toiimg.com/thumb/msid-103382996,width-1070,height-580,imgsize-470616,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
                    "publishedAt": "2023-09-05T06:30:00Z",
                    "content": "At the trailer launch event of their debut film \"Dono,\" veteran actor Dharmendra expressed his happiness for his grandson Rajveer Deol's entry into acting. He also extended his blessings to Rajveer a… [+329 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "ScienceAlert"
                    },
                    "author": "David Nield",
                    "title": "Scientists Slowed Down a Chemical Reaction 100 Billion Times to See What Happens - ScienceAlert",
                    "description": "Scientists have been able to observe a common interaction in quantum chemistry for the first time, by using a quantum computer to shadow the process at a speed 100 billion times slower than normal.",
                    "url": "https://www.sciencealert.com/scientists-slowed-down-a-chemical-reaction-100-billion-times-to-see-what-happens",
                    "urlToImage": "https://www.sciencealert.com/images/2023/08/CellSimulation.jpg",
                    "publishedAt": "2023-09-05T06:09:42Z",
                    "content": "Scientists have been able to observe a common interaction in quantum chemistry for the first time, by using a quantum computer to shadow the process at a speed 100 billion times slower than normal.\r\n… [+2945 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "[Removed]"
                    },
                    "author": null,
                    "title": "[Removed]",
                    "description": "[Removed]",
                    "url": "https://removed.com",
                    "urlToImage": null,
                    "publishedAt": "1970-01-01T00:00:00Z",
                    "content": "[Removed]"
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TIMESOFINDIA.COM",
                    "title": "'Vikram Lander sleeps on Lunar surface after successful Chandrayaan-3 experiment' says SAC Director at ISRO - Times of India",
                    "description": "On September 4th, the Vikram Lander, positioned over 100 meters away from the Shiv Shakti Point on the lunar surface, was placed into sleep mode at 8 AM IST. Director of Space Applications Centre (SAC) at ISRO, Nilesh M Desai, commended the mission,",
                    "url": "https://timesofindia.indiatimes.com/videos/news/vikram-lander-sleeps-on-lunar-surface-after-successful-chandrayaan-3-experiment-says-sac-director-at-isro/videoshow/103379579.cms",
                    "urlToImage": "https://timesofindia.indiatimes.com/photo/msid-103379579,imgsize-52271.cms",
                    "publishedAt": "2023-09-05T05:30:31Z",
                    "content": "Sep 05, 2023, 11:00AM ISTSource: ANI On September 4th, the Vikram Lander, positioned over 100 meters away from the Shiv Shakti Point on the lunar surface, was placed into sleep mode at 8 AM IST. Dire… [+485 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "The Weather Channel"
                    },
                    "author": "The Weather Channel",
                    "title": "Here Are Four Important Findings From Chandrayaan-3's Time on the Moon So Far! | Weather.com - The Weather Channel",
                    "description": "As Chandrayaan-3 modules shut down to face a freezing and long lunar night, let's look back at the wealth of discoveries its payloads have managed to unveil in its limited time on the Moon!",
                    "url": "https://weather.com/en-IN/india/space/news/2023-09-04-4-important-finds-chandrayaan-3-sulphur-vibrations",
                    "urlToImage": "https://s.w-x.co/in-chandrayaan_5.jpg",
                    "publishedAt": "2023-09-05T04:33:56Z",
                    "content": "It has been almost a fortnight since the successful soft landing of the Chandrayaan-3 Moon mission added another feather to India's space cap, and things could not be more on schedule! As the lunar s… [+4206 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "India Today"
                    },
                    "author": "Tiasa Bhowal",
                    "title": "Meteor lights up night sky green in Turkey. Watch videos - India Today",
                    "description": "A spectacular meteor was observed streaking across the night sky in Turkey, turning it green.",
                    "url": "https://www.indiatoday.in/trending-news/story/meteor-lights-up-night-sky-green-in-turkey-watch-videos-2431033-2023-09-05",
                    "urlToImage": "https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/meteor-lights-up-night-sky-green-in-turkey-052602-16x9.jpg?VersionId=UAFZypuORP_gTK7qIgQDOCJma6MBmjdy",
                    "publishedAt": "2023-09-05T03:31:08Z",
                    "content": "On Saturday evening, September 2, the night sky over Turkey transformed into a celestial spectacle. A meteor, blazing with brilliant green light, streaked across the heavens, captivating onlookers in… [+1285 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "The Indian Express"
                    },
                    "author": "Amitabh Sinha",
                    "title": "Japan moon mission to kick off on Sept 7, will take at least four months to reach Moon - The Indian Express",
                    "description": "This is the first Moon-landing attempt being made by the Japan Aerospace Exploration Agency",
                    "url": "https://indianexpress.com/article/technology/science/japan-moon-mission-date-details-8924863/",
                    "urlToImage": "https://images.indianexpress.com/2023/09/rover.jpg",
                    "publishedAt": "2023-09-05T02:13:56Z",
                    "content": "Japan, which had to put off the launch of its Moon mission in the last week of August because of bad weather, will now send its spacecraft on Thursday morning, hoping to emulate the success of Chandr… [+3048 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "ScienceAlert"
                    },
                    "author": "Clare Watson",
                    "title": "Scientists Discover 'Pure Math' Is Written Into Evolutionary Genetics - ScienceAlert",
                    "description": "Mathematicians delight in the beauty of math that so many of us don't see.",
                    "url": "https://www.sciencealert.com/scientists-discover-pure-math-is-written-into-evolutionary-genetics",
                    "urlToImage": "https://www.sciencealert.com/images/2023/08/AminoAcidSequenceFoldingIntoProtein.jpg",
                    "publishedAt": "2023-09-05T00:38:32Z",
                    "content": "Mathematicians delight in the beauty of math that so many of us don't see. But nature is a wonderful realm in which to observe beauty born out of mathematical relationships.\r\nThe natural world provid… [+4137 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "YouTube"
                    },
                    "author": null,
                    "title": "On the Dot: Too much bright light at night pollutes the sky - CBS Philadelphia",
                    "description": "The light is also bad for our sleep and health. Environmental reporter David Schecter has the latest.",
                    "url": "https://www.youtube.com/watch?v=IxQYgrAXSv0",
                    "urlToImage": "https://i.ytimg.com/vi/IxQYgrAXSv0/maxresdefault.jpg",
                    "publishedAt": "2023-09-04T23:03:41Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "YouTube"
                    },
                    "author": null,
                    "title": "Dried up creek reveals dino tracks from three-toed creature - CBS Chicago",
                    "description": "A hot, dry summer has led to a prehistoric discovery in northern Texas: Giant dinosaur tracks are discovered in a dried-up creek bed. Researchers are now rac...",
                    "url": "https://www.youtube.com/watch?v=SP9dpIPvpNg",
                    "urlToImage": "https://i.ytimg.com/vi/SP9dpIPvpNg/maxresdefault.jpg",
                    "publishedAt": "2023-09-04T22:50:05Z",
                    "content": null
                },
                {
                    "source": {
                        "id": "google-news",
                        "name": "Google News"
                    },
                    "author": "Reuters",
                    "title": "Europe to decide within weeks on when to restart space launches - Reuters",
                    "description": null,
                    "url": "https://news.google.com/rss/articles/CBMicmh0dHBzOi8vd3d3LnJldXRlcnMuY29tL3RlY2hub2xvZ3kvc3BhY2UvZXVyb3BlLXNwYWNlLWFnZW5jeS1zZXQtdGFyZ2V0LXBlcmlvZC1hcmlhbmUtNi1sYXVuY2gtb2N0b2Jlci0yMDIzLTA5LTA0L9IBAA?oc=5",
                    "urlToImage": null,
                    "publishedAt": "2023-09-04T22:02:42Z",
                    "content": null
                }
            ]
        },

        sports: {
            "status": "ok",
            "totalResults": 70,
            "articles": [
                {
                    "source": {
                        "id": null,
                        "name": "The Indian Express"
                    },
                    "author": "The Indian Express",
                    "title": "Afghanistan vs Sri Lanka Live Score, Asia Cup 2023: Kusal Mendis and Dasun Shanaka sent back by Rashid Khan, SL 7 down in a flash - The Indian Express",
                    "description": null,
                    "url": "https://indianexpress.com/article/sports/cricket/afghanistan-vs-sri-lanka-live-score-asia-cup-2023-afg-vs-sl-group-b-match-scorecard-latest-updates-8925040/",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T12:26:47Z",
                    "content": null
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TOI Sports Desk",
                    "title": "'You have to make tough choices...': Who is saying what about India's ODI World Cup squad - Times of India",
                    "description": "Cricket News:  Waiting for an ICC trophy for more than a decade, India on Tuesday announced a 15-member squad led by skipper Rohit Sharma for the upcoming ICC ODI W",
                    "url": "https://timesofindia.indiatimes.com/sports/cricket/icc-world-cup/you-have-to-make-tough-choices-who-is-saying-what-about-indias-odi-world-cup-squad/articleshow/103394808.cms",
                    "urlToImage": "https://static.toiimg.com/thumb/msid-103395088,width-1070,height-580,imgsize-57328,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
                    "publishedAt": "2023-09-05T11:30:00Z",
                    "content": "Asia Cup: India, Pakistan blockbuster ends in no result\r\nasia-cup-rain-plays-spoilsport-as-india-pakistan-blockbuster-ends-in-no-result"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Hindustan Times"
                    },
                    "author": "HT Sports Desk",
                    "title": "'Iska jawaab nahi duunga': Fuming Rohit lashes out at IND vs PAK query- Watch - Hindustan Times",
                    "description": "At the end of the question, Rohit pulled off a weary look before issuing a stern warning at the media to not ask such questions during World Cup | Cricket",
                    "url": "https://www.hindustantimes.com/cricket/iska-jawaab-nahi-duunga-rohit-sharma-loses-cool-lashes-out-ind-vs-pak-question-world-cup-team-announcement-watch-video-101693910447840.html",
                    "urlToImage": "https://www.hindustantimes.com/ht-img/img/2023/09/05/1600x900/rohit_angry_1693911168762_1693911182457.jpg",
                    "publishedAt": "2023-09-05T11:25:01Z",
                    "content": "When the press confrence at the started in Kandy on Tuesday afternoon, India captain Rohit Sharma was in a jolly mood as seen through his reaction when BCCI chief selector Ajit Agarkar had mentioned … [+1975 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Livemint"
                    },
                    "author": "Devesh Kumar",
                    "title": "'Team India nahi Bharat': Virender Sehwag vouches for change in cricket team's jersey amid India renaming row | Mint - Mint",
                    "description": "Virender Sehwag even tagged BCCI Secretary Jay Shah and said that our player wears a jersey which has 'Bharat'",
                    "url": "https://www.livemint.com/politics/news/team-india-nahi-bharat-virender-sehwag-vouches-for-change-in-cricket-teams-jersey-amid-india-renaming-row-11693909047931.html",
                    "urlToImage": "https://www.livemint.com/lm-img/img/2023/09/05/600x338/ICC_world_cup_1687854052650_1693911039322.jpg",
                    "publishedAt": "2023-09-05T11:01:09Z",
                    "content": "India announced its ODI World Cup 2023 squad amid reports of the government considering changing the country's name from India to Bharat, cricket veteran Virender Sehwag said that now our players are… [+1914 chars]"
                },
                {
                    "source": {
                        "id": "espn-cric-info",
                        "name": "ESPN Cric Info"
                    },
                    "author": "Firdose Moonda",
                    "title": "De Kock to retire from ODIs after World Cup in India - ESPNcricinfo",
                    "description": "De Kock's availability for South Africa had also become an issue after he signed up for the BBL recently",
                    "url": "https://www.espncricinfo.com/story/quinton-de-kock-to-retire-from-odis-after-world-cup-in-india-1396382",
                    "urlToImage": "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/353400/353493.6.jpg",
                    "publishedAt": "2023-09-05T10:31:22Z",
                    "content": "NewsDe Kock's availability for South Africa had also become an issue after he signed up for the BBL recently\r\nFirdose Moonda is ESPNcricinfo's correspondent for South Africa and women's cricket"
                },
                {
                    "source": {
                        "id": null,
                        "name": "NDTV News"
                    },
                    "author": "Asian News International",
                    "title": "\"When India Play Pakistan...\": On Visit To Lahore, BCCI President Roger Binny Makes Big Statement - NDTV Sports",
                    "description": "The Board of Control for Cricket in India (BCCI) president Roger Binny and vice president Rajeev Shukla attended Pakistan Cricket Board's (PCB) gala dinner at Lahore on Monday",
                    "url": "https://sports.ndtv.com/asia-cup-2023/when-india-play-pakistan-on-visit-to-lahore-bcci-president-roger-binny-makes-big-statement-4361457",
                    "urlToImage": "https://c.ndtvimg.com/2023-09/lq4p8088_bcci-pcb-_625x300_04_September_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675",
                    "publishedAt": "2023-09-05T10:14:25Z",
                    "content": "The Board of Control for Cricket in India (BCCI) president Roger Binny and vice president Rajeev Shukla attended Pakistan Cricket Board's (PCB) gala dinner at Lahore on Monday in which the former Ind… [+2252 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "YouTube"
                    },
                    "author": null,
                    "title": "Pragg, Gukesh, Nodirbek, MVL & Co Play For Early Advantage On Day 1 | Tata Steel India Rapid Rd 1-3 - Chess.com",
                    "description": "The Tata Steel Chess India Rapid and Blitz 2023 is an elite series of tournaments that brings together top Indian players and other elite chess players from ...",
                    "url": "https://www.youtube.com/watch?v=HAcMQ6P741I",
                    "urlToImage": "https://i.ytimg.com/vi/HAcMQ6P741I/maxresdefault_live.jpg",
                    "publishedAt": "2023-09-05T09:15:07Z",
                    "content": null
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TIMESOFINDIA.COM",
                    "title": "Video: Was Neeraj Chopra's javelin stolen from his statue in Meerut? Watch to know - Times of India",
                    "description": "The recent claim of a stolen javelin from the statue of world champion Neeraj Chopra in Meerut is debunked as fake news. Deepak Meena, the District Magistrate of Meerut, clarified that the Meerut Development Authority (MDA) replaced the javelin with",
                    "url": "https://timesofindia.indiatimes.com/videos/city/lucknow/video-was-neeraj-chopras-javelin-stolen-from-his-statue-in-meerut-watch-to-know/videoshow/103387630.cms",
                    "urlToImage": "https://timesofindia.indiatimes.com/photo/msid-103387630,imgsize-855031.cms",
                    "publishedAt": "2023-09-05T09:01:10Z",
                    "content": "Sep 05, 2023, 02:31PM ISTSource: ANIThe recent claim of a stolen javelin from the statue of world champion Neeraj Chopra in Meerut is debunked as fake news. Deepak Meena, the District Magistrate of M… [+433 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "YouTube"
                    },
                    "author": null,
                    "title": "'Middle Finger Gesture' Was Reply To 'Anti-Hindu And Kashmir' Chants, Claims Gautam Gambhir - Republic World",
                    "description": null,
                    "url": "https://www.youtube.com/watch?v=TMXy9CT9yIQ",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T08:59:16Z",
                    "content": "Your browser isnt supported anymore. Update it to get the best YouTube experience and our latest features. Learn more\r\nRemind me later"
                },
                {
                    "source": {
                        "id": null,
                        "name": "India Today"
                    },
                    "author": "India Today Entertainment Desk",
                    "title": "Amitabh Bachchan presented BCCI Golden ticket by Jay Shah - India Today",
                    "description": "Amitabh Bachchan was presented with the Golden ticket by BCCI secretary Jay Shah. Here's what he wrote.",
                    "url": "https://www.indiatoday.in/movies/celebrities/story/amitabh-bachchan-presented-bcci-golden-ticket-by-jay-shah-2431232-2023-09-05",
                    "urlToImage": "https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/jay-shah-and-amitabh-bachchan-055649-16x9.jpg?VersionId=6hox4_mf0GAxe6703.LI..liZsQ5kfdS",
                    "publishedAt": "2023-09-05T08:50:51Z",
                    "content": "Megastar Amitabh Bachha was recently presented with the golden ticket. The announcement was made by none other than BCCI Secretary Jay Shah. A legendary actor and a devoted cricket enthusiast, Amiatb… [+1576 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "International Cricket Council"
                    },
                    "author": "ICC",
                    "title": "Bangladesh's Asia Cup campaign suffers a huge blow - ICC Cricket",
                    "description": "Bangladesh's top run-getter from Asia Cup 2023 Najmul Hossain Shanto has been ruled out of the tournament with an injury.",
                    "url": "https://www.icc-cricket.com/news/3671369",
                    "urlToImage": "https://resources.pulse.icc-cricket.com/ICC/photo/2023/09/05/7c620b77-cd8f-466a-babe-2f420d72ccfe/GettyImages-1642364276.jpg",
                    "publishedAt": "2023-09-05T08:34:05Z",
                    "content": "Bangladesh's top run-getter from Asia Cup 2023 Najmul Hossain Shanto has been ruled out of the tournament with an injury.Shanto was plagued with a left hamstring discomfort during his knock of 104 ag… [+1590 chars]"
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TIMESOFINDIA.COM",
                    "title": "Pak cricketer Shadab Khan ties Hardik Pandya's shoelace, Hina Khan lauds the heartwarming moment, says ‘There is nobility in compassion’ - Times of India",
                    "description": "India and Pakistan recently faced each other in one of the most awaited cricket matches of this year at the ongoing Asia Cup 2023. Though the game was washed out due to incessant rains after the first innings, there were some memorable moments in the",
                    "url": "https://timesofindia.indiatimes.com/videos/etimes/bollywood/pak-cricketer-shadab-khan-ties-hardik-pandyas-shoelace-hina-khan-lauds-the-heartwarming-moment-says-there-is-nobility-in-compassion/videoshow/103386657.cms",
                    "urlToImage": "https://timesofindia.indiatimes.com/photo/msid-103386657,imgsize-90912.cms",
                    "publishedAt": "2023-09-05T08:34:00Z",
                    "content": "Sep 05, 2023, 02:04PM ISTSource: etimes.inIndia and Pakistan recently faced each other in one of the most awaited cricket matches of this year at the ongoing Asia Cup 2023. Though the game was washed… [+1151 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Khelnow.com"
                    },
                    "author": "Khel Now",
                    "title": "ISL 2023-24: Kerala Blasters to play Bengaluru FC on opening day - Khel Now",
                    "description": null,
                    "url": "https://khelnow.com/football/2023-09-indian-football-isl-fixtures",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T08:32:28Z",
                    "content": null
                },
                {
                    "source": {
                        "id": "google-news",
                        "name": "Google News"
                    },
                    "author": "Circle of Cricket",
                    "title": "Ex-PCB chief Najam Sethi hits out at Jay Shah for Asia Cup 2023 venue selection amid rain-marred games in Sri Lanka - Circle of Cricket",
                    "description": null,
                    "url": "https://news.google.com/rss/articles/CBMiqgFodHRwczovL2NpcmNsZW9mY3JpY2tldC5jb20vY2F0ZWdvcnkvYXNpYWN1cDIwMjMvODY2NTcvZXgtcGNiLWNoaWVmLW5hamFtLXNldGhpLWhpdHMtb3V0LWF0LWpheS1zaGFoLWZvci1hc2lhLWN1cC0yMDIzLXZlbnVlLXNlbGVjdGlvbi1hbWlkLXJhaW4tbWFycmVkLWdhbWVzLWluLXNyaS1sYW5rYdIBAA?oc=5",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T08:04:22Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "NDTV News"
                    },
                    "author": "NDTV Sports Desk",
                    "title": "Watch: Virat Kohli Gives Medal To Nepal Star After Asia Cup Clash, Then Breaks Into Laughter With Su.. - NDTV Sports",
                    "description": "The Indian cricket team attained its first target at the Asia Cup 2023 on Monday - that is to qualify for the Super 4 stage",
                    "url": "https://sports.ndtv.com/asia-cup-2023/virat-kohli-gives-medal-to-nepal-star-after-asia-cup-clash-then-breaks-into-laughter-with-suryakumar-yadav-watch-4360881",
                    "urlToImage": "https://c.ndtvimg.com/2023-09/7cnq4nm_virat-nepal_625x300_05_September_23.jpg",
                    "publishedAt": "2023-09-05T07:56:29Z",
                    "content": "The Indian cricket team attained its first target at the Asia Cup 2023 on Monday - that is to qualify for the Super 4 stage. After its first game against Pakistan got washed out due to rain, India ne… [+2513 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Sportsbrief.com"
                    },
                    "author": "Isaac Darko",
                    "title": "Explosive Twitter Thread Backs Van Gaal's Claim That World Cup Was Rigged for Messi - Sports Brief",
                    "description": "Louis van Gaal has sparked outrage among fans on social media by claiming that the 2022 World Cup was rigged to favour Argentina superstar Lionel Messi.",
                    "url": "https://sportsbrief.com/football/48202-twitter-fan-back-van-gaal-claiming-world-cup-rigged-lionel-messi/",
                    "urlToImage": "https://images.sportsbrief.com/images/1200x675/caab8a9efdf85617.jpeg?v=1",
                    "publishedAt": "2023-09-05T06:56:15Z",
                    "content": "<ul><li>Lionel Messi led Argentina to the 2022 World Cup triumph in Qatar</li><li>But Louis Van Gaal has alleged the games were orchestrated for Messi</li><li>A viral post has laid out a conspiracy t… [+2940 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "ATP Tour"
                    },
                    "author": "ATP Tour",
                    "title": "Zverev Beats Sinner, Sets Alcaraz QF At US Open - ATP Tour",
                    "description": "Zverev Holds Off Sinner In Five, Sets Alcaraz QF At US Open",
                    "url": "https://www.atptour.com/en/news/sinner-zverev-us-open-2023-r4",
                    "urlToImage": "https://www.atptour.com/-/media/images/news/2023/09/05/05/57/zverev-us-open-2023-monday-celebration.jpg",
                    "publishedAt": "2023-09-05T06:33:45Z",
                    "content": "Alexander Zverev has advanced to the quarter-finals of the US Open after holding off a resurgent Jannik Sinner on a brutally humid Sunday night in New York. \r\nZverev kept his cool in the deciding set… [+4049 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "NDTV News"
                    },
                    "author": null,
                    "title": "India Vs Pakistan ODI World Cup Match Tickets Selling For Rs 50 Lakh, Fans Ask \"What Is Happening?\" - NDTV",
                    "description": "The tickets for the high-voltage India vs Pakistan match at the 2023 ODI World Cup in Ahmedabad are generating a frenzy on the secondary market.",
                    "url": "https://www.ndtv.com/offbeat/india-vs-pakistan-odi-world-cup-match-tickets-selling-for-rs-50-lakh-fans-ask-what-is-happening-4360313",
                    "urlToImage": "https://c.ndtvimg.com/2023-09/gv2ib8jg_india-vs-pakistan-afp_625x300_02_September_23.jpg",
                    "publishedAt": "2023-09-05T06:16:00Z",
                    "content": "World Cup tickets are selling for huge amounts on the secondary market.\r\nThe interest in the upcoming high-voltage clash between the Indian and Pakistan cricket teams at the ICC World Cup 2023 is ref… [+1836 chars]"
                },
                {
                    "source": {
                        "id": "the-hindu",
                        "name": "The Hindu"
                    },
                    "author": "Sportstar",
                    "title": "US Open fan ejected after ‘Hitler phrase’ as Zverev beats Sinner - Sportstar",
                    "description": null,
                    "url": "https://sportstar.thehindu.com/tennis/us-open-2023-zverev-vs-sinner-fan-ejected-after-hitler-phrase-fourth-round-highlight-report-result-score-news/article67272533.ece",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T05:51:29Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "The Cricket Times"
                    },
                    "author": "Akshat Gaur",
                    "title": "PAK-W vs SA-W: Laura Wolvaardt's batting brilliance in vain as Pakistan pip South Africa in 3rd T20I to register a clean sweep - Cricket Times",
                    "description": "In a historic moment in Pakistan Women’s cricket, the Nida Dar-led side registered a whitewash over South Africa after winning the third and final game of the 3-match T20I series at the National Stadium in Karachi on Monday. The contest went down to the wire …",
                    "url": "https://crickettimes.com/2023/09/pak-w-vs-sa-w-laura-wolvaardts-batting-brilliance-in-vain-as-pakistan-pip-south-africa-in-3rd-t20i-to-register-a-clean-sweep/",
                    "urlToImage": "https://crickettimes.com/wp-content/uploads/2023/09/Pakistan-whitewash-South-Africa-in-Womens-T20I-series.webp",
                    "publishedAt": "2023-09-05T05:45:02Z",
                    "content": "In a historic moment in Pakistan Womens cricket, the Nida Dar-led side registered a whitewash over South Africa after winning the third and final game of the 3-match T20I series at the National Stadi… [+1972 chars]"
                }
            ]
        },

        technology: {
            "status": "ok",
            "totalResults": 70,
            "articles": [
                {
                    "source": {
                        "id": null,
                        "name": "YouTube"
                    },
                    "author": null,
                    "title": "4 Ola Electric Future Electric Bikes - GadgetsToUse",
                    "description": "Video accha lage to Subscribe kijiye 👍, its FREE, Become #GTUFamily Member at: http://bit.ly/2DzB5eq ** Ways To Connect & Talk To Us Directly ** 1. Official...",
                    "url": "https://www.youtube.com/watch?v=nqsQIQ0Id3A",
                    "urlToImage": "https://i.ytimg.com/vi/nqsQIQ0Id3A/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHOBYACgAqKAgwIABABGD0gSShyMA8=&rs=AOn4CLCqZLc-ymLvUExvJzqxMPtWRPRQWA",
                    "publishedAt": "2023-09-05T12:18:51Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "YouTube"
                    },
                    "author": null,
                    "title": "IOS 17 To Come Up With New Features | iPhone | iPhone New Features Explained | N18V | News18 - CNN-News18",
                    "description": "Apple plans a simultaneous rollout of iOS 17 and iPadOS 17, breaking from last year's separate releases. New features and the iPhone 15 series are expected t...",
                    "url": "https://www.youtube.com/watch?v=5CufCK9hFUA",
                    "urlToImage": "https://i.ytimg.com/vi/5CufCK9hFUA/maxresdefault.jpg",
                    "publishedAt": "2023-09-05T12:00:17Z",
                    "content": null
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TIMESOFINDIA.COM",
                    "title": "Redmi Smart Fire TV with 43-inch 4K display to launch in India on September 15 - Times of India",
                    "description": "Xiaomi is set to launch the Redmi Smart Fire TV 4K 43-inch model in India on September 15. The smart TV will feature an elegant design, minimal bezels",
                    "url": "https://timesofindia.indiatimes.com/gadgets-news/redmi-smart-fire-tv-with-43-inch-4k-display-to-launch-in-india-on-september-15/articleshow/103395193.cms",
                    "urlToImage": "https://static.toiimg.com/thumb/msid-103395169,width-1070,height-580,imgsize-61182,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
                    "publishedAt": "2023-09-05T11:32:00Z",
                    "content": "Boult launches Astra TWS earbuds: Price, Specs and more"
                },
                {
                    "source": {
                        "id": null,
                        "name": "MacRumors"
                    },
                    "author": "Tim Hardwick",
                    "title": "India on Course to Be Among First iPhone 15 Launch Markets - MacRumors",
                    "description": "Apple aims this year to release the iPhone 15 in India at the same time as its global launch in mid-September, based on local reports.   According to...",
                    "url": "https://www.macrumors.com/2023/09/05/india-among-first-iphone-15-launch-markets/",
                    "urlToImage": "https://images.macrumors.com/t/6QEJTAHrqLd3h1g3Bit5eSEHymk=/2500x/article-new/2023/08/iPhone-15-Colors-Mock-Feature-1.jpg",
                    "publishedAt": "2023-09-05T11:23:49Z",
                    "content": "Apple aims this year to release the iPhone 15 in India at the same time as its global launch in mid-September, based on local reports.\r\nAccording to sources who spoke to The Economic Times, Apple is … [+1870 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "The Indian Express"
                    },
                    "author": "The Indian Express",
                    "title": "India set to be the world’s largest adopter of AR & VR technologies, says founder of AjnaLens - The Indian Express",
                    "description": null,
                    "url": "https://indianexpress.com/article/technology/tech-news-technology/india-set-to-be-largest-ar-vr-tech-adopter-says-ajnalens-founder-8925848/",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T11:23:07Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "CNBCTV18"
                    },
                    "author": "Bloomberg",
                    "title": "Apple succumbs to EU pressure, iPhone 15 to feature USB-C ports - CNBCTV18",
                    "description": "Apple is reluctantly shifting from Lightning to USB-C charging ports in its upcoming iPhone 15 models due to European Union regulations. This change promises benefits like universal charging compatibility, faster data transfer, and reduced electronic waste.",
                    "url": "https://www.cnbctv18.com/technology/apple-iphone-15-release-usb-c-port-charger-europe-17720881.htm",
                    "urlToImage": "https://images.cnbctv18.com/wp-content/uploads/2023/08/untitled-design-19-1019x573.jpg",
                    "publishedAt": "2023-09-05T10:57:44Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "GSMArena.com"
                    },
                    "author": "Michail",
                    "title": "FT: Apple argues iMessage is not gatekeeper in the EU - GSMArena.com",
                    "description": "Apple has reportedly argued that iMessage does not have 45 million active users in the EU. The European Union’s Digital Markets Act (DMA) entered into...",
                    "url": "https://www.gsmarena.com/ft_apple_argues_imessage_is_not_gatekeeper_in_the_eu-news-59793.php",
                    "urlToImage": "https://fdn.gsmarena.com/imgroot/news/23/09/apple-imessage-not-gatekeeper/-952x498w6/gsmarena_000.jpg",
                    "publishedAt": "2023-09-05T10:52:01Z",
                    "content": "The European Unions Digital Markets Act (DMA) entered into force on August 25 with the goal of ensuring a higher degree of competition in the EU digital market by regulating the market power of large… [+1216 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Financial Express"
                    },
                    "author": "The Financial Express",
                    "title": "Samsung unveils campaign Shor no more for the newly launched Galaxy A14 5G - The Financial Express",
                    "description": null,
                    "url": "https://www.financialexpress.com/business/brandwagon-samsung-unveils-campaign-shor-no-more-for-the-newly-launched-galaxy-a14-5g-3233770/",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T10:48:00Z",
                    "content": null
                },
                {
                    "source": {
                        "id": "google-news",
                        "name": "Google News"
                    },
                    "author": "ETInfra",
                    "title": "AVIATION CONNECT: ExecuJet MRO’s Dubai expansion has India in focus: Graeme Duckworth - ETInfra",
                    "description": null,
                    "url": "https://news.google.com/rss/articles/CCAiC3VaT2txbDk2TDM0mAEB?oc=5",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T10:47:41Z",
                    "content": null
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "TIMESOFINDIA.COM",
                    "title": "Garena delays the launch of 'Free Fire India' - Times of India",
                    "description": "Singapore-based online games developer and publisher, Garena, has postponed the relaunch of the popular mobile game, Free Fire India. The company init",
                    "url": "https://timesofindia.indiatimes.com/gadgets-news/garena-delays-the-launch-of-free-fire-india/articleshow/103392541.cms",
                    "urlToImage": "https://static.toiimg.com/thumb/msid-103392513,width-1070,height-580,imgsize-547312,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
                    "publishedAt": "2023-09-05T10:36:00Z",
                    "content": "Boult launches Astra TWS earbuds: Price, Specs and more"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Gadgets360.com"
                    },
                    "author": "Himani Jha, Siddharth Suvarna",
                    "title": "Boat Wave Elevate Smartwatch With Apple Watch Ultra Design Launched in India: Price, Features - Gadgets 360",
                    "description": "Boat Wave Elevate smartwatch has been unveiled in India with a very Apple Watch Ultra-like design. The smartwatch comes with a 1.96-inch display that is claimed to offer 500 nits of peak brightness. It also supports Bluetooth calling and comes with several sm…",
                    "url": "https://www.gadgets360.com/wearables/news/boat-wave-elevate-price-in-india-rs-2299-launch-specifications-features-4361472",
                    "urlToImage": "https://i.gadgets360cdn.com/large/Boat_Wave_Elevate_main_1693908939836.jpg",
                    "publishedAt": "2023-09-05T10:18:40Z",
                    "content": "Boat Wave Elevate smartwatch has been unveiled in India with a design that very much resembles the Apple Watch Ultra. The Boat smartwatch comes equipped with a 1.96-inch HD display that is said to of… [+1991 chars]"
                },
                {
                    "source": {
                        "id": "techcrunch",
                        "name": "TechCrunch"
                    },
                    "author": "Jagmeet Singh",
                    "title": "India warns of malware attacks targeting its Android users - TechCrunch",
                    "description": "India has warned its citizens of an advanced malware targeting Android users, capable of accessing sensitive data and allowing hackers control over India has issued a cautionary note about a sophisticated malware campaign targeting Android users in the countr…",
                    "url": "https://techcrunch.com/2023/09/05/india-advisory-dogerat-malware-android-users/",
                    "urlToImage": "https://techcrunch.com/wp-content/uploads/2023/09/india-cybersecurity-image-getty.jpg?w=1200",
                    "publishedAt": "2023-09-05T10:12:28Z",
                    "content": "India has warned its citizens of an advanced malware targeting Android users, capable of accessing sensitive data and allowing hackers control over infected devices.\r\nThe Controller General of Defenc… [+2607 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Dqindia.com"
                    },
                    "author": "Punam Singh",
                    "title": "Microsoft Upcoming Windows Release May Remove Wordpad - DATAQUEST",
                    "description": "Microsoft the renowned tech giant well recognized for its Windows operating system is set to introduce significant modifications in its",
                    "url": "https://www.dqindia.com/microsoft-upcoming-windows-release-may-remove-wordpad/",
                    "urlToImage": "https://www.dqindia.com/wp-content/uploads/2023/09/building-1011876-1280.jpg",
                    "publishedAt": "2023-09-05T09:37:22Z",
                    "content": "Microsoft the renowned tech giant well recognized for its Windows operating system is set to introduce significant modifications in its upcoming Windows iteration by removing Wordpad.\r\nWordpad is a f… [+1989 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "GSMArena.com"
                    },
                    "author": "Yordan",
                    "title": "Motorola Edge 40 Neo appears on FCC with a 5,000 mAh battery - GSMArena.com news - GSMArena.com",
                    "description": "The phone will offer 68W fast charging, like its predecessor. Motorola is working on an Edge 40 Neo in three Pantone colors, according to a recent leak....",
                    "url": "https://www.gsmarena.com/motorola_edge_40_neo_appears_on_fcc_with_a_5000_mah_battery-news-59792.php",
                    "urlToImage": "https://fdn.gsmarena.com/imgroot/news/23/09/motorola-edge-40-neo-fcc/-952x498w6/gsmarena_001.jpg",
                    "publishedAt": "2023-09-05T09:32:02Z",
                    "content": "Motorola is working on an Edge 40 Neo in three Pantone colors, according to a recent leak. Today, we learned the phone got certified by the FCC, and the US regulation revealed the battery capacity an… [+778 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "gizmochina"
                    },
                    "author": "gizmochina",
                    "title": "iQOO Z7 Pro with Dimensity 7200 & 6.78\" curved AMOLED display on sale in India - gizmochina",
                    "description": null,
                    "url": "https://www.gizmochina.com/2023/09/05/iqoo-z7-pro-on-sale-india/",
                    "urlToImage": null,
                    "publishedAt": "2023-09-05T09:26:30Z",
                    "content": null
                },
                {
                    "source": {
                        "id": null,
                        "name": "Sportskeeda"
                    },
                    "author": "Mridul Dutta",
                    "title": "Top 5 Mercedes-Benz cars in GTA Online in 2023 - Sportskeeda",
                    "description": "Mercedes-Benz has immense popularity both in the real world and GTA Online’s car market. Rockstar Games currently offers 17 Mercedes-inspired cars in-game that you can buy and own.",
                    "url": "https://www.sportskeeda.com/gta/top-5-mercedes-benz-cars-gta-online-2023",
                    "urlToImage": "https://staticg.sportskeeda.com/editor/2023/09/7591e-16939011868784-1920.jpg",
                    "publishedAt": "2023-09-05T09:15:00Z",
                    "content": "Mercedes-Benz has immense popularity both in the real world and GTA Onlines car market. Rockstar Games currently offers 17 Mercedes-inspired cars in-game that you can buy and own. These vehicles have… [+3658 chars]"
                },
                {
                    "source": {
                        "id": "the-times-of-india",
                        "name": "The Times of India"
                    },
                    "author": "Bharat Sharma",
                    "title": "Woman Bites Through iPhone Cable In Bizarre Theft Attempt At Apple Store - Indiatimes.com",
                    "description": "How far would you go to get your hands on an iPhone? A woman in southeastern China chose an unusual approach when chewed through an anti-theft iPhone cable at a local Apple store to get her hands on an iPhone 14 Plus.The security footage shows the woman halti…",
                    "url": "https://www.indiatimes.com/technology/news/woman-bites-through-iphone-cable-in-bizarre-theft-attempt-614067.html",
                    "urlToImage": "https://im.indiatimes.in/content/2023/Sep/Social-image_64f6f2d31ab7e.png",
                    "publishedAt": "2023-09-05T09:07:43Z",
                    "content": "How far would you go to get your hands on an iPhone? A woman in southeastern China chose an unusual approach when chewed through an anti-theft iPhone cable at a local Apple store to get her hands on … [+1372 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Deccan Herald"
                    },
                    "author": "DH Web Desk",
                    "title": "WhatsApp testing multi-account feature for one device - Deccan Herald",
                    "description": null,
                    "url": "https://www.deccanherald.com/technology/gadgets/whatsapp-testing-multi-account-feature-for-one-device-2673273",
                    "urlToImage": "https://images.deccanherald.com/deccanherald%2F2023-09%2Fa80cd5a1-79ab-4a3f-ba6c-03e58eed9dc7%2F495014.gif?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop",
                    "publishedAt": "2023-09-05T07:50:00Z",
                    "content": "Last year, WhatsApp successfully launched the multi-device linking feature that allowed users to link primary accounts with multiple devices and later, it even let people link two phones.\r\nNow, the M… [+529 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Deccan Herald"
                    },
                    "author": "DH Web Desk",
                    "title": "OnePlus may bring affordable 'Pad Go' Android tablet soon - Deccan Herald",
                    "description": null,
                    "url": "https://www.deccanherald.com/technology/gadgets/oneplus-may-bring-affordable-pad-go-android-tablet-soon-2673348",
                    "urlToImage": "https://images.deccanherald.com/deccanherald%2F2023-09%2F2727940e-eae8-4618-9855-6173eddf84de%2FWhatsApp_20Image_202023_02_08_20at_201_26_30_20AM_20_285_29.jpeg?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop",
                    "publishedAt": "2023-09-05T07:33:24Z",
                    "content": "After launching the premium Android tablet OnePlus Pad, the popular smartphone maker is reportedly planning to bring a more affordable tablet for the masses in India.\r\nAndroid Authority citing a reli… [+1581 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Augustman.com"
                    },
                    "author": "Amritanshu Mukherjee",
                    "title": "Google Pixel 8 Vs iPhone 15: Which Upcoming Flagship Is Better? - AugustMan India",
                    "description": "The comparison between the Google Pixel 8 vs iPhone 15 is shaping up to be quite interesting even before they go on sale.",
                    "url": "https://www.augustman.com/in/gear/tech/google-pixel-8-vs-iphone-15-comparison-specs-price/",
                    "urlToImage": "https://images.augustman.com/wp-content/uploads/sites/6/2023/09/04202644/pixel-vs-iphone-f.jpg",
                    "publishedAt": "2023-09-05T07:31:54Z",
                    "content": "We don’t like fueling up the heated Android vs. iOS debate, considering that both platforms have made our lives a lot easier with their flagship offerings. iOS on the most powerful iPhones is always … [+7713 chars]"
                }
            ]
        }
    }


// Function to fetch and update articles.
const updateArticles = async () => {
    // Initially setting Progress of article loading
    props.setProgress(0);
    // Setting spinner to run before articles are fetched
    setLoading(true);

    // Fetch articles from the API
    // let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}${props.category === "Home" ? "" : `&category=${props.category}`}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pgsize}`);
    // let fetcharticles = await data.json();
    // setArticles(fetcharticles.articles);
    // setTotalResults(fetcharticles.totalResults);
    // setLoading(false);


    //Fetch Articles From Object
    try {
   
         // Get the data object based on the provided category prop
        const data = newsData[props.category];

        setArticles(data.articles.slice(0, props.pgsize));
        setTotalResults(data.articles.length);
        setLoading(false);
    } catch (error) {
        console.error(error);
        setLoading(false);
    }

    // Completing progress when initial articles are fetched
    props.setProgress(100);
}

// Function to fetch more data for Infinite Scroll
const fetchMoreData = () => {
    setTimeout(async () => {

        // let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}${props.category === "Home" ? "" : `&category=${props.category}`}&apiKey=${props.apikey}&page=${page + 1}&pagesize=${props.pgsize}`);
        // setPage(page + 1);
        // let fetcharticles = await data.json();
        // // Concatenate fetched articles data with previously fetched articles
        // setArticles(articles.concat(fetcharticles.articles));
        // setTotalResults(fetcharticles.totalResults);

        // Fetch More Data
        try {
            
            const data = newsData[props.category];
            const startIndex = ((page+1) - 1) * props.pgsize;
            const endIndex = startIndex + props.pgsize;
            setPage(page + 1);
            setArticles(articles.concat(data.articles.slice(startIndex, endIndex)));
            setTotalResults(data.articles.length);
            
        } catch (error) {
            console.error(error);
        }

    }, 1500);
}

useEffect(() => {
    // Set web page title as the currently active category page name with the first letter capitalized
    document.title = `News App - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;
    // Initially load articles by calling updateArticles because fetchMoreData is called only when the screen is scrolled
    updateArticles();
}, []);

return (
    <div className='news-container'>
        <h2 className=''>Top Headlines</h2>

        {/* Infinite Scroll */}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
        >
            <div className='news-items'>
                {/* {articles.map((element) => {
                            return <div key={element.url} className=''>
                                <NewsItem title={element.title.slice(0, 50) + "...."} description={element.description !== null ? element.description.slice(0, 80) + "......" : "No Description Available"} imgUrl={!element.urlToImage ? "https://www.livemint.com/lm-img/img/2023/08/26/600x338/Ringed_Planet_1670326152353_1693026149708.webp" : element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={new Date(element.publishedAt).toGMTString()} acategory={props.category === "Home" ? "" : `${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`}/>
                            </div>
                        })}  */}

                {articles.map((element, index) => (
                    <div key={index} className=''>
                        <NewsItem
                            title={element.title.slice(0, 50) + "...."}
                            description={element.description !== null ? element.description.slice(0, 80) + "......" : "No Description Available"}
                            imgUrl={!element.urlToImage ? "https://www.livemint.com/lm-img/img/2023/08/26/600x338/Ringed_Planet_1670326152353_1693026149708.webp" : element.urlToImage}
                            newsUrl={element.url}
                            author={element.author || 'Unknown'}
                            date={new Date(element.publishedAt).toGMTString()}
                            category={props.category === "Home" ? "" : `${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`}
                        />
                    </div>
                ))}

            </div>

        </InfiniteScroll>
    </div>
)
}

// Default props for News component
News.defaultProps = {
    country: 'in',
    pgsize: 6,
    category: "Home",
}

// Prop types for News component
News.propTypes = {
    country: PropTypes.string,
    pgsize: PropTypes.number,
    category: PropTypes.string,
}

export default News;
