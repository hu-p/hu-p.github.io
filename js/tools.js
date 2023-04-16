$(document).ready(function () {
    let toolsList = [
        {name:'DDL转换',imgUrl:'/img/sql.png',url:"/html/sqlChange.html"},
    ]
    let list = toolsList.map((item) => {
        return (`
                  <div class='app-item'>
                    <div class="title-name">
                        <span class="app-name" onclick="changeSrc('${item.url}')">${item.name}</span>
                    </div>
                    <div className="app-desc">
                        <img src='${item.imgUrl}'/>
                    </div>
                </div> 
    `)
    })
    $('#grid-box-list').append(list.join(''))
});

function changeSrc(url) {
    window.open(url || '/html/sqlChange.html')
}