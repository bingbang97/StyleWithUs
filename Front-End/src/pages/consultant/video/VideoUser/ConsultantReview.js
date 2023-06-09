import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// component
import StarRating from "./reviewinput/StarRating";
// css style
import classes from "./ConsultantReview.module.css";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://i8d105.p.ssafy.io/be/";

const ConsultantReview = (props) => {
  // token
  const token = useSelector((state) => state.auth.token);

  // 모달 외부 클릭 시 끄기 처리
  const modalRef = useRef();

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setBackIsClicked(false);
        props.setGetSessionStatus(false);
      }
    };
    // 이벤트 핸들러 등록
    // 컴퓨터
    document.addEventListener("mousedown", handler);
    // 모바일
    document.addEventListener("touchstart", handler);

    return () => {
      // 컴퓨터
      document.removeEventListener("mousedown", handler);
      // 모바일
      document.removeEventListener("touchstart", handler);
    };
  });

  // post 요청 보낼 떄 필요한 정보 받아오기
  const getConsultantId = props.getConsultantId;
  const userId = useSelector((state) => state.auth.userId);

  const [review, setReview] = useState("");
  const [reviewScore, setReviewScore] = useState(3);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    props.setBackIsClicked(false);
    props.setGetSessionStatus(false);

    // POST 요청 보내기
    await sendReview();

    // consultantId 초기화
    props.setGetConsultantId(undefined);
  };

  const sendReview = async () => {
    // axios POST
    const url = APPLICATION_SERVER_URL + "review/write";
    const response = await axios.post(
      url,
      {
        consultantId: getConsultantId,
        userId: userId,
        reviewScore: reviewScore,
        reviewContent: review,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  };

  const onInputHandler = (event) => {
    setReview(event.target.value);
  };

  const onReviewScoreHandler = (reviewScore) => {
    setReviewScore(reviewScore);
  };

  useEffect(() => {}, [reviewScore]);

  return (
    <div>
      <form
        ref={modalRef}
        className={classes.container}
        onSubmit={onSubmitHandler}
      >
        <div className={classes["review"]}>컨설턴트 리뷰</div>
        <div className={classes.wall}></div>
        <div className={classes["review-section"]}>
          <div className={classes["review-title"]}>후기</div>
          <div className={classes["star-rating"]}>
            <StarRating onReviewScore={onReviewScoreHandler} />
          </div>
          <textarea
            className={classes["review-content"]}
            name="review"
            id="review"
            cols="30"
            rows="10"
            placeholder="리뷰를 작성해주세요"
            value={review}
            maxLength="100"
            onInput={onInputHandler}
          ></textarea>
        </div>
        <div className={classes.button}>
          <input
            type="submit"
            className={classes["review-button"]}
            value="리뷰 작성하기"
          />
        </div>
      </form>
    </div>
  );
};

export default ConsultantReview;
