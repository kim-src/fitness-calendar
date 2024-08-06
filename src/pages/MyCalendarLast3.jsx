import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import FullCalendar from '@fullcalendar/react'
import { useRef, useState } from 'react'
import '../assets/css/calendar.css'
import Editor from '../components/Editor'
import FitnessItem from '../components/FitnessItem'

function MyCalendar(props) {

    // const [상태 변수, 상태 업데이트 변수]
    // useState = contents 변수의를 빈 배열로 초기화
    // contents = 달력의 입력 이벤트를 할당하기 위해 사용
    // 배열 초기화 이유 = 최소 title 및 date 데이터를 할당시키기 위한 목적
    const [contents, setContents] = useState([]);
    // showEditor = Editor 컴포넌트의 상태를 저장하는 상태 변수
    const [showEditor, setShowEditor] = useState(false);
    // selectedDate = 선택된 날짜를 저장하는 상태 변수
    const [selectedDate, setSelectedDate] = useState(null);
    // id 부여를 위한 useRef 훅 사용
    const idRef = useRef(1);

    // arg = FullCalendar의 dateClick 이벤트 핸들러에서 전달되는 인자
    const addRoutine = (arg) => {
        // 달력 내부를 클릭하면 setShowEditor의 상태를 true로 변환
        setShowEditor(true);
        // 달력 내부를 클릭하면 클릭된 날짜를 setSelectedDate에 전달
        setSelectedDate(arg.dateStr);
    }

    // Editor.jsx에서 title이 입력될 경우 실행
    const saveRoutine = (title) => {
        if(title) {
            // newContent 객체를 contents 배열에 추가
            const newContent = {
                // id = idRef의 초기값인 1에서 1씩 값 증가
                id : idRef.current++,
                // title = 달력 내부에 표시되는 텍스트
                title : title,
                // date = 특정 날짜 지정
                date : selectedDate
            };

            // 객체 상태 확인(디버깅)
            console.log("새로운 운동 루틴 :", newContent);

            // currentContents를 이용한 현재 상태 참조
            // newContent를 이벤트 목록에 추가하고 상태 업데이트
            // currentContents = contents 배열의 상태 참조 매개변수
            // newContent = title 및 date 데이터를 포함하는 이벤트 객체
            setContents(currentContents => [...currentContents, newContent]);
            setShowEditor(false);
        }
    }

    const handleCheckbox = (id, checked) => {
        setContents(current =>
            current.map(item =>
                item.id === id ? { ...item, isChecked: checked } : item
            )
        );
    };

    const onDelete = (id) => {
        setContents(current => current.filter(item => item.id !== id));
    };

    const eventContent = (eventInfo) => {
        return {
            html: `
                <div class='fitness-item'>
                    <input
                        type="checkbox"
                        ${eventInfo.event.extendedProps.isChecked ? 'checked' : ''}
                        data-id="${eventInfo.event.id}"
                    />
                    <span
                        style="text-decoration: ${eventInfo.event.extendedProps.isChecked ? 'line-through' : 'none'};
                            color: ${eventInfo.event.extendedProps.isChecked ? 'gray' : 'white'};">
                        ${eventInfo.event.title}
                    </span>
                </div>
            `
        };
    };

    return (
        <div>
            <div>
                {/* showEditor의 상태가 true일 경우 Editor 컴포넌트 렌더링 */}
                {showEditor &&
                    <Editor
                        // date prop = Editor 컴포넌트에 selectedDate 전달
                        date={selectedDate}
                        // onClose prop = 익명 함수로 setShowEditor 상태를 false로 설정
                        onClose={() => setShowEditor(false)}
                        // onSave prop = Editor 컴포넌트와 상호작용하여 데이터 수신
                        onSave={saveRoutine}
                    ></Editor>
                }
                {/* Calendar Contents */}
                <FullCalendar
                    // plugins = 사용할 플러그인
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    // initialView = 달력 구성
                    initialView="dayGridMonth"
                    // events = 달력 내부에 표시될 내용
                    // contents 상태 업데이트 관련
                    events={contents}
                    eventContent={eventContent}
                    // dateClick = 달력 내부를 클릭했을 때 실행될 기능
                    dateClick={addRoutine}
                    // button 텍스트 수정
                    buttonText={{ today : '이번달' }}
                ></FullCalendar>
            </div>
        </div>
    )
}

export default MyCalendar;
