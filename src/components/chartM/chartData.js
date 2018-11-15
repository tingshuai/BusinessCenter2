export const defaultImg = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQyMDkxNzc1Nzc2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjcxMjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjYuMTc1MTY1IDE0MC40Nzk0NzVsMCA3NDMuMDQxMDUgODkxLjY0ODY0NiAwTDk1Ny44MjM4MTEgMTQwLjQ3OTQ3NSA2Ni4xNzUxNjUgMTQwLjQ3OTQ3NXpNMjg5LjA4Mjk3OCAyNzUuNTY4MTczYzUyLjc2MTY2OCAwIDk1LjUzMzgyIDQ1LjM2MzE2NCA5NS41MzM4MiAxMDEuMzIzNjg3cy00Mi43NzMxNzYgMTAxLjMyMzY4Ny05NS41MzM4MiAxMDEuMzIzNjg3Yy01Mi43NTk2MjEgMC05NS41MzM4Mi00NS4zNjMxNjQtOTUuNTMzODItMTAxLjMyMzY4N1MyMzYuMzIyMzMzIDI3NS41NjgxNzMgMjg5LjA4Mjk3OCAyNzUuNTY4MTczek0xOTMuNTU1Mjk4IDc0OC40MjI2MTdjMCAwIDIwLjkxMDIzOS0yMDMuNzM2MTcxIDEyNy4zNzkxMDktMjAyLjY0ODM5NiAxMDYuNDYzNzU0IDEuMDgxNjM1IDEyNy4zNzE5NDYgMTM1LjA4OTcyMSAxMjcuMzcxOTQ2IDEzNS4wODk3MjFzNTcuMzMzOC0zMzcuNzM3MDk0IDE5MS4wNzE3MzMtMzM3LjczNzA5NGMxMzMuNzM5OTggMCAxOTEuMDY4NjYzIDQwNS4yOTQ3NDYgMTkxLjA2ODY2MyA0MDUuMjk0NzQ2TDE5My41NTUyOTggNzQ4LjQyMTU5NHoiIHAtaWQ9IjcxMjIiIGZpbGw9IiNjZGNkY2QiPjwvcGF0aD48L3N2Zz4='
export const de =
{
    container:{
        id:new Date().getTime(),
        tag:"",
        value:"999",
        style:{
            'border':"1px solid red",
            'fontSize':'22px',
            'left':'',
            'top':'',
            "background-color":"#ffffff",
            "width":'500px',
            "height":"500px",
            "position":"relative",
            "-moz-user-select": "none",
            "-webkit-user-select": "none",
            "-ms-user-select": "none",
            "-khtml-user-select": "none",
            "user-select": "none",
        },
        attribute:{

        },
        attrs:{
            id:"container"
        },
        class:[],
        curIndex:null//点击的当前项目下标....
    },
    listBar:[{
        id:new Date().getTime(),
        tag:"img",
        value:"",
        style:{
            'border':"2px dashed #ddd",
            'width':'200px',
            'height':'200px',
            'left':0,
            'display':'inline-block',
            'top':0,
            'cursor':'move',
            'background':`url(${defaultImg}) center center no-repeat`,
            'background-size':'100% 100%',
            'z-index':"auto"
        },
        imgStyle:{
            'display':'inline-block',
        },
        attribute:{
            
        },
        attrs:{
            src:""
        },
        class:["_item"]
    }]
}
export const font = {
    id:new Date().getTime(),
    tag:"font",
    value:"",
    style:{
        'border':"2px dashed #ddd",
        'fontSize':'22px',
        'left':20,
        'top':0,
        'width':"200px",
        'height':"30px"
    },
    attribute:{

    },
    attrs:{
        "disabled":true
    },
    class:["_item"]
}
export const _text = {
    id:new Date().getTime(),
    tag:"text",
    value:"",
    style:{
        'border':"2px dashed #ddd",
        'fontSize':'22px',
        'left':100,
        'top':100,
        'cursor':'move',
        'display':'inline-block'
    },
    attribute:{
        
    },
    attrs:{
        
    },
    class:["_item"]
}
export const img = {
    id:new Date().getTime(),
    tag:"img",
    value:"",
    style:{
        'border':"2px dashed #ddd",
        'width':'100px',
        'height':'100px',
        'left':0,
        'display':'inline-block',
        'top':0,
        'cursor':'move',
        'background':`url(${defaultImg}) center center no-repeat`,
        'background-size':'100% 100%',
        'z-index':""
    },
    imgStyle:{
        'display':'inline-block',
    },
    attribute:{
        
    },
    attrs:{
        src:defaultImg
    },
    class:["_item"]
}
export const rect = {
    id:new Date().getTime(),
    tag:"rect",
    value:"",
    style:{
        'border':"2px dashed #ddd",
        'fontSize':'22px',
        'left':0,
        'top':0,
        'cursor':'move',
        'width':'100px',
        'height':'100px',
        'display':'inline-block'
    },
    attribute:{
        
    },
    attrs:{
        
    },
    class:["_item"]
}
export const table = {
    id:new Date().getTime(),
    tag:"table",
    value:"",
    style:{
        'border':"2px dashed #ddd",
        'fontSize':'22px',
        'left':0,
        'top':0,
        'cursor':'move',
        'width':'200px',
        'height':'100px',
        'display':'inline-block'
    },
    attribute:{
        
    },
    attrs:{
        
    },
    class:["_item"]
}