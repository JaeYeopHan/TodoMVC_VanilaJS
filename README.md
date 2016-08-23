
#TodoList based MVC Project with Vanila JS

To do MVC 공식 홈페이지에서는 각종 프레임워크들로 만들어진 To do MVC 소스들을 볼 수 있습니다.
저는 그 중 pure Javascript 만으로 이루어진 Vanila JS 버전의 소스를 참고하여 이번 프로젝트를 진행하였습니다.
To do MVC Github에 소스가 있긴 하지만 완성된 소스 코드가 올라와있었기 때문에 초심자에게는 좀 어려울 것으로 예상됩니다.
그래서 이 부분을 해소하기 위해 순차적으로 어떻게 접근하면 좋을지에 대한 고민을 하면서,
각 소스의 의미를 중점적으로 이번 프로젝트를 정리했습니다.


<br/>
##준비 단계
- HTML / CSS 가져오기 ( index.html , index.css , base.css )
- ‘use strict’와 JS Hint 로 개발환경 구축하기
- http-server npm 설치
- 에디터, 크롬 브라우저
- MVC에 대한 기본적인 내용 >> spinbox MVC model >>
- javascript 파일 생성

<br/>

##Step 1. 각 JS 파일 모듈화하고 의존성 관계 성립하기
<br/>
##Step 2. To do list Add Item - list 추가하기
* 1단계. template.js 파일을 작성한다.
  * 1-1. 우선 list에 추가될 html 코드 조각을 template화 하자.
  * 1-2. 이제, 어딘가로부터 넘겨받을 data를 템플릿에 삽입할 메소드를 만들어주자.

* 2단계. view.js 파일을 작성한다.
  * 2-1. 우선 template로부터 전달받은 view를 추가시킬 ul 태그와 값을 입력할 input 태그를 select하자.
  * 2-2. view에서 핵심 역할을 하게 될 두 메소드 중 하나인 bind를 생성하자.
  * 2-3. view에서 핵심 역할을 하게 되는 나머지 메소드인 render를 생성하자.
  * 2-4. view에서 실질적인 역할을 수행하는 private메소드를 생성하자. -> addItem

* 3단계. controller.js 파일을 작성한다.
  * 3-1. 우선 생성자 함수에서 view메소드를 실행한다.
  * 3-2. showAll 메소드를 추가한다.
  * 3-3. addItem 메소드를 추가한다.

* 4단계. model.js 파일을 작성한다.
  * 4-1. create 메소드를 작성한다.
  * 4-2. read 메소드를 작성한다.

* 5단계. storage.js 파일을 작성한다.
  * 5-1. 우선 생성자 함수에서 localStorage를 생성하고 data 배열을 생성한다.
  * 5-2. findAll 메소드를 작성한다.
  * 5-3. 데이터를 localStorage에 저장하는 save 메소드를 작성한다.

<br/>

##Step 3. To do list Remove Item - list 제거하기
* 1단계. view.js 파일을 작성한다.
  * 1-1. bind에 event 분기를 추가한다.
  * 1-2. prototype에 _getItemId 메소드를 추가한다.
  * 1-3. render에 viewCommand를 추가한다.
  * 1-4. prototype에 removeItem을 추가한다.

* 2단계. controller.js 파일을 작성한다.
  * 2-1. 생성자 함수에 bind를 추가해준다.
  * 2-2. prototype 에 removeItem 메소드를 추가해준다.

* 3단계. model.js 파일을 작성한다.
  * 3-1. prototype에 remove 메소드를 추가해준다.

* 4단계. storage.js 파일을 작성한다.
  * 4-1. prototype 에 remove 메소드를 추가해준다.

<br/>

##Step 4. To do list Update Item’s Status - list 상태 수정하기
* 1단계. view.js 파일을 작성한다.
  * 1-1. bind에 itemToggle을 추가한다.
  * 1-2. _getItemId 메소드를 수정해준다.
  * 1-3. render에 elementComplete viewCommand를 추가해준다.
  * 1-4. prototype에 _elementComplete 메소드를 추가해준다.

* 2단계. controller.js 파일을 작성한다.
  * 2-1. 생성자 함수에 bind를 추가해준다.
  * 2-2. prototype에 toggleComplete 메소드를 추가해준다.

* 3단계. model.js 파일을 작성한다.
  * 3-1. prototype에 update를 추가해준다.

<br/>

##Step 5. To do list Update Item’s Content - list 내용 수정하기
* 1단계. view.js 파일을 작성한다.
  * 1-1. bind에 itemEdit을 추가한다.
  * 1-2. bind에 itemEditDone을 추가한다.
  * 1-3. prototype에 _itemId를 추가한다.
  * 1-4. render에 editItem과 editItemDone 를 viewCommand로 추가해준다.
  * 1-5. prototype에 _editItem 메소드를 추가해준다.
  * 1-6. prototype에 _editItemDone 메소드를 추가해준다.

* 2단계. controller.js 파일을 작성한다.
  * 2-1. 생성자 함수에 bind를 추가해준다.
  * 2-2. prototype에 editItem 메소드를 추가해준다.
  * 2-3. prototype에 editItemSave 메소드를 추가해준다.

* 3단계. model.js 파일을 작성한다.
  * 3-1. prototype에 정의해두었던 read 메소드를 수정한다.

* 4단계. storage.js 파일을 작성한다.
  * 4-1. prototype에 find 메소드를 추가한다.

<br/>

##Step 6. To do list Remove Item Completed - list에서 완료된 항목 삭제하기
* 1단계. view.js 파일을 작성한다.
  * 1-1. bind에 removeCompleted를 추가한다.

* 2단계. controller.js 파일을 작성한다.
  * 1-1. 생성자 함수에 bind 를 추가한다.
  * 2-2. prototype에 removeCompletedItems를 추가해준다.
  

<br/>

##Step 7. ECMA6 문법으로 Refactoring 하기
* 진행중
