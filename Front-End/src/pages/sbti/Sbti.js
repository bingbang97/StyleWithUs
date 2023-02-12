import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";

import man from "../../assets/mainPage/컨설턴트.png"
import woman from "../../assets/mainPage/패션캐릭터4.png"
import left1 from "../../assets/left.png"
import right1 from "../../assets/right.png"

import classes from "./Sbti.module.css";

import Radio from './radiocomponent/Radio';


const totalSlide = 4;
const Sbti = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [height, setHeight] = useState(userData.userHeight);
  const [foot, setFoot] = useState(userData.userFoot);
  // 상체 정보
  const [shoulder, setShoulder] = useState(userData.userShoulder);
  const [chest, setChest] = useState(userData.userChest);
  const [sleeve, setSleeve] = useState(userData.userSleeve);
  // 하체 정보
  const [waist, setWaist] = useState(userData.userWaist);
  const [hip, setHip] = useState(userData.userHip);
  const [thigh, setThigh] = useState(userData.userThigh);
  const [hem, setHem] = useState(userData.userHem);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  

  const userGender = useSelector((state) => state.auth.userData.userGender);

  const shoulderSize = userGender ? [52, 55, 56, 58] : [55, 58, 61, 63]
  const chesteSize = userGender ? [56, 59, 61, 63] : [59, 62, 65, 68]
  const sleeveSize = userGender ? [56, 58, 60, 61] : [57, 59, 60, 62]

  const waistSize = userGender ? [33, 34, 36, 39] : [35, 37, 39, 41]
  const hipSize = userGender ? [57, 59, 61, 63] : [55, 57, 59, 62]
  const thighSize = userGender ? [31, 33, 34, 35] : [33, 34, 36, 37]
  const hemSize = userGender ? [22, 23, 24, 25] : [25, 26, 27, 28]

  const location = useLocation();
  const [isSBTI, setIsSBTI] = useState(false);


  useEffect(()=>{
    if(location.pathname==='/sbti'){
      setIsSBTI(true)
    }else{
      setIsSBTI(false)
    }
  })


  const nextSlide = () => {
    if (currentSlide >= totalSlide) {
      // 더 이상 넘어갈 슬라이드가 없으면 스탑.
      setCurrentSlide(currentSlide);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      // 더 이상 뒤로 갈 슬라이드가 없으면 스탑
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    // 백틱을 사용하여 슬라이드로 이동하는 애니메이션 구현.
  }, [currentSlide]);

  const stringToInt = (data) => {
    const ans = parseInt(data, 10);
    return ans;
  };

  const submitSbti = (event) => {
    event.preventDefault();
    const url = "https://i8d105.p.ssafy.io/be/user/update";
    axios
      .put(
        url,
        {
          userId: userData.userId,
          userName: userData.userName,
          userNickname: userData.userNickname,
          userEmail: userData.userEmail,
          userGender: userData.userGender,
          userHeight: stringToInt(height),
          userFoot: stringToInt(foot),
          userShoulder: stringToInt(shoulder),
          userChest: stringToInt(chest),
          userSleeve: stringToInt(sleeve),
          userWaist: stringToInt(waist),
          userHip: stringToInt(hip),
          userThigh: stringToInt(thigh),
          userHem: stringToInt(hem),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        dispatch(authActions.newSBTi(response.data))
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 첫번째
  const fSlideRef = useRef(null);
  const [firstQuestion, setFirst] = useState(0);
  
  const firstfirstQuestion = () =>{
    setFirst(0)
  }
  const firstSecondQuestion = () =>{
    setFirst(1)
  };

  useEffect(() => {
    fSlideRef.current.style.transition = "all 0.5s ease-in-out";
    fSlideRef.current.style.transform = `translateY(-${firstQuestion * 130}px)`;
  }, [firstQuestion]);

  // 두번째
  const sSlideRef = useRef(null);
  const [secondQuestion, setSecond] = useState(0);

  const secondFirstQuestion = () =>{
    setSecond(0)
  };
  const secondSecondQuestion = () =>{
    setSecond(1)
  }
  const secondThirdQuestion = () =>{
    setSecond(2)
  }
  useEffect(() => {
    sSlideRef.current.style.transition = "all 0.5s ease-in-out";
    sSlideRef.current.style.transform = `translateY(-${secondQuestion * 130}px)`;
  }, [secondQuestion]);

  // 세번째

  const tSlideRef = useRef(null);
  const [thirdQuestion, setThird] = useState(0);

  const thirdFirstQuestion = () =>{
    setThird(0)
  };
  const thirdSecondQuestion = () =>{
    setThird(1)
  }
  const thirdThirdQuestion = () =>{
    setThird(2)
  }
  const thirdForthQuestion = () =>{
    setThird(3)
  }
  useEffect(() => {
    tSlideRef.current.style.transition = "all 0.5s ease-in-out";
    tSlideRef.current.style.transform = `translateY(-${thirdQuestion * 130}px)`;
  }, [thirdQuestion]);

  return (
    <div className={classes.container}>
      
      <div className={classes.sliderContainer} ref={slideRef}>
        {/* 검사 시작하기 */}
        <div className={classes.carouselItem1}>
          <p className={!isSBTI ? `${classes["PageName"]}` : `${classes["PageName"]} ${classes.on}`}>STYLE WITH US</p>
          <p className={!isSBTI ? `${classes["SubPageName"]}` : `${classes["SubPageName"]} ${classes.on}`}>스타일 혁신의 가장 확실한 방법</p>
          <img src={man} alt="man" className={!isSBTI ? `${classes["manImg"]}` : `${classes["manImg"]} ${classes.on}`}/><br />
          <button onClick={nextSlide} className={!isSBTI ? `${classes["carouselbutton1"]}` : `${classes["carouselbutton1"]} ${classes.on}`}>
            검사 시작하기
          </button>
        </div>
        {/* 첫번째 슬라이드 */}
        <div className={classes.carouselItem}>
          <img src={left1} alt="left1" className={classes.directionImg} onClick={prevSlide}/>
          <div className={classes.surveyBox}>
            <div className={classes.yChangeBox}>
            <div className={classes.answerBox} ref={fSlideRef}>
            <div className={classes.answer}>
              <p className={classes.question}>SBTI #1</p>
            </div>
              <div className={classes.answer}>
                <form onSubmit={(event) => {event.preventDefault(); firstSecondQuestion(event);}}>
                  <label >
                    <p>당신의 키는 몇 cm입니까?</p>
                    <input type="number" className={classes.answerInput} value={height} onChange={(event)=> setHeight(event.target.value)} onFocus={firstfirstQuestion}/>  
                  </label>              
                </form>
              </div>
              <div className={classes.answer}>
                <form onSubmit={(event) => {event.preventDefault()}}>
                  <label>
                    <p>평소 신으시는 신발 사이즈를 mm 단위로 입력해주세요</p>
                    <input type="number" className={classes.answerInput} value={foot}onChange={(event)=> setFoot(event.target.value)}  onFocus={firstSecondQuestion}/>  
                  </label>              
                </form>
              </div>
            </div>
            </div>
          </div>
          <img src={right1} alt="right" className={classes.directionImg} onClick={nextSlide}/>
        </div>
        {/* 두번째 슬라이드 */}
        <div className={classes.carouselItem}>
        <img src={left1} alt="left1" className={classes.directionImg} onClick={prevSlide}/>
          <div className={classes.surveyBox}>
            <div className={classes.yChangeBox}>
            <div className={classes.answerBox} ref={sSlideRef}>
            <div className={classes.answer}>
              <p className={classes.question}>SBTI #2</p>
            </div>
              <div className={classes.answer}>
                <form 
                  onChange={(event) => {
                    secondSecondQuestion(event); 
                    setShoulder(event.target.value);}}
                  onClick={secondFirstQuestion}
                >
                  <p>키보드에 비해서 당신의 어깨 넓이는 어느정도 인가요?</p>
                  <div className={classes.radioBox}>
                    <p>매우 작음</p>
                    {shoulderSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={shoulderSize[idx]}
                        defaultChecked={shoulderSize[idx]===shoulder}
                        name='shoulder'
                      >
                      </Radio>
                      )
                    })}
                    <p>매우 큼</p>
                  </div>
                </form>
              </div>
              <div className={classes.answer}>
                <form 
                  onChange={(event) => {
                    secondThirdQuestion(event);
                    setChest(event.target.value)}}
                  onClick={secondSecondQuestion}
                >
                  <p>가슴 둘레가 큰 편인가요?</p>
                  <div className={classes.radioBox}>
                    <p>매우 작음</p>
                    {chesteSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={chesteSize[idx]}
                        defaultChecked={chesteSize[idx]===chest}
                        name='chest'
                      >
                      </Radio>
                      )
                    })}
                    <p>매우 큼</p>
                  </div>           
                </form>
              </div>
              <div className={classes.answer}>
                <form 
                  onChange={(event) => {setSleeve(event.target.value)}}
                  onClick={secondThirdQuestion}
                >
                  <p>팔이 긴 편인가요?</p>
                  <div className={classes.radioBox}>
                    <p>매우 작음</p>
                    { sleeveSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={ sleeveSize[idx] }
                        defaultChecked={sleeveSize[idx]===sleeve}
                        name='sleeve'
                      >
                      </Radio>
                      )
                    })}
                    <p>매우 큼</p>
                  </div>            
                </form>
              </div>
            </div>
            </div>
          </div>
          <img src={right1} alt="right" className={classes.directionImg} onClick={nextSlide}/>
        </div>
        {/* 세번째 슬라이드 */}
        <div className={classes.carouselItem}>
        <img src={left1} alt="left1" className={classes.directionImg} onClick={prevSlide}/>
          <div className={classes.surveyBox}>
            <div className={classes.yChangeBox}>
            <div className={classes.answerBox} ref={tSlideRef}>
              <div className={classes.answer}>
                <p className={classes.question}>SBTI #3</p>
              </div>
              <div className={classes.answer}>
                <form 
                  onChange={(event) => {
                    thirdSecondQuestion(event); 
                    setWaist(event.target.value);}}
                  onClick={thirdFirstQuestion}
                >
                  <p>개미허리 인가요?</p>
                  <div className={classes.radioBox}>
                    <p>매우 맞음</p>
                    {waistSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={waistSize[idx]}
                        defaultChecked={waistSize[idx]===waist}
                        name='waist'
                      >
                      </Radio>
                      )
                    })}
                    <p>매우 아님</p>
                  </div>             
                </form>
              </div>
              <div className={classes.answer}>
                <form 
                  onChange={(event) => {
                    thirdThirdQuestion(event);
                    setHip(event.target.value)}}
                  onClick={thirdSecondQuestion}
                >
                  <p>오리 궁둥이 인가요?</p>
                  <div className={classes.radioBox}>
                    <p>매우 작음</p>
                    {hipSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={hipSize[idx]}
                        defaultChecked={hipSize[idx]===hip}
                        name='hip'
                      >
                      </Radio>
                      )
                    })}
                    <p>매우 큼</p>
                  </div>            
                </form>
              </div>
              <div className={classes.answer}>
                <form 
                  onChange={(event) => {
                    thirdForthQuestion(event);
                    setThigh(event.target.value)}}
                  onClick={thirdThirdQuestion}
                >
                  <p>허벅지가 굵은 편인가요?</p>
                  <div className={classes.radioBox}>
                    <p>매우 작음</p>
                    {thighSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={thighSize[idx]}
                        defaultChecked={thighSize[idx]===thigh}
                        name='thigh'
                      >
                      </Radio>
                      )
                    })}
                    <p>매우 큼</p>
                  </div>          
                </form>
              </div>
              <div className={classes.answer}>
                <form 
                  onChange={(event) => {
                    setHem(event.target.value)}}
                  onClick={thirdForthQuestion}
                >
                  <p>평소에 바지 통을 크게 입으시나요?</p>
                  <div className={classes.radioBox}>
                    <p>대체로 작음</p>
                    {hemSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={hemSize[idx]}
                        defaultChecked={hemSize[idx]===hem}
                        name='hem'
                      >
                      </Radio>
                      )
                    })}
                    <p>대체로 큼</p>
                  </div>             
                </form>
              </div>
            </div>
            </div>
          </div>
          <img src={right1} alt="right" className={classes.directionImg} onClick={nextSlide}/>
        </div>
        {/* 제출 슬라이드 */}
        <div className={classes.carouselItem1}>
        <div className={classes.carouselItem1}>
          <p className={!isSBTI ? `${classes["PageName"]}` : `${classes["PageName"]} ${classes.on}`}>STYLE WITH US</p>
          <p className={!isSBTI ? `${classes["SubPageName"]}` : `${classes["SubPageName"]} ${classes.on}`}>스타일 혁신의 가장 확실한 방법</p>
          <img src={woman} alt="man" className={!isSBTI ? `${classes["manImg"]}` : `${classes["manImg"]} ${classes.on}`}/><br />
          <button onClick={submitSbti} className={!isSBTI ? `${classes["carouselbutton1"]}` : `${classes["carouselbutton1"]} ${classes.on}`}>
            검사 제출하기
          </button>
        </div>
        </div>
      </div>  
    </div>
  );
};

export default Sbti;
