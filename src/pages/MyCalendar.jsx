import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import FullCalendar from '@fullcalendar/react'
import React, { useRef, useState } from 'react'
import '../assets/css/calendar.css'
import '../assets/css/time-button.css'
import FitnessItem from '../components/FitnessItem'
import FitnessStopwatch from '../components/FitnessStopwatch'
import FitnessTimer from '../components/FitnessTimer'
import Scheduler from '../components/Scheduler'

function MyCalendar(props) {

    // const [상태 변수, 상태 업데이트 변수]
    // useState = contents 변수의를 빈 배열로 초기화
    // contents = 달력의 입력 이벤트를 할당하기 위해 사용
    // 배열 초기화 이유 = 최소 title 및 date 데이터를 할당시키기 위한 목적
    const [contents, setContents] = useState([]);
    // selectedDate = 선택된 날짜를 저장하는 상태 변수
    const [selectedDate, setSelectedDate] = useState(null);
    // showScheduler = Scheduler 컴포넌트의 상태를 저장하는 상태 변수
    const [showScheduler, setShowScheduler] = useState(false);
    // showStopwatch = FitnessStopwatch 컴포넌트의 상태를 저장하는 상태 변수
    const [showStopwatch, setShowStopwatch] = useState(false);
    // showTimer = FitnessTimer 컴포넌트의 상태를 저장하는 상태 변수
    const [showTimer, setShowTimer] = useState(false);
    // id 부여를 위한 useRef 훅 사용
    const idRef = useRef(1);

    // arg = FullCalendar의 dateClick 이벤트 핸들러에서 전달되는 인자
    const addRoutine = (arg) => {
        // 달력 내부를 클릭하면 setShowScheduler의 상태를 true로 변환
        setShowScheduler(true);
        // 달력 내부를 클릭하면 클릭된 날짜를 setSelectedDate에 전달
        // arg.dateStr = FullCalendar 라이브러리에서 제공하는 arg 객체의 속성
        setSelectedDate(arg.dateStr);
    }

    // 등록된 운동 루틴을 삭제하는 함수 정의
    // id 매개변수 수신
    const deleteRoutine = (id) => {
        // 현재의 currentContents를 매개변수로 받는 콜백 함수 사용
        // currentContents 배열에 Array.prototype.filter 메서드 사용
        // filter 메서드의 역할 : 주어진 조건에 맞는 요소만을 포함하는 새 배열 생성
        // 주어진 id 매개변수와 content 객체의 id 속성이 일치하지 않는 경우에만 배열에 포함
        // 수신된 id 매개변수와 일치할 경우 해당 요소 제외
        setContents(currentContents => currentContents.filter(content => content.id !== id));
    }


    // 비어있는 소괄호 = 실행될 예정이라는 의미
    const goFitnessTimer = () => {
        setShowTimer(true);
    }

    const goFitnessStopwatch = () => {
        setShowStopwatch(true);
    }

    // Scheduler.jsx에서 title이 입력될 경우 실행
    const saveRoutine = (title) => {
        if(title) {
            // newContent 객체를 contents 배열에 추가
            const newContent = {
                // id = idRef의 초기값인 1에서 1씩 값 증가
                id : idRef.current++,
                // title = 달력 내부에 표시되는 텍스트
                title : title,
                // date = 특정 날짜 지정
                date : selectedDate,
                // isDone = 운동 완료 상태 체크용 속성
                isDone : false
            };

            // 객체 상태 확인(디버깅)
            console.log("새로운 운동 루틴 : ", newContent);

            // currentContents를 이용한 현재 상태 참조
            // newContent를 이벤트 목록에 추가하고 상태 업데이트
            // currentContents = contents 배열의 상태 참조 매개변수
            // newContent = title 및 date 데이터를 포함하는 이벤트 객체
            setContents(currentContents => [...currentContents, newContent]);
            // 내용 추가 후 Scheduler 컴포넌트 상태 false로 변경
            setShowScheduler(false);
        }
    };

    const updateRoutine = (id, updatedTitle) => {
        console.log("아이디 : ", id);
        console.log("내용 : ", updatedTitle);

        if(updatedTitle) {
            const updatedContent = {
                id : id,
                title : updatedTitle,
                date : selectedDate,
            };

            console.log("업데이트 된 운동 루틴 : ", updatedContent);

            setContents(currentContents => [...currentContents, updatedContent]);
        }
    };

    // handleIsDone 함수에 전달된 인자 = event 객체의 id
    // 이벤트 핸들러 함수가 이벤트 발생 시 전달받는 event 객체의 id
    const handleIsDone = (id) => {
        // 업데이트 된 contents 상태에 접근
        // currentEvents.map = 모든 이벤트를 순회하며 특정 조건에 따른 업데이트 수행
        // map 함수 = 배열의 각 요소에 함수 실행 및 결과 반환 역할
        setContents(currentEvents => currentEvents.map(event =>
            // event 객체의 id와 함수에 전달된 id가 일치할 경우
            // event 객체의 isDone을 event 객체의 isDone이 아니게 설정
            // 즉, false 상태의 isDone을 true로 변환
            // 아니라면 event 객체 상태 유지
            event.id === id ? { ...event, isDone : !event.isDone } : event
        ));
    };

    // eventInfo = FullCalendar에서 제공하는 event 객체를 포함하는 객체
    // event 객체 = eventInfo 객체에 포함된 이벤트 객체
    // 객체의 구조-분해-할당 사용
    // eventInfo 객체에 포함된 event 객체 추출
    // event 객체에 포함된 id, title 등에 쉽게 접근 가능(필수 방식은 아님)
    const eventContent = ({event}) => {
        // extendedProps = FullCalendar 기본 속성이 아닌 커스텀 속성 포함
        // isDone 상태 확인을 위한 콘솔 출력
        // console.log("event.extendedProps 내용 :", event.extendedProps)

        return (
            // FitnessItem 호출
            // id, title, isDone, onToggle, onDelete prop 추가
            <FitnessItem
                // FitnessItem 컴포넌트에 id 값 전달
                id={event.id}
                // FitnessItem 컴포넌트에 title 값 전달
                title={event.title}
                // event 객체의 extendedProps 속성의 isDone 속성값 전달
                isDone={event.extendedProps.isDone}
                // Toggle = 반전 기능 관련
                // handleIsDone 함수에 event 객체의 id 전달
                // parseInt = event.id를 정수로 변환하는 기능 제공
                // parseInt 사용으로 FullCalendar에서 이벤트 id를 문자열로 처리하는 문제 해결
                onToggle={() => handleIsDone(parseInt(event.id))}
                onUpdate={updateRoutine}
                onDelete={() => deleteRoutine(parseInt(event.id))}
            />
        );
    };

    return (
        <div>
            {/* 스톱워치 및 타이머 영역 */}
            <div className='time-button'>
                <button
                    className='stopwatch-button'
                    onClick={goFitnessStopwatch}
                >스톱워치</button>
                <button
                    className='timer-button'
                    onClick={goFitnessTimer}
                >타이머</button>
            </div>

            {/* Calendar Contents 영역 */}
            <FullCalendar
                // plugins = 사용할 플러그인 속성
                plugins={[ dayGridPlugin, interactionPlugin ]}
                // initialView = 달력 구성 속성
                initialView="dayGridMonth"
                // events = 상태 업데이트 관련 속성
                // contents = 달력 내부에 표시될 내용
                events={contents}
                // eventContent = FullCalendar의 커스텀 HTML 또는 React 컴포넌트 삽입을 위한 속성
                eventContent={eventContent}
                // dateClick = 달력 내부를 클릭했을 때 실행될 기능을 포함하는 속성
                dateClick={addRoutine}
                // button 텍스트 수정을 위한 속성
                buttonText={{ today : '이번달' }}
            />

            {/* showScheduler의 상태가 true일 경우 Scheduler 컴포넌트 렌더링 */}
            {showScheduler &&
                <Scheduler
                    // date prop = Scheduler 컴포넌트에 selectedDate 전달
                    date={selectedDate}
                    // onClose prop = 익명 함수로 setShowScheduler 상태를 false로 설정
                    onClose={() => setShowScheduler(false)}
                    // onSave prop = Scheduler 컴포넌트와 상호작용하여 데이터 수신
                    onSave={saveRoutine}
                />
            }

            {/* showStopwatch의 상태가 true일 경우 FitnessStopwatch 컴포넌트 렌더링 */}
            {showStopwatch &&
                <FitnessStopwatch
                    // onClose prop = 익명 함수로 setShowTimer 상태를 false로 설정
                    onClose={() => setShowStopwatch(false)}
                />
            }

            {/* showTimer의 상태가 true일 경우 FitnessTimer 컴포넌트 렌더링 */}
            {showTimer &&
                <FitnessTimer
                    // onClose prop = 익명 함수로 setShowTimer 상태를 false로 설정
                    onClose={() => setShowTimer(false)}
                />
            }
        </div>
    )
}

export default MyCalendar;
