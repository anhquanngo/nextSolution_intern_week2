// 1 Viết code để tạo ra một mảng bao gồm 1000 phần tử là các số từ 0 đến 999(Coi đây là các giao dịch đang phát sinh trong hệ thống);
var exchanges = [];
function index(){
    for(var id = 0;id < 10;id++){
        exchanges[id] =  id ;
    }
    exchanges.forEach(function(value, key, exchange){
        console.log(value, key);
    })
    
};
index();
// 2 Viết hàm giả lập việc xử lý một giao dịch sẽ mất một khoảng thời gian random từ 100ms đến 1000ms sử dụng callback;
function repair2(){
    var idcallback = (id, callback) => {
    var time = Math.floor(Math.random() * 900) + 100;
            setTimeout(() => {
                callback(id)
            },time)
        }
        idcallback (1,id => {
            console.log("C2 DONE: " + id)
        })
    }


//3 Viết hàm giả lập việc xử lý một giao dịch sẽ mất một khoảng thời gian random từ 100ms đến 1000ms sử dụng promise;
function repair3(id){
    return new Promise((resolve, reject)=>{
        var time = Math.floor(Math.random()* 900)+100;
        setTimeout(() => {
            resolve("C3 DONE: "+ id );
        }, time);
    }).then(str =>{
        console.log(str);
    })
}


//4 Viết hàm giả lập việc xử lý một giao dịch sẽ mất một khoảng thời gian random từ 100ms đến 1000ms sử dụng async function;
function repair4(){
    var ids = (id) =>{
        var timeout = Math.floor(Math.random() * 900) + 100;
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                resolve(id)
            }, timeout);
        })
    }
    var idAsyncAwait = async (id) => {
        try{
            var id = await ids(id)
            console.log("C4 DONE: " + id )
        }catch(e){
            console.log(e)
        }
    }
    idAsyncAwait(ids(3))
}
//5 Viết hàm xử lý toàn bộ giao dịch trong mảng giao dịch trên với yêu cầu xử lý xong giao dịch thứ nhất mới đến giao dịch thứ 2…
//In ra “Đã xử lý giao dịch n” sau khi xử lý xong mỗi giao dịch và “DONE” khi xử lý xong toàn bộ.
function repair5(){
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            let giaodich = exchanges.shift();
            resolve("C5 Xu ly giao dich: " + giaodich);
        }, 111);
    })
}
async function dequi(){
    let result = await repair5();
    console.log(result);
    if(exchanges.length !== 0){
        return await dequi();
    }else{
        return console.log("C5 DONE");
    }
}

//cau 6 //cau 7
const pipeline = 5;
// Arguments cho mỗi hành động
const listOfArgument = [];
var time;

// Fake bất đồng bộ: resolve một mảng sau một khoảng thời gian tuỳ ý
// Tăng biến counter để theo dõi số promise được thực thi mỗi giây

for(let i = 0; i < pipeline; i++) {
    listOfArgument.push(i);
}
    
console.log(listOfArgument);
    
const asyncOperation = index => {
        return new Promise(resolve => {
            setTimeout(() => {
            resolve(index);
            console.log(`Promise ${index} đã sử lý giao dịch: ${exchanges.shift()}`);
                }, time);
        })
    }  
async function repair6(){
    const listOfPromise = listOfArgument.map(asyncOperation);
    let result = await Promise.all(listOfPromise);
    if(exchanges.length!=0){
        time=Math.ceil(Math.random() * 1) * 1000;
        return await repair6();
        }else{
            console.log("DONE! ")
        }
    }


function main() {
    // repair2();
    // repair3(2);
    // repair4();
    // dequi();
    repair6();

};
main();
