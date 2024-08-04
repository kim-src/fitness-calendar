import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import '../assets/css/calendar.css'
import { useState } from 'react'

function MyCalendar(props) {

    // const [상태 변수, 상태 업데이트 변수]
    // useState = contents 변수의를 빈 배열로 초기화
    // contents = 달력의 입력 이벤트를 할당하기 위해 사용
    // 배열 초기화 이유 = 최소 title 및 date 데이터를 할당시키기 위한 목적
    const [contents, setContents] = useState([]);

    // arg = FullCalendar의 dateClick 이벤트 핸들러에서 전달되는 인자
    const addRoutine = (arg) => {
        // prompt = 사용자로부터 텍스트 입력을 받을 수 있는 대화 상자 생성
        const fitRoutine = prompt('운동 루틴 추가 :', '');

        /* prompt 내용이 존재할 경우 */
        // 새로운 newContent 이벤트 객체 생성
        // newContent 객체를 contents 배열에 추가
        if(fitRoutine) {
            const newContent = {
                // 객체에 FullCalendar 컴포넌트의 이벤트 객체의 속성 추가
                // title = 달력에 표시되는 텍스트
                title : fitRoutine,
                // date = 특정 날짜 지정
                date : arg.dateStr
            }

            /* setContents */
            // currentContents를 이용한 현재 상태 참조
            // newContent를 이벤트 목록에 추가하고 상태 업데이트
            // currentContents = 현재 contents 배열의 상태 참조 매개변수
            // newContent = prompt 내용을 포함하는 이벤트 객체
            setContents((currentContents) => [...currentContents, newContent]);
        }
    }

    return (
        <div>
            <div>
                {/* Calendar Contents */}
                <FullCalendar
                    // plugins = 사용할 플러그인
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    // initialView = 달력 구성
                    initialView="dayGridMonth"
                    // events = 달력 내부에 표시될 내용
                    // contents 상태 업데이트 관련
                    events={contents}
                    // dateClick = 달력 내부를 클릭했을 때 실행될 기능
                    dateClick={addRoutine}
                ></FullCalendar>
            </div>
        </div>
    )
}

export default MyCalendar;
