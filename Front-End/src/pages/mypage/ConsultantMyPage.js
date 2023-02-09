import { useDispatch ,useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import { useEffect } from "react";
import classes from './ConsultantMyPage.module.css'
import ConsultantMyPageSideBar from './ConsultantMyPageSideBar';
import consultantMan from '../../assets/footermantwo.png';
import consultantWoman from '../../assets/footerwoman.png';


const ConsultantMyPage = () => {
  const dispatch = useDispatch();
  const consultantId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.auth.userData);
  const review = useSelector((state) => state.auth.myReviewList);

  const getMyData = () =>{
    const url = "https://i8d105.p.ssafy.io/be/consultant/get/" + consultantId
    axios.get(
      url,
      {
        headers:{
          Authorization : token
        }
      }
    ).then(response => {
      if (response.status===200){
        dispatch(authActions.getMyData(response.data.data))
      }
    }).catch(error =>{
      console.log(error);
    })    
  };

  useEffect(() => {
    getMyData();
  }, []);

  return(
    <div>
      <div className={classes.MyPage}>
        <ConsultantMyPageSideBar/>
        <div className={classes.mainBox}>
          <h3 className={classes.MainTitle}>회원 정보</h3>
          <div className={classes.MyInformBox}>
            <p >{(data.userGender ? <img src="" className={classes.consultantman} /> : <img src={consultantWoman} className={classes.consultantWoman} />)}</p>
            <div className={classes.HelloText}><p className={classes.consultantNickname}>{data.consultantNickname }</p><p className={classes.Hello}>님 안녕하세요,</p></div>
            <div><p>{data.consultantEmail}</p></div>
          </div>
          <h3 className={classes.MainTitle}>경력 기술서</h3>
          <p>{data.consultantResume}</p>
          <div>
            <div className={classes.RevieBox}>
              <h3 className={classes.MainTitle}>나의 리뷰</h3>
              <p>더보기</p>
            </div>
            {review.map((item,idx) => {
            return(
              <div key={idx} className={classes.ReviewBox}>
                <div className={classes.ReviewOne}>
                  <p className={classes.star}>별 별 별 별 별 </p>
                  <p className={classes.reviewScore}>{review[idx].reviewScore}</p>
                  <p className={classes.userId}>{review[idx].userId}</p>
                </div>
                <p className={classes.reviewContent}>{review[idx].reviewContent}</p>
              </div>
              )
            })}
          </div>

        </div>
      </div>


      
     
    </div>
  );
};

export default ConsultantMyPage;