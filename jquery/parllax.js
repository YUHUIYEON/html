$(function(){
    let section=$('#contents>.parallax>div');
    let sectionInfo=[]; //css에서 값을 가져올거라 배열만 선언
    let objectInfo=[];


    //1.각각의 섹션의 스타일을 fixed로 설정, 각 섹션의 top값을 배열에 넣기
    section.each(function(i){ //i=인덱스의 역할
        let tg=$(this);
        sectionInfo.push(tg.offset().top); 
        //offset:선택된 요소의 절대좌표값을 설정하거나 절대좌표값을 리턴

        //3.object에 시간차를 두고 섹션과 반대로 움직임 주기
        objectInfo.push([]);
        let child=tg.children();
        child.each(function(j){
            let t=$(this);
            objectInfo[i][j]=t.position().top;
            console.log(objectInfo[i][j]);
        });
    }); 
    section.css('position','fixed');
    // console.log(sectionInfo);
    console.log(objectInfo);

    //2.스크롤이벤트 생성
    $(window).scroll(function(){
        let sct=$(window).scrollTop();        
        // console.log(sct);

        section.each(function(i){
            let tg=$(this);
            let tt=-1*sct+sectionInfo[i];
            if(sct>sectionInfo[i])tt*=0.5 //섹션의 속도를 줄임
            tg.css('top',tt);
            // console.log(tt);
        });
    });
});