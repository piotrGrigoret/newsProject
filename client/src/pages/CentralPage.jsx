import React from "react";
import { useEffect } from "react";

const CentralPage = () =>{
    useEffect(() => {
        const handleSmoothScroll = (event) => {
          event.preventDefault();
          const targetId = event.currentTarget.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const offsetTop = targetElement.offsetTop;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            });
          }
        };
    
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach((link) => {
          link.addEventListener('click', handleSmoothScroll);
        });
    
        return () => {
          links.forEach((link) => {
            link.removeEventListener('click', handleSmoothScroll);
          });
        };
      }, []);

      
    return(
        <div>

            <div className="defaultTitle">
                <img className="fadeInDown" src="/news-portal-low-resolution-logo-color-on-transparent-background.png" alt="" /> 
                {/* News Portal<    br/><span>Set interesting news for you</span>  */}
            </div>
            <a href="#aboutProject">
            <div className="arrow-down-box">
                <div class="arrow-down">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="arrow-down-title">HOW TO USE IT?</div>  
            </div>
            </a>
            <div className="aboutProjectInfo">
                <div id="aboutProject" className="boxAboutProjectImage">
                    <img src="./about.png" alt="" />
                   
                </div>
                <div className="textAboutProject">
                    <p>  
                        AFTER REGISTRATION, YOU CAN VIEW THE LATEST NEWS IN THE WORLD OF BUSINESS AND TECHNOLOGY. 
                        BELOW ARE THE MAIN FEATURES AVAILABLE TO YOU:
                    </p>
                </div>
                <div className="boxOfInfoData">
                    <div></div>
                    <div className="infoDataBox">
                        <section>
                            <div>
                                WHILE BROWSING THE NEWS, YOU HAVE THE OPPORTUNITY TO CLICK ON THE TITLE OR SUMMARY AND GO TO
                                THE SITE WHERE THIS ARTICLE WAS ORIGINALLY LOCATED.
                            </div>
                            <img src="./shadowAbout1.png" alt="" />
                        </section>
                        <div className="infoData">
                            <div><img src="./aboutProject11.png" alt="" /></div>
                            <span><img src="./aboutProject12.png" alt="" /></span>
                        </div>
                        {/* <div className="titleInfoData">Go to article author</div> */}
                        <h2>GO TO ATRICLE AUTHOR</h2>
                    </div>

                    <div className="infoDataBox">
                        <section>
                            <div>
                                TO KEEP THE NEWS INTERESTING FOR YOU, YOU CAN ADD THEM TO YOUR PERSONAL ARCHIVE. TO
                                VIEW THE ARCHIVE, CLICK ON THE CORRESPONDING "ARCHIVE" ICON TO THE RIGHT OF THE MENU.
                            </div>
                            <img src="./shadowAbout2.png" alt="" />
                        </section>
                        <div className="infoData">
                            <div><img src="./aboutProject21.png" alt="" /></div>
                            <span><img src="./aboutProject22.png" alt="" /></span>
                        </div>
                        <h2>ADD TO PRIVATE ARCHIVE</h2>
                    </div>

                    <div className="infoDataBox">
                        <section>
                            <div>
                                YOU CAN COMMENT ON THE NEWS THAT INTERESTS YOU. AFTER ADDING A COMMENT, THE ARTICLE WILL BE AUTOMATICALLY ADDED
                                TO THE PUBLIC ARCHIVE, AND IT WILL NOT BE POSSIBLE TO DELETE IT. YOU CAN VIEW THE PUBLIC ARCHIVE IN THE "ARCHIVE" TAB
                                OR IN THE LEFT CORNER IN THE "COMMENTS" SECTION.

                            </div>
                            <img src="./shadowAbout3.png" alt="" />
                        </section>
                        <div className="infoData">
                            <div><img src="./aboutProject31.png" alt="" /></div>
                            <span><img src="./aboutProject32.png" alt="" /></span>
                        </div>
                        <h2>LEAVE YOUR COMMENT</h2>
                    </div>

                    <div></div>
                    <div className="infoDataBox">
                        <section>
                            <div>
                                IN ORDER TO EDIT YOUR PERSONAL DATA, YOU MUST GO TO THE SETTINGS SECTION BY CLICKING ON THE APPROPRIATE "SETTINGS" 
                                BUTTON THAT APPEARS WHEN YOU HOVER YOUR MOUSE OVER YOUR ACCOUNT PROFILE.
                            </div>
                            <img src="./shadowAbout4.png" alt="" />
                        </section>
                        <div className="infoData">
                            <div><img src="./aboutProject41.png" alt="" /></div>
                            <span><img src="./aboutProject42.png" alt="" /></span>
                        </div>
                        <h2>CHANGE YOUR PERSONAL DETAILS</h2>
                    </div>
                    <div className="infoDataBox">
                        <section>
                            <div>
                                TO CHANGE YOUR PROFILE PHOTO, YOU CAN CLICK ON THE CORRESPONDING "CHANGE PHOTO" BUTTON.
                            </div>
                            {/* <img src="./shadowAbout4.png" alt="" /> */}
                        </section>
                        <div className="infoData">
                            <div><img src="./aboutProject51.png" alt="" /></div>
                            <span><img src="./aboutProject52.png" alt="" /></span>
                        </div>
                        <h2 className="titleInfoData">CHANGE PROFILE PHOTO</h2>
                    </div>
                    <div className="infoDataBox">
                        <section>
                            <div>
                                IN THE "DELETE ACCOUNT" SECTION, YOU CAN DELETE YOUR CURRENT ACCOUNT IF NECESSARY.
                            </div>
                            <img src="./shadowAbout6.png" alt="" />
                        </section>
                        <div className="infoData">
                            <div><img src="./aboutProject61.png" alt="" /></div>
                            <span><img src="./aboutProject62.png" alt="" /></span>
                            <div><img src="./aboutProject63.png" alt="" /></div>

                        </div>
                        <h2 className="titleInfoData">VIEW PROFILE STATISTICS</h2>
                    </div>
                </div> 
                <a className="downnLink" href="#aboutDev">
                    <div className="arrow-down-box">
                        <div class="arrow-down">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        {/* <div className="arrow-down-title">HOW TO USE IT?</div>   */}
                    </div>
                </a>                
            </div>
           
            

            <div id="aboutDev" className="aboutMeInfo">
                
                <div className="boxAboutDeveloperImage">
                    <img src="./about-dev.png" alt="" />
                </div>

                <div className="boxAboutDeveloper">
                    
                    <div className="imageDeveloperBox">
                            {/* <div className="me">
                                <img src="./grigoret-piotr.png" alt="" />
                            </div> */}
                        <img src="./me1.png" alt="" />
                    </div> 
                    <div className="centralText">
                        Hello! My name is Petr. I am a web developer. This is one of my first relatively large projects. 
                        At the moment my main tech stack is MERN. This project is also implemented on this stack. Here are links to my other projects on github
                         as well as social networks and mail.<br/>See you soon!
                    </div>
                    <div className="links">
                        <img src="./more-information.png" alt="" />
                        <div className="linksIconsBox">
                                <a href="mailto:petrgrigorec32@gmail.com"><img src="./email.png" alt="" /></a>
                                <a href="https://www.linkedin.com/in/petru-grigoret-01aa89259/"><img src="./linkedin (1).png" alt="" /></a>
                                {/* <a href=""><img src="./cv.png" alt="" /></a> */}
                                <a href="https://github.com/piotrGrigoret"><img src="./github.png" alt="" /></a>
                                <a href="https://t.me/crow476_BC"><img src="./telegram.png" alt="" /></a>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>                       
    )


}

export default CentralPage;