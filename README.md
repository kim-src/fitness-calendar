## ✅ Fitness Calendar
### 📌 주요 기능
> - 운동 일정 추가/수정/삭제
> - 스톱워치 및 타이머 실행

<br>

### 📌 세부 내용
#### 🚩 MyCalendar 컴포넌트
> - FullCalendar 라이브러리를 이용한 달력 페이지 구현
> - 우측 상단의 화살표 및 '이번달' 버튼으로 달력 페이지 이동 가능(라이브러리 기능)
> - 달력 내부 클릭 시 Editor 컴포넌트 팝업 페이지 표시
> - Editor 컴포넌트를 이용한 개별 운동 루틴 관리 가능
> - Editor 컴포넌트에서 입력된 내용을 MyCalendar 컴포넌트로 전달
> - MyCalendar는 전달받은 내용을 토대로 newContent 객체 생성
> - 생성된 newContent 객체는 contents 배열에 추가
> - newContent 객체에는 id, title (내용), date 등 포함

#### 🚩 Editor 컴포넌트
> - Editor 컴포넌트를 이용한 운동 루틴 추가 기능 구현
> - 달력 내부 클릭 시 내용 입력란으로 포커싱
> - 저장 버튼 클릭 또는 엔터 입력 시 내용 추가
> - 취소 버튼 클릭 또는 ESC 입력 시 내용 입력 취소

#### 🚩 FitnessItem 컴포넌트
> - FitnessItem 컴포넌트를 이용한 체크 박스 기능 구현
> - MyCalendar 컴포넌트로부터 전달받은 내용을 토대로 토글 기능 제공
> - 박스 체크 시 취소선 적용 및 글자색 변경
> - 박스 체크 해제 시 취소선 미적용 및 글자색 유지
> - 토글 기능의 경우 event 객체의 id와 함수에 전달된 id 비교 후 적용

<br>

### 🛠️ 추후 개발 예정 내용
> - 달력 페이지 상단에 타이머 기능 제공(2024-08-11 16:55 구현 성공)
> - 달력 페이지 상단에 스톱워치 기능 제공(2024-08-13 21:39 구현 성공)
> - 운동 루틴 삭제 기능 제공(2024-09-07 15:43 구현 성공)
> - 운동 루틴 수정 기능 제공(2024-09-09 20:52 구현 성공)
> - 운동 루틴 리스트 생성
> - 운동 루틴 검색 기능 제공
> - 운동 리스트에 운동 루틴 추가 기능 제공(아마도 memo 관련된 기능)
> - 운동 리스트에 관련 운동 방법을 알려주는 유튜브 영상으로 전환되는 버튼 표시
