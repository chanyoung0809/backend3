const express = require('express')
const app = express()
const port = 3000

//ejs 파일 사용하고 싶을 때?
app.set("view engine","ejs")
//정적파일들(css,js,img) 사용하고 싶을 때?
app.use(express.static('public'))

app.use(express.json()) // 입력한 데이터값 객체 형식으로 전달받음(javascriptovject)
// 주소창의 key=value 를 key:value로 변환시켜줌
app.use(express.urlencoded({ extended: true })) // 입력값을 한번 더 검증하는 유효성 검사 진행

// 라우터 설정
app.get('/', (req, res) => {
  res.render("index.ejs")
})

// 글 작성 페이지
app.get('/insert', (req, res) => {
    res.render("insert.ejs")
})


// 글 작성 후 해당 데이터들을 보여주는 상세 페이지로 이동
// app.get or app.post (form 태그의 method와 맞춰줘야 함)
// form 태그로 전달받는 값은 모두 문자열의 형태로 출력됨

// app.get('/detail', (req, res) => {
//     // insert에서 넘겨준 데이터 값 확인
//     // get 방식으로 form 태그에서 입력한 데이터값을 담는 객체 query
//     // console.log(req.query); //서버 터미널에 입력값이 표시됨
//     res.render("detail.ejs", {user:req.query})
//     // form 태그에서 넘겨받은 데이터값을 다른 ejs파일에 전달 -> 출력
//     /*
//         1) /insert에서 입력함 ->
//         2) url 주소에 입력값이 전달됨 ->
//         3) index.js로 넘겨줌 (자바스크립트 객체형식으로 변환) ->
//         4) 보여줄 페이지에 데이터값 전달
//     */
// })

app.post('/detail', (req, res) => {
    // console.log(req.body); //서버 터미널에 입력값이 표시됨
    res.render("detail.ejs", {user:req.body})
    // form 태그에서 넘겨받은 데이터값을 다른 ejs파일에 전달 -> 출력

})

/*
get으로 입력하면? 주소창에 입력내용 표시됨
주소창에서 데이터 수정도 가능.
//(게시글 목록, 검색) 
detail? //detail로 사이트 주소 설정해놨음
test=asd name에서 설정한 이름 = 입력값
& 
sel=강원도
&
intro=asdf
*/
/*
post로 입력하면? 주소창에 입력내용 표시되지 않음
보안설정이 들어가기 때문에 대량의 데이터를 처리할 때는 적합하지 않음
(회원가입시 개인정보 입력, 로그인 시 개인정보 입력, 게시글 작성...)
*/
// https://expressjs.com/ko/api.html#req
// 입력값은 객체의 형식으로 전달됨
app.get('/datainput', (req, res) => {
    res.render("dataInput.ejs")
})

app.get('/userinfo', (req, res) => {
    res.render("userinfo.ejs", {report:req.query})
})
app.post('/boardDetail', (req, res) => {
    res.render("boardDetail.ejs", {join:req.body})
})

//블로그 리스트에 뿌려줄 데이터들 준비 (추후에는 DB에서 세팅)
const blogData = [
    {   no:1,
        title:"블로그제목1",
        context:"해당 블로그 글의 첫 번째 내용입니다.",
        author:"관리자"     
    },
    {   no:2,
        title:"블로그제목2",
        context:"해당 블로그 글의 두 번째 내용입니다.",
        author:"관리자"  
    },
    {   no:3,
        title:"블로그제목3",
        context:"해당 블로그 글의 세 번째 내용입니다.",
        author:"관리자"
    },
    {   no:4,
        title:"블로그제목4",
        context:"해당 블로그 글의 네 번째 내용입니다.",
        author:"관리자"
    },
    {   no:5,
        title:"블로그제목5",
        context:"해당 블로그 글의 다섯 번째 내용입니다.",
        author:"관리자"
    },
    {   no:6,
        title:"블로그제목6",
        context:"해당 블로그 글의 여섯 번째 내용입니다.",
        author:"관리자"

    }
]
//블로그 리스트 페이지로
app.get('/bloglist', (req, res) => {
    res.render("blogList.ejs",{Data:blogData})
})
// 블로그 리스트에서 해당하는 목록 하나를 눌렀을 떄 해당 상세페이지 화면으로 이동
// :id <- : 식별자. 식별자 이름은 작명(url parameter)  
app.get(`/blogdetail/:no`, (req, res) => {
    // console.log(req.params.no);
    res.render("blogDetail.ejs",{chunk:blogData[req.params.no]})
})

//오후실습
const animalList = [
    {   
        name:"Goody",
        age:4,
        sort:"강아지",
        date:"2023/01/01"
    },
    {
        name:"Feris",
        age:2,
        sort:"고양이",
        date:"2023/02/02"
    },
    {
        name:"Joice",
        age:3,
        sort:"다람쥐",
        date:"2023/03/03"
    },
    {
        name:"Suletta",
        age:1,
        sort:"너구리",
        date:"2023/04/04"
    },
    {
        name:"Miorine",
        age:1,
        sort:"왕관앵무",
        date:"2023/05/05"
    },
    {
        name:"Mickey",
        age:95,
        sort:"생쥐",
        date:"2023/06/06"
    }
]
app.get('/animal_list', (req, res) => {
    res.render("animalList.ejs",{Animals:animalList})
})
app.get(`/animal_detail/:id`, (req, res) => {
    res.render("animalDetail.ejs",{Animal:animalList[req.params.id]})
})

//서버가 시작이 됐을 때 사용되는 코드
app.listen(port, () => {
  console.log("서버가 정상적으로 실행되고 있습니다.")
})