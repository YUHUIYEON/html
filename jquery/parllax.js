$(function(){
    let section=$('#contents>.parallax>div');
    let sectionInfo=[]; //css에서 값을 가져올거라 배열만 선언
    let objectInfo=[];
    let totalSize=section.size();

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
            // console.log(objectInfo[i][j]);
        });

        //5.다음, 이전 버튼을 클릭했을 때 해당 섹션으로 이동
        let upBtn=tg.find('>.tit>.arrow>a:eq(0)');
        let downBtn=tg.find('>.tit>.arrow>a:eq(1)');

        upBtn.click(function(e){
            e.preventDefault();
            if(i==0)return;
            move(i-1);
        });
        downBtn.click(function(e){
            e.preventDefault();
            if(i==totalSize-1)return;
            move(i+1);
        });


    }); 
    section.css('position','fixed');
    // console.log(sectionInfo);
    // console.log(objectInfo);

    //6.move 함수 정의
    function move(sectionIndex){
        let tt=sectionInfo[sectionIndex];
        $('html,body').animate({scrollTop:tt},{duration:600,ease:'easeOutCubic'});
    }

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
            
            //4.스크롤 이동 위치에 따라 오브젝트의 최소값에서 최대값으로 이동
            let child=tg.children();
            child.each(function(j){
                let t=$(this);
                let start=sectionInfo[i];                    //시작(부모의 탑 데이터)
                let end=sectionInfo[i+1];                    //끝(부모의 스크롤 끝값)
                let min=objectInfo[i][j];                   //각 오브젝트의 최소 이동값
                let max=objectInfo[i][j]+j * 200 + 100;     //각 오브젝트의 최대 이동값
                if(!end)end=$(document).height();
                let objectTop=(sct - start)*(max-min)/(end - start)+min;
                //비례식을 이용하여 스크롤 이동값에 따라 오브젝트 이동값 구하기
                t.css('top',objectTop);
                // console.log(objectTop);
            });
        });
    });
});